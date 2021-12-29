import { container, fromAsync, isErr } from '@sapphire/framework';
import { ScheduledTaskRedisStrategy } from './strategies/ScheduledTaskRedisStrategy';
import type { ScheduledTaskStore } from './structures/ScheduledTaskStore';
import type { ScheduledTaskBaseStrategy, ScheduledTasksOptions, ScheduledTasksTaskOptions } from './types';
import { ScheduledTaskEvents } from './types/ScheduledTaskEvents';

export class ScheduledTaskHandler {
	public readonly strategy: ScheduledTaskBaseStrategy;

	public constructor(options: ScheduledTasksOptions | undefined) {
		this.strategy = options?.strategy ?? new ScheduledTaskRedisStrategy();
	}

	public async connect() {
		await this.strategy.connect();
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

	public async run(task: string, payload: unknown): Promise<unknown> {
		const piece = this.store.get(task);

		if (!piece) {
			container.client.emit(ScheduledTaskEvents.ScheduledTaskNotFound, task, payload);
			return;
		}

		const result = await fromAsync(async () => {
			container.client.emit(ScheduledTaskEvents.ScheduledTaskRun, task, payload);
			const result = await piece?.run(payload);
			container.client.emit(ScheduledTaskEvents.ScheduledTaskSuccess, task, payload, result);
		});

		if (isErr(result)) {
			container.client.emit(ScheduledTaskEvents.ScheduledTaskError, result.error, task, payload);
		}

		container.client.emit(ScheduledTaskEvents.ScheduledTaskFinished, task, payload);

		return result;
	}

	private get store(): ScheduledTaskStore {
		return container.client.stores.get('scheduled-tasks');
	}
}
