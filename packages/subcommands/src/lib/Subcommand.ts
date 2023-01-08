import { Command, Result, UserError, type Args, type ChatInputCommand, type MessageCommand, type PieceContext } from '@sapphire/framework';
import { cast, deepClone } from '@sapphire/utilities';
import type { CacheType, Message } from 'discord.js';
import type {
	ChatInputCommandSubcommandMappingMethod,
	MessageSubcommandMappingMethod,
	SubcommandMappingArray,
	SubcommandMappingMethod
} from './SubcommandMappings';
import {
	SubcommandPluginEvents,
	SubcommandPluginIdentifiers,
	type ChatInputSubcommandAcceptedPayload,
	type MessageSubcommandAcceptedPayload
} from './types/Events';

export class Subcommand<PreParseReturn extends Args = Args, O extends Subcommand.Options = Subcommand.Options> extends Command<PreParseReturn, O> {
	public parsedSubcommandMappings: SubcommandMappingArray;
	public caseInsensitiveSubcommands = false;

	public constructor(context: PieceContext, options: O) {
		super(context, options);
		this.parsedSubcommandMappings = options.subcommands ?? [];

		const clientOptions = this.container.client.options;

		if (clientOptions.caseInsensitiveCommands) {
			this.caseInsensitiveSubcommands = true;

			// Because slash commands must be lowercase anyway, we can transform all to lowercase.
			for (const cmd of this.parsedSubcommandMappings) {
				cmd.name = cmd.name.toLowerCase();
				if (cmd.type === 'group') {
					for (const groupCommand of cmd.entries) {
						groupCommand.name = groupCommand.name.toLowerCase();
					}
				}
			}
		}

		if (options.generateDashLessAliases) {
			for (const mapping of this.parsedSubcommandMappings) {
				if (!Reflect.has(mapping, 'messageRun')) {
					continue;
				}

				const dashLessMappings: SubcommandMappingArray = [];

				if (mapping.type === 'group') {
					// Keep track of whether we have changed entries or not, so we don't need to do expensive object comparison later.
					let hasChangedEntries: boolean | null = null;

					// Deeply clone the entire mapping to avoid mutating the original.
					const clonedMapping = deepClone(mapping);

					// Loop through the group's subcommands and add a dash-less alias for each, if applicable.
					for (const groupCommand of mapping.entries) {
						if (groupCommand.name.includes('-')) {
							// If we are inside this if statement then we flip `hasChangedEntries` to true to be able to read it later.
							hasChangedEntries ??= true;

							clonedMapping.entries.push({
								...groupCommand,
								name: groupCommand.name.replaceAll('-', '')
							});
						}
					}

					/**
					 * If any of the entries in the group had a dash then `hasChangedEntries` was flipped to true
					 * and so we want to register a mapping with the base name and all dash-less entries
					 * in the group.
					 */
					if (hasChangedEntries) {
						dashLessMappings.push({
							...mapping,
							entries: clonedMapping.entries
						});
					}

					/**
					 * If the group name itself has a dash then register a dash-less copy of it.
					 * If the entries in the group didn't have any dashes then `clonedMapping.entries` is still
					 * the same original array, so it can be safely overwritten.
					 *
					 * If the entries in the group did have any dashes then `clonedMapping.entries` has
					 * all entries both with and without dashes.
					 */
					if (clonedMapping.name.includes('-')) {
						clonedMapping.name = clonedMapping.name.replaceAll('-', '');
						dashLessMappings.push(clonedMapping);
					}
				} else if (mapping.name.includes('-')) {
					dashLessMappings.push({
						...mapping,
						name: mapping.name.replaceAll('-', '')
					});
				}

				// For every dash-less mapping, push a new subcommand
				for (const dashLessMapping of dashLessMappings) {
					this.parsedSubcommandMappings.push(dashLessMapping);
				}
			}
		}
	}

	public onLoad() {
		super.onLoad();

		const externalMapping = Reflect.get(this, 'subcommandMappings');
		if (externalMapping) {
			const subcommands = Array.isArray(externalMapping) ? externalMapping : [];
			this.parsedSubcommandMappings = subcommands;
			this.options.subcommands = subcommands;
		}
	}

	public override supportsMessageCommands(): boolean {
		return this.#supportsCommandType('messageRun');
	}

	public override supportsChatInputCommands(): this is ChatInputCommand {
		return this.#supportsCommandType('chatInputRun');
	}

	public async messageRun(message: Message, args: PreParseReturn, context: MessageCommand.RunContext) {
		args.save();
		const subcommandOrGroup = args.nextMaybe();
		const subcommandName = args.nextMaybe();
		let defaultCommand: SubcommandMappingMethod | null = null;
		let actualSubcommandToRun: SubcommandMappingMethod | null = null;
		let matchedWithGroupedSubcommand = false;

		for (const mapping of this.parsedSubcommandMappings) {
			mapping.type ??= 'method';

			if (mapping.type === 'method') {
				if (mapping.default && !defaultCommand) {
					matchedWithGroupedSubcommand = false;
					defaultCommand = mapping;
				}

				if (subcommandOrGroup.isSomeAnd((value) => mapping.name === (this.caseInsensitiveSubcommands ? value.toLowerCase() : value))) {
					actualSubcommandToRun = mapping;
					matchedWithGroupedSubcommand = false;
					// Exit early
					break;
				}
			}

			// We expect a group mapping
			if (mapping.type === 'group' && subcommandOrGroup.isSome() && subcommandName.isSome()) {
				const unwrappedSubcommandGroupName = subcommandOrGroup.unwrap();
				const unwrappedSubcommandName = subcommandName.unwrap();

				// We know a group was passed in here
				if (mapping.name === unwrappedSubcommandGroupName) {
					// Find the actual subcommand to run
					const findResult = this.#findSubcommand(
						mapping.entries,
						this.caseInsensitiveSubcommands ? unwrappedSubcommandName.toLowerCase() : unwrappedSubcommandName
					);

					if (findResult.defaultMatch) {
						defaultCommand = findResult.mapping;
						matchedWithGroupedSubcommand = true;
					} else {
						actualSubcommandToRun = findResult.mapping;
						matchedWithGroupedSubcommand = true;
						// Exit early
						break;
					}
				}
			}
		}

		// Preemptively restore the args state, to provide a correct args result for users
		args.restore();

		if (actualSubcommandToRun) {
			// Skip over the subcommandOrGroup
			args.next();

			// If we matched with a subcommand in a group we need to skip 1 more arg
			if (matchedWithGroupedSubcommand) {
				args.next();
			}

			return this.#handleMessageRun(message, args, context, actualSubcommandToRun);
		}

		// No subcommand matched, let's try to run default, if any:
		if (defaultCommand) {
			// If we matched with a subcommand in a group we need to skip 1 the group name
			if (matchedWithGroupedSubcommand) {
				args.next();
			}

			return this.#handleMessageRun(message, args, context, defaultCommand);
		}

		// No match and no subcommand, return an err:
		throw new UserError({
			identifier: SubcommandPluginIdentifiers.MessageSubcommandNoMatch,
			message: 'No subcommand was matched with the provided arguments.',
			context: {
				...context,
				possibleSubcommandName: subcommandName.unwrapOr(null),
				possibleSubcommandGroupOrName: subcommandOrGroup.unwrapOr(null)
			}
		});
	}

	public async chatInputRun(interaction: ChatInputCommand.Interaction, context: ChatInputCommand.RunContext) {
		const subcommandName = interaction.options.getSubcommand(false);
		const subcommandGroupName = interaction.options.getSubcommandGroup(false);

		for (const mapping of this.parsedSubcommandMappings) {
			mapping.type ??= 'method';

			// If we have a group, we know we also have a subcommand and we should find and run it
			if (subcommandGroupName && subcommandName) {
				if (mapping.type !== 'group') continue;
				if (mapping.name !== subcommandGroupName) continue;

				const foundSubcommand = this.#findSubcommand(mapping.entries, subcommandName!);

				// Only run if its not the "default" found command mapping, as interactions don't have that
				if (!foundSubcommand.defaultMatch) {
					return this.#handleChatInputInteractionRun(interaction, context, foundSubcommand.mapping);
				}

				// Skip to the next entry
				continue;
			}

			// If we have a direct subcommand, and no group, then run the mapping
			if (mapping.type === 'method' && mapping.name === subcommandName) {
				return this.#handleChatInputInteractionRun(interaction, context, mapping);
			}
		}

		// No match and no subcommand, return an err:
		throw new UserError({
			identifier: SubcommandPluginIdentifiers.ChatInputSubcommandNoMatch,
			message: 'No subcommand was matched with the provided command.',
			context
		});
	}

	async #handleMessageRun(message: Message, args: Args, context: MessageCommand.RunContext, subcommand: SubcommandMappingMethod) {
		const payload: MessageSubcommandAcceptedPayload = {
			message,
			command: this,
			context,
			matchedSubcommandMapping: subcommand
		};

		const result = await Result.fromAsync(async () => {
			if (subcommand.messageRun) {
				const casted = subcommand as MessageSubcommandMappingMethod;

				this.container.client.emit(SubcommandPluginEvents.MessageSubcommandRun, message, casted, payload);
				let result: unknown;

				if (typeof subcommand.messageRun === 'string') {
					const method = Reflect.get(this, subcommand.messageRun);
					if (!method) {
						throw new UserError({
							identifier: SubcommandPluginIdentifiers.SubcommandNotFound,
							message: `The method configured at "messageRun" for the subcommand ${subcommand.name} was not implemented in the class.`,
							context: { ...payload }
						});
					}

					result = await Reflect.apply(cast<this['messageRun']>(method), this, [message, args, context]);
				} else {
					result = await subcommand.messageRun(message, args, context);
				}

				this.container.client.emit(SubcommandPluginEvents.MessageSubcommandSuccess, message, casted, { ...payload, result });
			} else {
				this.container.client.emit(SubcommandPluginEvents.SubcommandMappingIsMissingMessageCommandHandler, message, subcommand, payload);
			}
		});

		result.inspectErr((error) => this.container.client.emit(SubcommandPluginEvents.MessageSubcommandError, error, payload));
	}

	async #handleChatInputInteractionRun(
		interaction: ChatInputCommand.Interaction,
		context: ChatInputCommand.RunContext,
		subcommand: SubcommandMappingMethod
	) {
		const payload: ChatInputSubcommandAcceptedPayload = {
			command: this,
			context,
			interaction,
			matchedSubcommandMapping: subcommand
		};

		const result = await Result.fromAsync(async () => {
			if (subcommand.chatInputRun) {
				const casted = subcommand as ChatInputCommandSubcommandMappingMethod;

				this.container.client.emit(SubcommandPluginEvents.ChatInputSubcommandRun, interaction, casted, payload);
				let result: unknown;

				if (typeof subcommand.chatInputRun === 'string') {
					const method = Reflect.get(this, subcommand.chatInputRun);
					if (!method) {
						throw new UserError({
							identifier: SubcommandPluginIdentifiers.SubcommandNotFound,
							message: `The method configured at "chatInputRun" for the subcommand ${subcommand.name} was not implemented in the class.`,
							context: { ...payload }
						});
					}

					result = await Reflect.apply(cast<this['chatInputRun']>(method), this, [interaction, context]);
				} else {
					result = await subcommand.chatInputRun(interaction, context);
				}

				this.container.client.emit(SubcommandPluginEvents.ChatInputSubcommandSuccess, interaction, casted, { ...payload, result });
			} else {
				this.container.client.emit(
					SubcommandPluginEvents.SubcommandMappingIsMissingChatInputCommandHandler,
					interaction,
					subcommand,
					payload
				);
			}
		});

		result.inspectErr((error) => this.container.client.emit(SubcommandPluginEvents.ChatInputSubcommandError, error, payload));
	}

	#findSubcommand(mappings: SubcommandMappingMethod[], expectedName: string) {
		let foundDefault: SubcommandMappingMethod | null = null;

		for (const mapping of mappings) {
			mapping.type ??= 'method';

			if (mapping.default) {
				foundDefault = mapping;
			}

			if (mapping.name === expectedName) {
				return { mapping, defaultMatch: false } as const;
			}
		}

		return { mapping: foundDefault, defaultMatch: true } as const;
	}

	#supportsCommandType(commandType: 'messageRun' | 'chatInputRun'): boolean {
		return this.parsedSubcommandMappings.some((mapping) => {
			if (mapping.type === 'group') {
				return mapping.entries.some((groupCommand) => Reflect.has(groupCommand, commandType));
			}
			return Reflect.has(mapping, commandType);
		});
	}
}

export interface SubcommandOptions extends Command.Options {
	subcommands?: SubcommandMappingArray;
	/**
	 * Whether to add aliases for subcommands with dashes in them
	 *
	 * When this option is enabled *and* the subcommand implements `messageRun`, dashless aliases will be added.
	 *
	 * For subcommands groups both the group itself and all subcommands within the group will have dashless aliases added.
	 *
	 * @since 3.0.0
	 * @default false
	 */
	generateDashLessAliases?: boolean;
}

export namespace Subcommand {
	export type Options = SubcommandOptions;
	export type JSON = Command.JSON;
	export type Context = Command.Context;
	export type RunInTypes = Command.RunInTypes;
	export type ChatInputCommandInteraction<Cached extends CacheType = CacheType> = Command.ChatInputCommandInteraction<Cached>;
	export type ContextMenuCommandInteraction<Cached extends CacheType = CacheType> = Command.ContextMenuCommandInteraction<Cached>;
	export type AutocompleteInteraction<Cached extends CacheType = CacheType> = Command.AutocompleteInteraction<Cached>;
	export type Registry = Command.Registry;
}
