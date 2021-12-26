export type ScheduledTasksTaskOptions = {
	type: 'default' | 'repeated';
} & (
	| { delay: number; interval?: never; cron?: never }
	| { delay?: never; interval: number; cron?: never }
	| { delay?: never; interval?: never; cron: string }
);
