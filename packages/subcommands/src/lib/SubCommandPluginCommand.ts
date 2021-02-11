import { Args, Awaited, Command, CommandContext, CommandOptions, PieceContext } from '@sapphire/framework';
import type { Message } from 'discord.js';
import { SubCommandManager } from './SubCommandManager';

export class SubCommandPluginCommand<T extends Args = Args> extends Command<T> {
	public readonly subCommands: SubCommandManager<T> | null;
	public constructor(context: PieceContext, options: SubCommandPluginCommandOptions<T>) {
		super(context, options);

		this.subCommands = options.subCommands ? new SubCommandManager(options.subCommands) : null;
	}

	public run(message: Message, args: T, context: CommandContext): Awaited<unknown> {
		if (!this.subCommands) throw new Error(`The command ${this.name} does not have a 'run' method and does not support sub-commands.`);
		return this.subCommands.run({ message, args, context, command: this });
	}
}

export interface SubCommandPluginCommandOptions<T extends Args = Args> extends CommandOptions {
	subCommands: SubCommandManager.RawEntries<T>;
}
