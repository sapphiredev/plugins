import { Piece } from '@sapphire/pieces';
import type { Awaitable } from '@sapphire/utilities';

export abstract class ScheduledTask extends Piece {
	public readonly interval: number | null;
	public readonly cron: string | null;
	public readonly bullJobsOptions?: unknown;

	public constructor(context: Piece.Context, options: ScheduledTaskOptions) {
		super(context, options);
		this.interval = options.interval ?? null;
		this.cron = options.cron ?? null;

		// @ts-expect-error For redis strategy this property will actually be defined
		this.bullJobsOptions = options.bullJobsOptions;
	}

	public abstract run(payload: unknown): Awaitable<unknown>;
}

export interface ScheduledTaskOptions extends Piece.Options {
	interval?: number | null;
	cron?: string | null;
}

export namespace ScheduledTask {
	export type Options = ScheduledTaskOptions;
	export type Context = Piece.Context;
}
