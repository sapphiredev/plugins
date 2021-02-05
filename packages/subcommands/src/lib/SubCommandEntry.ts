import type { Args, Awaited, Command, CommandContext } from '@sapphire/framework';
import type { Message } from 'discord.js';
import { isFunction } from '@sapphire/utilities';

export abstract class SubCommandEntry {
	public readonly input: string | ((context: SubCommandEntry.RunContext) => Awaited<string>);
	public readonly output: string;

	public constructor(options: SubCommandEntry.Options) {
		this.input = options.input;
		if (!options.output && typeof options.input !== 'string') throw new ReferenceError('No output provided.');
		this.output = options.output ?? (options.input as string);
	}

	public async match(value: string, context: SubCommandEntry.RunContext): Promise<boolean> {
		return (isFunction(this.input) ? await this.input(context) : this.input) === value;
	}

	public abstract run(context: SubCommandEntry.RunContext): unknown;
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace SubCommandEntry {
	export interface Options {
		input: string | ((context: RunContext) => Awaited<string>);
		output?: string;
	}

	export interface RunContext {
		command: Command;
		message: Message;
		args: Args;
		context: CommandContext;
	}
}
