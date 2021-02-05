import { Args, Awaited, Command, CommandContext, CommandOptions, PieceContext } from '@sapphire/framework';
import type { Message } from 'discord.js';
import { SubCommandManager } from './SubCommandManager';

export class SubCommandPluginCommand extends Command {
	public readonly subCommands: SubCommandManager | null;
	public constructor(context: PieceContext, options: SubCommandPluginCommandOptions) {
		super(context, options);

		this.subCommands = options.subCommands ? new SubCommandManager(options.subCommands) : null;
	}

	public run(message: Message, args: Args, context: CommandContext): Awaited<unknown> {
		if (!this.subCommands) throw new Error(`The command ${this.name} does not have a 'run' method and does not support sub-commands.`);
		return this.subCommands.run({ message, args, context, command: this });
	}
}

export interface SubCommandPluginCommandOptions extends CommandOptions {
	subCommands: SubCommandManager.RawEntries;
}
