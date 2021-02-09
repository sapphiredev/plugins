import { SubCommandEntry } from './SubCommandEntry';

/**
 * SubCommandEntryCommand uses other commands as the caller function for subcommands.
 * @example
 * ```ts
 * // here, using `command set` would call the command `modify-settings`.
 * subCommands: [{
 * 	input: 'set',
 * 	output: 'modify-settings
 * }]
 * ```
 */
export class SubCommandEntryCommand extends SubCommandEntry {
	public run(context: SubCommandEntry.RunContext): unknown {
		const command = context.message.client.stores.get('commands').get(this.output);
		if (command) return command.run(context.message, context.args, context.context);
		throw new ReferenceError(`The command '${this.input}' does not exist.`);
	}
}
