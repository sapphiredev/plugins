export type ScheduledTasksTaskOptions = {
	type: 'default' | 'repeated';
} & (
	| { delay: number; interval?: never; cron?: never; bullJobsOptions?: any }
	| { delay?: never; interval: number; cron?: never; bullJobsOptions?: any }
	| { delay?: never; interval?: never; cron: string; bullJobsOptions?: any }
);
