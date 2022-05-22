import { Args, Command, MessageCommand } from '@sapphire/framework';
import type { Awaitable, Message } from 'discord.js';

export abstract class PatternCommand extends Command<Args, PatternCommand.Options> {
	public readonly chance: number;
	public readonly matchFullName: boolean;
	public constructor(context: PatternCommand.Context, options: PatternCommand.Options) {
		super(context, options);
		this.chance = options.chance ?? 100;
		this.matchFullName = options.matchFullName ?? false;
	}

	/**
	 * Executes the pattern command's logic.
	 * @param message The message that triggered the pattern command.
	 */
	public abstract messageRun(message: Message): Awaitable<unknown>;
}

export interface PatternCommandOptions extends Command.Options {
	/**
	 * The chance that the pattern command is triggered.
	 * @default 100
	 */
	chance?: number;
	/**
	 * If true it will only trigger on full matches (for example, explore won't trigger lore)
	 * Note: It will only change the behavior of the command's name and not for the command's aliasses
	 * @default false
	 */
	matchFullName?: boolean;
}

export namespace PatternCommand {
	/** Re-export of {@link Command.Context} */
	export type Context = Command.Context;

	/** Re-export of {@link Command.RunContext} */
	export type RunContext = MessageCommand.RunContext;

	/** Re-export of {@link Command.JSON} */
	export type JSON = Command.JSON;

	/** Re-export of {@link Command.RunInTypes} */
	export type RunInTypes = Command.RunInTypes;

	/**
	 * The PatternCommand Options
	 */
	export type Options = PatternCommandOptions;
}
