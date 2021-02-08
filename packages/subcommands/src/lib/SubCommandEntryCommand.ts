import { isFunction } from '@sapphire/utilities';
import { SubCommandEntry } from './SubCommandEntry';

export class SubCommandEntryCommand extends SubCommandEntry {
	public async run(context: SubCommandEntry.RunContext): Promise<unknown> {
		const command = context.message.client.stores.get('commands').get(isFunction(this.input) ? await this.input(context) : this.input);
		if (command) return command.run(context.message, context.args, context.context);
		throw new ReferenceError(`The command '${this.input}' does not exist.`);
	}
}
