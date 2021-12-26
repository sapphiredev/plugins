import { container } from '@sapphire/framework';
import type { Awaitable } from '@sapphire/utilities';
import { ScheduledTaskRedisStrategy } from './strategies/ScheduledTaskRedisStrategy';
import type { ScheduledTaskStore } from './structures/ScheduledTaskStore';
import type { ScheduledTaskBaseStrategy, ScheduledTasksOptions, ScheduledTasksTaskOptions } from './types';

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

	public run(task: string, payload: unknown): Awaitable<unknown> {
		const piece = this.store.get(task);

		return piece?.run(payload);
	}

	private get store(): ScheduledTaskStore {
		return container.client.stores.get('scheduled-tasks');
	}
}
