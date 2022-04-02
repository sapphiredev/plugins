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

export interface ScheduledTaskRedisStrategyJob<T = unknown> {
	task: string;
	payload?: T;
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

	public connect(): void {
		const connectResult = from(() => {
			this.bullClient = new Bull(this.queue, this.options);
			void this.bullClient.process('*', (job) => this.run(job?.data?.task, job?.data?.payload));
		});

		if (isErr(connectResult)) {
			container.client.emit(ScheduledTaskEvents.ScheduledTaskStrategyConnectError, connectResult.error);
		}
	}

	public create<T = unknown>(
		task: string,
		payload?: unknown,
		options?: ScheduledTasksTaskOptions
	): Promise<Bull.Job<ScheduledTaskRedisStrategyJob<T>>> | undefined {
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
					  },
				...options.bullJobOptions
			};
		}

		return this.bullClient.add(
			{
				task,
				payload
			},
			bullOptions
		) as Promise<Bull.Job<ScheduledTaskRedisStrategyJob<T>>> | undefined;
	}

	public async createRepeated(tasks: ScheduledTaskCreateRepeatedTask[]): Promise<void> {
		for (const task of tasks) {
			await this.create(task.name, null, task.options);
		}
	}

	public async delete(id: JobId): Promise<void> {
		if (!this.bullClient) {
			return;
		}

		const job = await this.get(id);
		return job?.remove();
	}

	public list<T = unknown>(options: ScheduledTaskRedisStrategyListOptions): Promise<Bull.Job<ScheduledTaskRedisStrategyJob<T>>[]> | undefined {
		const { types, start, end, asc } = options;
		if (!this.bullClient) {
			return;
		}

		return this.bullClient.getJobs(types, start, end, asc) as Promise<Bull.Job<ScheduledTaskRedisStrategyJob<T>>[]> | undefined;
	}

	public listRepeated(options: ScheduledTaskRedisStrategyListRepeatedOptions): Promise<Bull.JobInformation[]> | undefined {
		const { start, end, asc } = options;
		if (!this.bullClient) {
			return;
		}

		return this.bullClient.getRepeatableJobs(start, end, asc);
	}

	public get<T = unknown>(id: JobId): Promise<Bull.Job<ScheduledTaskRedisStrategyJob<T>> | null> | undefined {
		if (!this.bullClient) {
			return;
		}

		return this.bullClient.getJob(id) as Promise<Bull.Job<ScheduledTaskRedisStrategyJob<T>> | null> | undefined;
	}

	public run(task: string, payload: unknown): Promise<unknown> {
		return container.tasks.run(task, payload);
	}
}
