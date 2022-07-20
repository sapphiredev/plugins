import { container, from, isErr } from '@sapphire/framework';
import { EntryId, JobState, Queue, QueueOptions, Job, JobInformation3, Worker, QueueScheduler, JobsOptions } from 'bullmq';
import type { ScheduledTaskBaseStrategy } from '../types/ScheduledTaskBaseStrategy';
import type { ScheduledTaskCreateRepeatedTask } from '../types/ScheduledTaskCreateRepeatedTask';
import { ScheduledTaskEvents } from '../types/ScheduledTaskEvents';
import type { ScheduledTasksTaskOptions } from '../types/ScheduledTasksTaskOptions';

export interface ScheduledTaskRedisStrategyOptions {
	queue?: string;
	bull?: QueueOptions;
}

export interface ScheduledTaskRedisStrategyJob {}

export interface ScheduledTaskRedisStrategyListRepeatedOptions {
	start?: number;
	end?: number;
	asc?: boolean;
}

export interface ScheduledTaskRedisStrategyListOptions extends ScheduledTaskRedisStrategyListRepeatedOptions {
	types: JobState[];
}

export type BullClient = Queue<ScheduledTaskRedisStrategyJob | null>;

export class ScheduledTaskRedisStrategy implements ScheduledTaskBaseStrategy {
	public readonly options: QueueOptions;
	public readonly queue: string;
	private queueClient!: BullClient;

	public constructor(options?: ScheduledTaskRedisStrategyOptions) {
		this.queue = options?.queue ?? 'scheduled-tasks';
		this.options = options?.bull ?? {};
	}

	public get client(): BullClient {
		return this.queueClient;
	}

	public connect(): void {
		const connectResult = from(() => {
			this.queueClient = new Queue(this.queue, this.options);
			new QueueScheduler(this.queue, { connection: this.options.connection });
			new Worker(this.queue, async (job) => this.run(job?.name, job?.data), { connection: this.options.connection });
		});

		if (isErr(connectResult)) {
			container.client.emit(ScheduledTaskEvents.ScheduledTaskStrategyConnectError, connectResult.error);
		}
	}

	public create<T = unknown>(
		task: string,
		payload?: ScheduledTaskRedisStrategyJob | null,
		options?: ScheduledTasksTaskOptions
	): Promise<Job<T>> | undefined {
		if (!this.queueClient) {
			return;
		}

		let jobOptions: JobsOptions = {
			delay: options?.delay,
			...options?.customJobOptions
		};

		if (options?.repeated) {
			jobOptions = {
				...jobOptions,
				repeat: options?.interval
					? {
							every: options.interval!
					  }
					: {
							cron: options.cron!
					  }
			};
		}

		return this.queueClient.add(task, payload ?? null, jobOptions) as Promise<Job<T>> | undefined;
	}

	public async createRepeated(tasks: ScheduledTaskCreateRepeatedTask[]): Promise<void> {
		for (const task of tasks) {
			await this.create(task.name, null, task.options);
		}
	}

	public async delete(id: EntryId): Promise<void> {
		if (!this.queueClient) {
			return;
		}

		const job = await this.get(id);
		return job?.remove();
	}

	public list<T = unknown>(options: ScheduledTaskRedisStrategyListOptions): Promise<Job<T>[]> | undefined {
		const { types, start, end, asc } = options;
		if (!this.queueClient) {
			return;
		}

		return this.queueClient.getJobs(types, start, end, asc) as Promise<Job<T>[]> | undefined;
	}

	public listRepeated(options: ScheduledTaskRedisStrategyListRepeatedOptions): Promise<JobInformation3[]> | undefined {
		const { start, end, asc } = options;
		if (!this.queueClient) {
			return;
		}

		return this.queueClient.getRepeatableJobs(start, end, asc);
	}

	public get<T = unknown>(id: EntryId): Promise<Job<T> | null> | undefined {
		if (!this.queueClient) {
			return;
		}

		return this.queueClient.getJob(id) as Promise<Job<T> | null> | undefined;
	}

	public run(task: string, payload: unknown): Promise<unknown> {
		return container.tasks.run(task, payload);
	}
}
