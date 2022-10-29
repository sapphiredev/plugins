export type ScheduledTasksTaskOptions = {
	repeated: boolean;
} & (
	| { delay: number; interval?: never; pattern?: never; customJobOptions?: any }
	| { delay?: never; interval: number; pattern?: never; customJobOptions?: any }
	| { delay?: never; interval?: never; pattern: string; customJobOptions?: any }
);
