import { Args, Awaited, Command, CommandContext, CommandOptions, PieceContext } from '@sapphire/framework';
import type { Message } from 'discord.js';
import { SubCommandManager } from './SubCommandManager';

export class SubCommandPluginCommand<ArgType extends Args = Args, CommandType extends Command<ArgType> = Command<ArgType>> extends Command<ArgType> {
	public readonly subCommands: SubCommandManager<ArgType, CommandType> | null;

	public constructor(context: PieceContext, options: SubCommandPluginCommandOptions<ArgType>) {
		super(context, options);

		this.subCommands = options.subCommands ? new SubCommandManager(options.subCommands) : null;
	}

	public run(message: Message, args: ArgType, context: CommandContext): Awaited<unknown> {
		if (!this.subCommands) throw new Error(`The command ${this.name} does not have a 'run' method and does not support sub-commands.`);
		return this.subCommands.run({ message, args, context, command: (this as unknown) as CommandType });
	}
}

export interface SubCommandPluginCommandOptions<ArgType extends Args = Args, CommandType extends Command<ArgType> = Command<ArgType>>
	extends CommandOptions {
	subCommands?: SubCommandManager.RawEntries<ArgType, CommandType>;
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace SubCommandPluginCommand {
	/**
	 * The SubCommandPluginCommand Options
	 */
	export type Options = SubCommandPluginCommandOptions;
}
