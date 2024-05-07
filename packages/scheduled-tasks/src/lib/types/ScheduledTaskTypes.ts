import { Queue, type JobState, type QueueOptions, type Job } from 'bullmq';
import type { ScheduledTaskCustomJobOptions } from '../structures/ScheduledTask';

/**
 * Options for a scheduled task handler.
 */
export interface ScheduledTaskHandlerOptions {
	queue?: string;
	bull: QueueOptions;
}

/**
 * Options for listing repeated scheduled tasks.
 */
export interface ScheduledTaskListRepeatedOptions {
	start?: number;
	end?: number;
	asc?: boolean;
}

/**
 * Options for listing scheduled tasks.
 */
export interface ScheduledTaskListOptions extends ScheduledTaskListRepeatedOptions {
	types: JobState[];
}

/**
 * A Bull queue client that can be used to schedule and manage scheduled tasks.
 */
export type BullClient = Queue<unknown>;

/**
 * The return type of the `getRepeatableJobs` method of a Bull client.
 * If the return type of `getRepeatableJobs` is a Promise, this type extracts the resolved type.
 */
export type ScheduledTaskListRepeatedReturnType = ReturnType<BullClient['getRepeatableJobs']> extends Promise<infer U> ? U : never;

/**
 * Options for a scheduled task.
 */
export type ScheduledTasksTaskOptions = {
	repeated: boolean;
} & (
	| { delay: number; interval?: never; pattern?: never; timezone?: never; customJobOptions?: ScheduledTaskCustomJobOptions }
	| { delay?: never; interval: number; pattern?: never; timezone?: never; customJobOptions?: ScheduledTaskCustomJobOptions }
	| { delay?: never; interval?: never; pattern: string; timezone: string; customJobOptions?: ScheduledTaskCustomJobOptions }
);

/**
 * Represents a scheduled task that will be repeated at a specified interval.
 */
export interface ScheduledTaskCreateRepeatedTask {
	name: ScheduledTasksKeysNoPayload;
	options: ScheduledTasksTaskOptions;
}

/**
 * The registered tasks and their payload types. When registering new ones, it is recommended to use
 * [module augmentation](https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation) so
 * custom ones are registered.
 *
 * @remarks
 * - If the type is `never` or `undefined`, that means that there is no payload associated with that task.
 * - If the type is a union that contains `undefined`, then the payload will be optional.
 *
 * @example
 * ```typescript
 * declare module '@sapphire/plugin-scheduled-tasks' {
 *   interface ScheduledTasks {
 *     // A task named `Mute` which requires no payload:
 *     Mute: never;
 *
 *     // A task named `Unmute` which requires a payload with a `userId` property:
 *     Unmute: {
 *       userId: string;
 *     };
 *
 *     // A task named `Ban` which has a payload with an optional `moderatorId` property:
 *     LogAction: {
 *       moderatorId?: string;
 *     };
 *   }
 * }
 * ```
 */
export interface ScheduledTasks {}

/**
 * The keys of {@link ScheduledTasks}.
 */
export type ScheduledTasksKeys = keyof ScheduledTasks;

/**
 * The keys of {@link ScheduledTasks} with an optional or no payload.
 */
export type ScheduledTasksKeysNoPayload = {
	[K in ScheduledTasksKeys]: ScheduledTasks[K] extends never //
		? K
		: undefined extends ScheduledTasks[K] // Check if the type is a union that contains `undefined`
			? K
			: never;
}[ScheduledTasksKeys];

/**
 * The payload type of a {@link ScheduledTasks} entry.
 */
export type ScheduledTasksPayload<
	K extends ScheduledTasksKeys = ScheduledTasksKeys //
> = ScheduledTasksKeys extends never // Need to check `never` due to empty interfaces
	? undefined
	: ScheduledTasks[K] extends never // If the value is `never`, then there is no payload
		? undefined
		: ScheduledTasks[K];

/**
 * An entry in {@link ScheduledTasks} that has no payload.
 */
export interface ScheduledTasksResolvableNoPayload<
	K extends ScheduledTasksKeysNoPayload = ScheduledTasksKeysNoPayload //
> {
	name: K;
}

/**
 * An entry in {@link ScheduledTasks} with it's associated payload.
 */
export interface ScheduledTasksResolvablePayload<
	K extends ScheduledTasksKeys = ScheduledTasksKeys //
> {
	name: K;
	payload: ScheduledTasksPayload<K>;
}

export type ScheduledTasksResolvable =
	| ScheduledTasksKeysNoPayload //
	| ScheduledTasksResolvableNoPayload
	| ScheduledTasksResolvablePayload;

export type ScheduledTasksJob<T> =
	T extends ScheduledTasksResolvableNoPayload<infer R>
		? Job<ScheduledTasksPayload<R>>
		: T extends ScheduledTasksResolvablePayload<infer R>
			? Job<ScheduledTasksPayload<R>>
			: Job<undefined>;
