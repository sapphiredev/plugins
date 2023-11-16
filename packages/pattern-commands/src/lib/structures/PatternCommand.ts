import { Args, Command, type MessageCommand } from '@sapphire/framework';
import type { Awaitable, Message } from 'discord.js';

export abstract class PatternCommand extends Command<Args, PatternCommand.Options> {
	public readonly chance: number;
	public readonly weight: number;
	public readonly matchFullName: boolean;
	public constructor(context: PatternCommand.LoaderContext, options: PatternCommand.Options) {
		super(context, options);
		this.chance = options.chance ?? 100;
		if (options.weight) {
			if (options.weight < 0) {
				this.weight = 0;
			} else if (options.weight > 10) {
				this.weight = 10;
			} else {
				this.weight = options.weight;
			}
		} else {
			this.weight = 5;
		}
		this.matchFullName = options.matchFullName ?? false;
	}

	/**
	 * Executes the pattern command's logic.
	 * @param message The message that triggered the pattern command.
	 */
	public abstract override messageRun(message: Message): Awaitable<unknown>;
}

export interface PatternCommandOptions extends MessageCommand.Options {
	/**
	 * The chance that the pattern command is triggered.
	 * @default 100
	 */
	chance?: number;
	/**
	 * The matching weight of the command.
	 * @default 5
	 */
	weight?: number;
	/**
	 * If true it will only trigger on full matches (for example, explore won't trigger lore)
	 * Note: It will only change the behavior of the command's name and not for the command's aliasses
	 * @default false
	 */
	matchFullName?: boolean;
}

export namespace PatternCommand {
	/**
	 * Re-export of {@link MessageCommand.LoaderContext}
	 * @deprecated Use {@linkcode LoaderContext} instead.
	 */
	export type Context = LoaderContext;
	export type LoaderContext = MessageCommand.LoaderContext;

	/** Re-export of {@link MessageCommand.RunContext} */
	export type RunContext = MessageCommand.RunContext;

	/** Re-export of {@link MessageCommand.JSON} */
	export type JSON = MessageCommand.JSON;

	/** Re-export of {@link MessageCommand.RunInTypes} */
	export type RunInTypes = MessageCommand.RunInTypes;

	/**
	 * The PatternCommand Options
	 */
	export type Options = PatternCommandOptions;
}
