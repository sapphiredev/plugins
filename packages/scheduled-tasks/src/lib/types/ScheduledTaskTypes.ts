import { Queue, type JobState, type QueueOptions } from 'bullmq';

export interface ScheduledTaskHandlerOptions {
	queue?: string;
	bull?: QueueOptions;
}

export interface ScheduledTaskListRepeatedOptions {
	start?: number;
	end?: number;
	asc?: boolean;
}

export interface ScheduledTaskListOptions extends ScheduledTaskListRepeatedOptions {
	types: JobState[];
}

export type BullClient = Queue<ScheduledTaskJob | null>;

export type ScheduledTaskListRepeatedReturnType = ReturnType<BullClient['getRepeatableJobs']> extends Promise<infer U> ? U : never;

export type ScheduledTasksTaskOptions = {
	repeated: boolean;
} & (
	| { delay: number; interval?: never; pattern?: never; customJobOptions?: any }
	| { delay?: never; interval: number; pattern?: never; customJobOptions?: any }
	| { delay?: never; interval?: never; pattern: string; customJobOptions?: any }
);

export interface ScheduledTaskCreateRepeatedTask {
	name: string;
	options: ScheduledTasksTaskOptions;
}

export interface ScheduledTaskJob {}

export interface ScheduledTasks {}
