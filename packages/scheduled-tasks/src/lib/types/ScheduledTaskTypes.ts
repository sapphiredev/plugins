import { Queue, type JobState, type QueueOptions } from 'bullmq';
import { ScheduledTaskCustomJobOptions } from '../structures/ScheduledTask';

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
export type BullClient = Queue<ScheduledTaskJob | null>;

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
	| { delay: number; interval?: never; pattern?: never; customJobOptions?: ScheduledTaskCustomJobOptions }
	| { delay?: never; interval: number; pattern?: never; customJobOptions?: ScheduledTaskCustomJobOptions }
	| { delay?: never; interval?: never; pattern: string; customJobOptions?: ScheduledTaskCustomJobOptions }
);

/**
 * Represents a scheduled task that will be repeated at a specified interval.
 */
export interface ScheduledTaskCreateRepeatedTask {
	name: string;
	options: ScheduledTasksTaskOptions;
}

export interface ScheduledTaskJob {}

export interface ScheduledTasks {}
