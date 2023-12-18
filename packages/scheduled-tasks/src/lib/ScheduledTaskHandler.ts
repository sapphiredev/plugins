import { container, Result } from '@sapphire/framework';
import { Stopwatch } from '@sapphire/stopwatch';
import { Job, Queue, Worker, type EntryId, type JobsOptions, type QueueOptions } from 'bullmq';
import type { ScheduledTaskStore } from './structures/ScheduledTaskStore';
import { ScheduledTaskEvents } from './types/ScheduledTaskEvents';
import type {
	BullClient,
	ScheduledTaskCreateRepeatedTask,
	ScheduledTaskHandlerOptions,
	ScheduledTaskJob,
	ScheduledTaskListOptions,
	ScheduledTaskListRepeatedOptions,
	ScheduledTaskListRepeatedReturnType,
	ScheduledTasks,
	ScheduledTasksTaskOptions
} from './types/ScheduledTaskTypes';

export class ScheduledTaskHandler {
	public readonly options: QueueOptions;
	public readonly queue: string;
	#internalClient: BullClient | null = null;

	public constructor(options?: ScheduledTaskHandlerOptions) {
		this.queue = options?.queue ?? 'scheduled-tasks';
		this.options = options?.bull ?? {};

		const connectResult = Result.from(() => {
			this.#internalClient = new Queue(this.queue, this.options);
			new Worker(this.queue, async (job) => this.run(job?.name, job?.data), { connection: this.options.connection });
		});

		connectResult.inspectErr((error) => container.client.emit(ScheduledTaskEvents.ScheduledTaskStrategyConnectError, error));
	}

	public get client(): BullClient {
		return this.#internalClient!;
	}

	public create<T = unknown>(
		task: keyof ScheduledTasks,
		payload?: ScheduledTaskJob | null,
		options?: ScheduledTasksTaskOptions | number
	): Promise<Job<T, any, string>> | undefined {
		if (!this.#internalClient) {
			return;
		}

		if (typeof options === 'number') {
			options = {
				repeated: false,
				delay: options
			};
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
							pattern: options.pattern!,
							tz: options.timezone
						}
			};
		}

		return this.#internalClient.add(task, payload ?? null, jobOptions) as Promise<Job<T>> | undefined;
	}

	public async createRepeated(tasks?: ScheduledTaskCreateRepeatedTask[]): Promise<void> {
		const { store } = this;

		tasks ??= store.repeatedTasks.map((piece) => ({
			name: piece.name,
			options: {
				repeated: true,
				...(piece.interval
					? {
							interval: piece.interval,
							customJobOptions: piece.customJobOptions
						}
					: {
							pattern: piece.pattern!,
							timezone: piece.timezone,
							customJobOptions: piece.customJobOptions
						})
			}
		}));

		for (const task of tasks) {
			await this.create(task.name as keyof ScheduledTasks, null, task.options);
		}
	}

	public async delete(id: EntryId): Promise<void> {
		if (!this.#internalClient) {
			return;
		}

		const job = await this.get(id);
		return job?.remove();
	}

	public list<T = unknown>(options: ScheduledTaskListOptions): Promise<Job<T>[]> | undefined {
		const { types, start, end, asc } = options;
		if (!this.#internalClient) {
			return;
		}

		return this.#internalClient.getJobs(types, start, end, asc) as Promise<Job<T>[]> | undefined;
	}

	public listRepeated(options: ScheduledTaskListRepeatedOptions): Promise<ScheduledTaskListRepeatedReturnType> | undefined {
		const { start, end, asc } = options;
		if (!this.#internalClient) {
			return;
		}

		return this.#internalClient.getRepeatableJobs(start, end, asc);
	}

	public get<T = unknown>(id: EntryId): Promise<Job<T> | null> | undefined {
		if (!this.#internalClient) {
			return;
		}

		return this.#internalClient.getJob(id) as Promise<Job<T> | null> | undefined;
	}

	public async run(task: string, payload: unknown): Promise<unknown> {
		const piece = this.store.get(task);

		if (!piece) {
			container.client.emit(ScheduledTaskEvents.ScheduledTaskNotFound, task, payload);
			return;
		}

		const result = await Result.fromAsync(async () => {
			container.client.emit(ScheduledTaskEvents.ScheduledTaskRun, task, payload);

			const stopwatch = new Stopwatch();
			const taskRunResult = await piece.run(payload);
			const { duration } = stopwatch.stop();

			container.client.emit(ScheduledTaskEvents.ScheduledTaskSuccess, task, payload, taskRunResult, duration);

			return duration;
		});

		result.inspectErr((error) => container.client.emit(ScheduledTaskEvents.ScheduledTaskError, error, task, payload));

		const value = result.unwrapOr(null);

		container.client.emit(ScheduledTaskEvents.ScheduledTaskFinished, task, value, payload);

		return value;
	}

	private get store(): ScheduledTaskStore {
		return container.client.stores.get('scheduled-tasks') as unknown as ScheduledTaskStore;
	}
}
