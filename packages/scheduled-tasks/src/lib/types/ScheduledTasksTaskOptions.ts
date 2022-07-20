export type ScheduledTasksTaskOptions = {
	repeated: boolean;
} & (
	| { delay: number; interval?: never; cron?: never; customJobOptions?: any }
	| { delay?: never; interval: number; cron?: never; customJobOptions?: any }
	| { delay?: never; interval?: never; cron: string; customJobOptions?: any }
);
