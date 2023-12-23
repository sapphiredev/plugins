import { Queue, type JobState, type QueueOptions } from 'bullmq';
import type { ScheduledTaskCustomJobOptions } from '../structures/ScheduledTask';

/**
 * Options for a scheduled task handler.
 */
export interface ScheduledTaskHandlerOptions {
	queue?: string;
	bull?: QueueOptions;
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
	name: string;
	options: ScheduledTasksTaskOptions;
}

/**
 * The registered tasks and their payload types. When registering new ones, it is recommended to use
 * [module augmentation](https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation) so
 * custom ones are registered.
 *
 * If a key's value is `never`, that means that there is no payload associated with that task.
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
 *   }
 * }
 * ```
 */
export interface ScheduledTasks {}

/**
 * The keys of {@link ScheduledTasks}.
 */
export type ScheduledTasksKeys = keyof ScheduledTasks extends never ? string : keyof ScheduledTasks;

/**
 * The inferred payload type for a given key of {@link ScheduledTasks}.
 *
 * @remarks If the key is not in {@link ScheduledTasks}, the payload type will be `unknown`.
 */
export type ScheduledTasksPayload<K extends ScheduledTasksKeys | string = ''> = K extends keyof ScheduledTasks
	? ScheduledTasks[K] extends never // A value of `never` means it should not be enforced.
		? unknown
		: ScheduledTasks[K]
	: unknown; // If the key is not in `ScheduledTasks` we return `unknown`.
