export type ScheduledTasksTaskOptions = {
	type: 'default' | 'repeated';
} & (
	| { delay: number; interval?: never; cron?: never; bullJobOptions?: any }
	| { delay?: never; interval: number; cron?: never; bullJobOptions?: any }
	| { delay?: never; interval?: never; cron: string; bullJobOptions?: any }
);
