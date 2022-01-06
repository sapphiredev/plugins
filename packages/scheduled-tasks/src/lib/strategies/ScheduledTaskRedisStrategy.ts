import { container, from, isErr } from '@sapphire/framework';
import Bull, { JobId, JobOptions, JobStatus, Queue, QueueOptions } from 'bull';
import type { ScheduledTaskBaseStrategy } from '../types/ScheduledTaskBaseStrategy';
import type { ScheduledTaskCreateRepeatedTask } from '../types/ScheduledTaskCreateRepeatedTask';
import { ScheduledTaskEvents } from '../types/ScheduledTaskEvents';
import type { ScheduledTasksTaskOptions } from '../types/ScheduledTasksTaskOptions';

export interface ScheduledTaskRedisStrategyOptions {
	queue?: string;
	bull?: QueueOptions;
}

export interface ScheduledTaskRedisStrategyJob {
	task: string;
	payload?: unknown;
}

export interface ScheduledTaskRedisStrategyListRepeatedOptions {
	start?: number;
	end?: number;
	asc?: boolean;
}

export interface ScheduledTaskRedisStrategyListOptions extends ScheduledTaskRedisStrategyListRepeatedOptions {
	types: JobStatus[];
}

export type BullClient = Queue<ScheduledTaskRedisStrategyJob>;

export class ScheduledTaskRedisStrategy implements ScheduledTaskBaseStrategy {
	public readonly options: QueueOptions;
	public readonly queue: string;

	private bullClient!: BullClient;

	public constructor(options?: ScheduledTaskRedisStrategyOptions) {
		this.queue = options?.queue ?? 'scheduled-tasks';
		this.options = options?.bull ?? {};
	}

	public get client(): BullClient {
		return this.bullClient;
	}

	public connect() {
		const connectResult = from(() => {
			this.bullClient = new Bull(this.queue, this.options);
			void this.bullClient.process((job) => this.run(job?.data?.task, job?.data?.payload));
		});

		if (isErr(connectResult)) {
			container.client.emit(ScheduledTaskEvents.ScheduledTaskStrategyConnectError, connectResult.error);
		}
	}

	public create(task: string, payload?: unknown, options?: ScheduledTasksTaskOptions) {
		if (!this.bullClient) {
			return;
		}

		let bullOptions: JobOptions = { delay: options?.delay };

		if (options?.type === 'repeated') {
			bullOptions = {
				repeat: options?.interval
					? {
							every: options.interval!
					  }
					: {
							cron: options.cron!
					  }
			};
		}

		return this.bullClient.add(
			{
				task,
				payload
			},
			bullOptions
		);
	}

	public async createRepeated(tasks: ScheduledTaskCreateRepeatedTask[]) {
		for (const task of tasks) {
			await this.create(task.name, null, task.options);
		}
	}

	public async delete(id: JobId) {
		if (!this.bullClient) {
			return;
		}

		const job = await this.get(id);
		return job?.remove();
	}

	public list(options: ScheduledTaskRedisStrategyListOptions) {
		const { types, start, end, asc } = options;
		if (!this.bullClient) {
			return;
		}

		return this.bullClient.getJobs(types, start, end, asc);
	}

	public listRepeated(options: ScheduledTaskRedisStrategyListRepeatedOptions) {
		const { start, end, asc } = options;
		if (!this.bullClient) {
			return;
		}

		return this.bullClient.getRepeatableJobs(start, end, asc);
	}

	public get(id: JobId) {
		if (!this.bullClient) {
			return;
		}

		return this.bullClient.getJob(id);
	}

	public run(task: string, payload: unknown) {
		return container.tasks.run(task, payload);
	}
}
