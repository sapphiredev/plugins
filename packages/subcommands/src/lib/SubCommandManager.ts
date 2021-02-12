import { Args, Command, err, Identifiers, UserError } from '@sapphire/framework';
import type { SubCommandEntry } from './SubCommandEntry';
import { SubCommandEntryCommand } from './SubCommandEntryCommand';
import { SubCommandEntryMethod } from './SubCommandEntryMethod';

export class SubCommandManager<T extends Args, C extends Command> {
	private readonly entries: SubCommandEntry<T, C>[] = [];
	private readonly default: SubCommandEntry<T, C> | null = null;

	public constructor(entries: SubCommandManager.RawEntries<T, C>) {
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

	public async run(context: SubCommandEntry.RunContext<T, C>) {
		// Pick one argument, then try to match a subcommand:
		context.args.save();
		const value = context.args.nextMaybe();

		if (value.exists) {
			for (const entry of this.entries) {
				if (await entry.match(value.value, context)) return entry.run(context);
			}
		}

		// No subcommand matched, let's restore and try to run default, if any:
		context.args.restore();
		if (this.default) return this.default.run(context);

		// No match and no subcommand, return an err:
		return err(new UserError({ identifier: Identifiers.SubCommandNoMatch, context }));
	}

	protected resolve(value: string | SubCommandManager.Entry<T, C>): SubCommandManager.Entry<T, C> {
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
	export interface Entry<T extends Args, C extends Command> extends SubCommandEntry.Options<T, C> {
		type?: Type;
		default?: boolean;
	}

	export type RawEntries<T extends Args, C extends Command> = readonly (string | Entry<T, C>)[];
}
