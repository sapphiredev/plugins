import { container, fromAsync, isErr } from '@sapphire/framework';
import { Stopwatch } from '@sapphire/stopwatch';
import { ScheduledTaskRedisStrategy } from './strategies/ScheduledTaskRedisStrategy';
import type { ScheduledTaskStore } from './structures/ScheduledTaskStore';
import type { ScheduledTaskBaseStrategy } from './types/ScheduledTaskBaseStrategy';
import { ScheduledTaskEvents } from './types/ScheduledTaskEvents';
import type { ScheduledTasksOptions } from './types/ScheduledTasksOptions';
import type { ScheduledTasksTaskOptions } from './types/ScheduledTasksTaskOptions';

export class ScheduledTaskHandler {
	public readonly strategy: ScheduledTaskBaseStrategy;

	public constructor(options: ScheduledTasksOptions | undefined) {
		this.strategy = options?.strategy ?? new ScheduledTaskRedisStrategy();
		this.strategy.connect();
	}

	public get client(): ScheduledTaskBaseStrategy['client'] {
		return this.strategy.client;
	}

	public create(task: string, payload: unknown, options?: ScheduledTasksTaskOptions | number) {
		if (typeof options === 'number') {
			options = {
				type: 'default',
				delay: options
			};
		}

		return this.strategy.create(task, payload, options);
	}

	public createRepeated() {
		const { store } = this;

		return this.strategy.createRepeated(
			store.repeatedTasks.map((piece) => ({
				name: piece.name,
				options: {
					type: 'repeated',
					...(piece.interval
						? {
								interval: piece.interval
						  }
						: { cron: piece.cron! })
				}
			}))
		);
	}

	public delete(id?: unknown) {
		return this.strategy.delete(id);
	}

	public list(options?: unknown) {
		return this.strategy.list(options);
	}

	public listRepeated(options?: unknown) {
		return this.strategy.listRepeated(options);
	}

	public get(id: unknown) {
		return this.strategy.get(id);
	}

	public async run(task: string, payload: unknown): Promise<unknown> {
		const piece = this.store.get(task);

		if (!piece) {
			container.client.emit(ScheduledTaskEvents.ScheduledTaskNotFound, task, payload);
			return;
		}

		const result = await fromAsync(async () => {
			container.client.emit(ScheduledTaskEvents.ScheduledTaskRun, task, payload);

			const stopwatch = new Stopwatch();

			const taskRunResult = await piece.run(payload);

			const { duration } = stopwatch.stop();

			container.client.emit(ScheduledTaskEvents.ScheduledTaskSuccess, task, payload, taskRunResult, duration);

			return duration;
		});

		if (isErr(result)) {
			container.client.emit(ScheduledTaskEvents.ScheduledTaskError, result.error, task, payload);
		}

		container.client.emit(ScheduledTaskEvents.ScheduledTaskFinished, task, result.value, payload);

		return result.value;
	}

	private get store(): ScheduledTaskStore {
		return container.client.stores.get('scheduled-tasks');
	}
}
