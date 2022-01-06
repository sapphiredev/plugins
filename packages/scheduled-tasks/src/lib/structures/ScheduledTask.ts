import { Piece } from '@sapphire/pieces';
import type { Awaitable } from '@sapphire/utilities';

export abstract class ScheduledTask extends Piece {
	public readonly interval: number | null;
	public readonly cron: string | null;

	public constructor(context: Piece.Context, options: ScheduledTaskOptions) {
		super(context, options);
		this.interval = options.interval ?? null;
		this.cron = options.cron ?? null;
	}

	public abstract run(payload: unknown): Awaitable<unknown>;
}

export interface ScheduledTasks {}

export interface ScheduledTaskOptions extends Piece.Options {
	interval?: number | null;
	cron?: string | null;
}
