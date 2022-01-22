export type ScheduledTasksTaskOptions = {
	type: 'default' | 'repeated';
} & (
	| { delay: number; interval?: never; cron?: never; removeOnComplete?: boolean | number | undefined; removeOnFail?: boolean | number | undefined }
	| { delay?: never; interval: number; cron?: never; removeOnComplete?: boolean | number | undefined; removeOnFail?: boolean | number | undefined }
	| { delay?: never; interval?: never; cron: string; removeOnComplete?: boolean | number | undefined; removeOnFail?: boolean | number | undefined }
);
