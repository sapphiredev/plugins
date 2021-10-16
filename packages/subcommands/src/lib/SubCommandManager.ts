import { Args, Command, err, Identifiers, UserError } from '@sapphire/framework';
import type { SubCommandEntry } from './SubCommandEntry';
import { SubCommandEntryCommand } from './SubCommandEntryCommand';
import { SubCommandEntryMethod } from './SubCommandEntryMethod';

export class SubCommandManager<ArgType extends Args = Args, CommandType extends Command<ArgType> = Command<ArgType>> {
	private readonly entries: SubCommandEntry<ArgType, CommandType>[] = [];
	private readonly default: SubCommandEntry<ArgType, CommandType> | null = null;

	public constructor(entries: SubCommandManager.RawEntries<ArgType, CommandType>) {
		for (const data of entries) {
			const value = this.resolve(data);
			const Ctor = SubCommandManager.handlers.get(value.type ?? 'method');
			if (!Ctor) throw new ReferenceError(`There is no sub command handler named '${value.type}' in 'SubCommandManager.handlers'.`);

			const entry = new Ctor(value);
			if (value.default) {
				if (this.default) throw new Error(`There was already a default of '${this.default.input}', cannot add '${value.input}'.`);
				this.default = entry;
			}

			this.entries.push(entry);
		}
	}

	public async messageRun(context: SubCommandEntry.MessageRunContext<ArgType, CommandType>) {
		// Pick one argument, then try to match a subcommand:
		context.args.save();
		const value = context.args.nextMaybe();

		if (value.exists) {
			for (const entry of this.entries) {
				if (await entry.match(value.value, context)) return entry.messageRun(context);
			}
		}

		// No subcommand matched, let's restore and try to run default, if any:
		context.args.restore();
		if (this.default) return this.default.messageRun(context);

		// No match and no subcommand, return an err:
		return err(new UserError({ identifier: Identifiers.SubCommandNoMatch, context }));
	}

	protected resolve(value: string | SubCommandManager.Entry<ArgType, CommandType>): SubCommandManager.Entry<ArgType, CommandType> {
		if (typeof value !== 'string') return value;
		return { input: value, output: value, type: 'method' };
	}

	public static readonly handlers = new Map([
		['command', SubCommandEntryCommand],
		['method', SubCommandEntryMethod]
	]);
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace SubCommandManager {
	export type Type = 'command' | 'method';
	export interface Entry<ArgType extends Args = Args, CommandType extends Command<ArgType> = Command<ArgType>>
		extends SubCommandEntry.Options<ArgType, CommandType> {
		type?: Type;
		default?: boolean;
	}

	export type RawEntries<ArgType extends Args = Args, CommandType extends Command<ArgType> = Command<ArgType>> = readonly (
		| string
		| Entry<ArgType, CommandType>
	)[];
}
