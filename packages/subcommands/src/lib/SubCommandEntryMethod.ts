import type { Args, Command } from '@sapphire/framework';
import { SubCommandEntry } from './SubCommandEntry';

/**
 * SubCommandEntryMethods support method names as subcommand functions. All methods must be on the **same** class.
 * For splitting sub-commands into different commands, see {@link SubCommandEntryCommand}
 * @example
 * ```ts
 * export class extends SubCommandPluginCommand {
 *  	public constructor(context: PieceContext) {
 * 			super(context, {
 * 				name: 'conf',
 * 				// by default, outputs default to inputs
 * 				subCommands: ['set', { input: 'list', default: true }]
 * 			})
 * 		}
 *
 * 		public async set(message: Message, args: Args) {
 * 			// !conf set is called here.
 * 		}
 *
 * 		public async list(message: Message, args: Args) {
 * 			// !conf list is called here.
 * 			// !conf is also called here. (see SubCommandEntry.default)
 * 		}
 * }
 * ```
 */
export class SubCommandEntryMethod<ArgType extends Args = Args, CommandType extends Command<ArgType> = Command<ArgType>> extends SubCommandEntry<
	ArgType,
	CommandType
> {
	public run(context: SubCommandEntry.RunContext<ArgType, CommandType>): unknown {
		const method = Reflect.get(context.command, this.output);
		if (method) return Reflect.apply(method, context.command, [context.message, context.args, context.context]);
		throw new ReferenceError(`The method '${this.input}' does not exist for the command '${context.command.name}'.`);
	}
}
