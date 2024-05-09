import { container, Result } from '@sapphire/framework';
import { Stopwatch } from '@sapphire/stopwatch';
import { Job, Queue, Worker, type JobsOptions, type QueueOptions, isNotConnectionError } from 'bullmq';
import type { ScheduledTaskStore } from './structures/ScheduledTaskStore';
import { ScheduledTaskEvents } from './types/ScheduledTaskEvents';
import type {
	BullClient,
	ScheduledTaskCreateRepeatedTask,
	ScheduledTaskHandlerOptions,
	ScheduledTaskListOptions,
	ScheduledTaskListRepeatedOptions,
	ScheduledTaskListRepeatedReturnType,
	ScheduledTasksResolvable,
	ScheduledTasksKeys,
	ScheduledTasksTaskOptions,
	ScheduledTasksKeysNoPayload,
	ScheduledTasksJob,
	ScheduledTasksResolvablePayload,
	ScheduledTasksPayload
} from './types/ScheduledTaskTypes';
import { isNullish } from '@sapphire/utilities';

export class ScheduledTaskHandler {
	/**
	 * The queue options for the scheduled task handler.
	 */
	public readonly options: QueueOptions;

	/**
	 * The name of the queue associated with the scheduled task handler.
	 */
	public readonly queue: string;

	#client: BullClient;
	#worker: Worker;

	public constructor(options: ScheduledTaskHandlerOptions) {
		this.queue = options.queue ?? 'scheduled-tasks';
		this.options = options.bull;

		this.#client = new Queue(this.queue, this.options);
		this.#worker = new Worker(
			this.queue, //
			async (job) => this.run({ name: job.name as ScheduledTasksKeys, payload: job.data }),
			{ connection: this.options.connection }
		);

		this.#client.on('error', (error) => {
			if (isNotConnectionError(error)) {
				container.client.emit(ScheduledTaskEvents.ScheduledTaskStrategyClientError, error);
			} else {
				container.client.emit(ScheduledTaskEvents.ScheduledTaskStrategyConnectError, error);
			}
		});
		this.#worker.on('error', (error) => {
			if (isNotConnectionError(error)) {
				container.client.emit(ScheduledTaskEvents.ScheduledTaskStrategyWorkerError, error);
			} else {
				container.client.emit(ScheduledTaskEvents.ScheduledTaskStrategyConnectError, error);
			}
		});
	}

	public get client(): BullClient {
		return this.#client;
	}

	/**
	 * Closes the internal client and worker.
	 */
	public async close(): Promise<void> {
		await Promise.all([
			this.#client.close(), //
			this.#worker.close()
		]);
	}

	/**
	 * Creates a scheduled task.
	 *
	 * @param task - The task to be scheduled.
	 * @param options - The options for the task.
	 */
	public async create<T extends ScheduledTasksResolvable>(
		task: T, //
		options?: ScheduledTasksTaskOptions | number
	): Promise<ScheduledTasksJob<T>> {
		const { name: taskName, payload } = this.resolveTask(task);

		if (isNullish(options)) {
			return this.#client.add(taskName, payload) as Promise<ScheduledTasksJob<T>>;
		}

		if (typeof options === 'number') {
			options = {
				repeated: false,
				delay: options
			};
		}

		const { repeated, pattern, interval, delay, customJobOptions, timezone } = options;
		let jobOptions: JobsOptions = {
			delay,
			...customJobOptions
		};

		if (repeated) {
			jobOptions = {
				...jobOptions,
				repeat: interval //
					? { every: interval }
					: { pattern, tz: timezone }
			};
		}

		return this.#client.add(taskName, payload, jobOptions) as Promise<ScheduledTasksJob<T>>;
	}

	/**
	 * Creates repeated tasks.
	 *
	 * @param tasks - An optional array of tasks to create. If not provided, it will create tasks based on the stored repeated tasks.
	 */
	public async createRepeated(tasks?: ScheduledTaskCreateRepeatedTask[]): Promise<void> {
		if (tasks === undefined) {
			const repeatedTasks: ScheduledTaskCreateRepeatedTask[] = this.store.repeatedTasks.map((piece) => ({
				name: piece.name as ScheduledTasksKeysNoPayload,
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

			tasks = repeatedTasks;
		}

		for (const task of tasks) {
			await this.create(task.name, task.options);
		}
	}

	/**
	 * Deletes a scheduled task by its ID.
	 *
	 * @param id - The ID of the task to delete.
	 */
	public async delete(id: string): Promise<void> {
		const job = (await this.get(id as ScheduledTasksKeys)) as unknown as Job<unknown> | undefined;
		return job?.remove();
	}

	/**
	 * Retrieves a list of scheduled tasks based on the provided options.
	 *
	 * @param options - The options for filtering the list of scheduled tasks.
	 */
	public list(options: ScheduledTaskListOptions): Promise<Job<unknown>[]> {
		const { types, start, end, asc } = options;

		return this.#client.getJobs(types, start, end, asc);
	}

	/**
	 * Retrieves a list of repeated scheduled tasks based on the provided options.
	 *
	 * @param options - The options for filtering the list of repeated scheduled tasks.
	 */
	public listRepeated(options: ScheduledTaskListRepeatedOptions): Promise<ScheduledTaskListRepeatedReturnType> {
		const { start, end, asc } = options;

		return this.#client.getRepeatableJobs(start, end, asc);
	}

	/**
	 * Retrieves a scheduled task by its ID.
	 *
	 * @param id - The ID of the scheduled task to retrieve.
	 */
	public async get<T extends ScheduledTasksKeys>(id: T): Promise<Job<ScheduledTasksPayload<T>> | undefined> {
		const job = await this.#client.getJob(id);
		if (isNullish(job)) return undefined;

		return job as Job<ScheduledTasksPayload<T>>;
	}

	/**
	 * Runs a scheduled task with the given name and payload.
	 *
	 * @param task - The name of the scheduled task to run.
	 *
	 * @remarks `undefined` will be returned if the task was not found.
	 */
	public async run(task: ScheduledTasksResolvable): Promise<number | null | undefined> {
		const { name: taskName, payload } = this.resolveTask(task);
		const piece = this.store.get(task.name);

		if (!piece) {
			container.client.emit(ScheduledTaskEvents.ScheduledTaskNotFound, taskName, payload);

			return undefined;
		}

		const result = await Result.fromAsync(async () => {
			container.client.emit(ScheduledTaskEvents.ScheduledTaskRun, piece, payload);

			const stopwatch = new Stopwatch();
			const taskRunResult = await piece.run(payload);
			const { duration } = stopwatch.stop();

			container.client.emit(ScheduledTaskEvents.ScheduledTaskSuccess, piece, payload, taskRunResult, duration);

			return duration;
		});

		result.inspectErr((error) => container.client.emit(ScheduledTaskEvents.ScheduledTaskError, error, piece, payload));

		const value = result.unwrapOr(null);

		container.client.emit(ScheduledTaskEvents.ScheduledTaskFinished, piece, value, payload);

		return value;
	}

	private get store(): ScheduledTaskStore {
		return container.client.stores.get('scheduled-tasks');
	}

	private resolveTask(task: ScheduledTasksResolvable): ScheduledTasksResolvablePayload {
		if (typeof task === 'string') {
			return { name: task, payload: undefined };
		}

		if ('payload' in task) {
			return { name: task.name, payload: task.payload };
		}

		return { name: task.name, payload: undefined };
	}
}
