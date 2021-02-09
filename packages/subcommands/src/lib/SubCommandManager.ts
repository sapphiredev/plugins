import { Args, err, UserError } from '@sapphire/framework';
import type { SubCommandEntry } from './SubCommandEntry';
import { SubCommandEntryCommand } from './SubCommandEntryCommand';
import { SubCommandEntryMethod } from './SubCommandEntryMethod';

export class SubCommandManager<T extends Args> {
	private readonly entries: SubCommandEntry<T>[] = [];
	private readonly default: SubCommandEntry<T> | null = null;

	public constructor(entries: SubCommandManager.RawEntries<T>) {
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

	public async run(context: SubCommandEntry.RunContext<T>) {
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
		return err(new UserError({ identifier: 'SubCommandNoMatch', context }));
	}

	protected resolve(value: string | SubCommandManager.Entry<T>): SubCommandManager.Entry<T> {
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
	export interface Entry<T extends Args> extends SubCommandEntry.Options<T> {
		type?: Type;
		default?: boolean;
	}

	export type RawEntries<T extends Args> = readonly (string | Entry<T>)[];
}
