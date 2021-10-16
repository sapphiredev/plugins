import { Args, Command, container } from '@sapphire/framework';
import { SubCommandEntry } from './SubCommandEntry';

/**
 * SubCommandEntryCommand uses other commands as the caller function for subcommands.
 * @example
 * ```ts
 * // here, using `command set` would call the command `modify-settings`.
 * subCommands: [{
 * 	input: 'set',
 * 	output: 'modify-settings'
 * }]
 * ```
 */
export class SubCommandEntryCommand<ArgType extends Args = Args, CommandType extends Command<ArgType> = Command<ArgType>> extends SubCommandEntry<
	ArgType,
	CommandType
> {
	public messageRun(context: SubCommandEntry.MessageRunContext<ArgType, CommandType>): unknown {
		const command = container.stores.get('commands').get(this.output);
		if (command) return command.messageRun(context.message, context.args, context.context);
		throw new ReferenceError(`The command '${this.input}' does not exist.`);
	}
}
