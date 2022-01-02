export enum ScheduledTaskEvents {
	ScheduledTaskNotFound = 'scheduledTaskNotFound',
	ScheduledTaskShouldntRun = 'scheduledTaskShouldntRun',
	ScheduledTaskRun = 'scheduledTaskRun',
	ScheduledTaskError = 'scheduledTaskError',
	ScheduledTaskSuccess = 'scheduledTaskSuccess',
	ScheduledTaskFinished = 'scheduledTaskFinished',
	ScheduledTaskStrategyConnectError = 'scheduledTaskStrategyConnectError'
}
