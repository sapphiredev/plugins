import { Args, Command, Store } from '@sapphire/framework';
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
export class SubCommandEntryCommand<T extends Args, C extends Command> extends SubCommandEntry<T, C> {
	public run(context: SubCommandEntry.RunContext<T, C>): unknown {
		const command = Store.injectedContext.stores.get('commands').get(this.output);
		if (command) return command.run(context.message, context.args, context.context);
		throw new ReferenceError(`The command '${this.input}' does not exist.`);
	}
}
