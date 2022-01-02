import { Piece, PieceContext, PieceOptions } from '@sapphire/pieces';
import type { Awaitable } from '@sapphire/utilities';

export abstract class ScheduledTask extends Piece {
	public readonly interval: number | null;
	public readonly cron: string | null;

	public constructor(context: PieceContext, options: ScheduledTaskOptions) {
		super(context, options);
		this.interval = options.interval ?? null;
		this.cron = options.cron ?? null;
	}

	public abstract run(payload: unknown): Awaitable<unknown>;

	public shouldRun(_payload: unknown): boolean {
		return true;
	}
}

export interface ScheduledTasks {}

export interface ScheduledTaskOptions extends PieceOptions {
	interval?: number | null;
	cron?: string | null;
}
