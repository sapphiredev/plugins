import { SubCommandNotLoadedError } from '../errors/SubCommandNotLoadedError';
import {
	CommandStore,
	IPreconditionContainer,
	PreCommandRunPayload,
	PreconditionContainerArray,
	PreconditionContainerSingle
} from '@sapphire/framework';
import { SubCommandMissingOptionsError } from '../errors/SubCommandMissingOptionsError';

export type ResolveSubCommandPayload = Omit<PreCommandRunPayload, 'context'>;

export interface SubCommandsPluginOptions {
	/**
	 * Preconditions that will be overlap in parents by their sub commands
	 * @since 1.0.0
	 * @default []
	 */
	overlappedPreconditions?: string[];

	/**
	 * Should the search in commands store be performed on a value with a low case
	 * @since 1.0.0
	 * @default true
	 */
	lowercasedCommandName?: boolean;
}

export const enum SubCommandsEvents {
	PreSubCommandRun = 'preSubCommandRun',
	SubCommandDenied = 'subCommandDenied',
	SubCommandAccepted = 'subCommandAccepted',
	SubCommandRun = 'subCommandRun',
	SubCommandSuccess = 'subCommandSuccess',
	SubCommandError = 'subCommandError',
	SubCommandFinish = 'subCommandFinish'
}

export class SubCommandsHandler {
	public readonly options: Required<SubCommandsPluginOptions>;

	/**
	 * @since 1.0.0
	 * @param options Optional SubCommands plugin settings.
	 */
	public constructor(options: SubCommandsPluginOptions = {}) {
		this.options = {
			overlappedPreconditions: options.overlappedPreconditions ?? [],
			lowercasedCommandName: options.lowercasedCommandName ?? true
		};
	}

	/**
	 * Resolves sub command by passed payload.
	 * @param payload The params that need for resolving sub command.
	 */
	public async resolveSubCommand({ command, message, parameters }: ResolveSubCommandPayload) {
		const args = await command.preParse(message, parameters);
		const store = command.store as CommandStore;

		let nameFromArgs = await args.pickResult('string');
		let iterableCommand = command;
		let method = undefined;
		let parentName = iterableCommand.name;
		do {
			if (!nameFromArgs.success || !iterableCommand.subCommands) break;

			const soughtName = this.options.lowercasedCommandName ? nameFromArgs.value.toLowerCase() : nameFromArgs.value;
			const subCommandInfo = iterableCommand.subCommands.find((s) => s.name === soughtName);
			if (!subCommandInfo) break;

			if (!subCommandInfo.command && !subCommandInfo.method) {
				throw new SubCommandMissingOptionsError(subCommandInfo.name, parentName);
			}

			const soughtCommand = store.get(subCommandInfo.command ?? '') ?? (subCommandInfo.method ? command : undefined);
			if (!soughtCommand) break;

			parentName = soughtCommand.name;
			iterableCommand = soughtCommand;
			method = subCommandInfo.method;
			args.save();

			if (command === iterableCommand && subCommandInfo.method) break;
		} while ((nameFromArgs = await args.pickResult('string')));

		args.restore();
		return { command: command === iterableCommand ? undefined : iterableCommand, parentName, method, args };
	}

	/**
	 * Builds parent-child sub commands tree and make preconditions for them.
	 * @param commands The commands store.
	 */
	public inspectSubCommands(commands: CommandStore) {
		for (const [, command] of commands.entries()) {
			if (!command.subCommands) continue;

			for (const { command: subCommandPieceName } of command.subCommands) {
				if (!subCommandPieceName) continue;

				const subCommand = commands.get(subCommandPieceName);
				if (!subCommand) throw new SubCommandNotLoadedError(subCommandPieceName, command.name);
				subCommand.isSubCommand = true;

				// Setting up parent's preconditions to found sub command with filtering
				if ((command.preconditions as PreconditionContainerArray).entries) {
					const subCommandPreconditions = subCommand.preconditions as PreconditionContainerArray;
					let parentPreconditionFiltered: IPreconditionContainer | null = command.preconditions;
					for (const preconditionName of this.options.overlappedPreconditions) {
						const a = (this.preconditionsDeepFilter(subCommandPreconditions, preconditionName) ??
							new PreconditionContainerArray()) as PreconditionContainerArray;
						if (subCommandPreconditions.entries.every((e, i) => e === a.entries[i])) continue;

						parentPreconditionFiltered = this.preconditionsDeepFilter(parentPreconditionFiltered, preconditionName);
					}

					parentPreconditionFiltered && subCommandPreconditions.add(parentPreconditionFiltered);
				}
			}
		}
	}

	/**
	 * Deep [[IPreconditionContainer]] filtering by container name. Will return null if result is empty.
	 * @param container Some precondition container.
	 * @param filterTarget The container name by which will be filtered the original one.
	 */
	private preconditionsDeepFilter(container: IPreconditionContainer | null, filterTarget: string) {
		if (container instanceof PreconditionContainerArray) {
			let containerArray = null;
			for (const entry of container.entries) {
				const result = this.preconditionsDeepFilter(entry, filterTarget);

				if (!result) continue;
				containerArray ??= new PreconditionContainerArray();

				containerArray?.add(result);
			}
			return containerArray;
		} else if (container instanceof PreconditionContainerSingle) {
			return container.name === filterTarget ? null : container;
		}
		return container;
	}
}

interface SubCommandCommandInfo {
	name: string;
	command: string;
	method?: string;
}

interface SubCommandMethodInfo {
	name: string;
	command?: string;
	method: string;
}

export type SubCommandOptionsResolvable = SubCommandCommandInfo | SubCommandMethodInfo;
