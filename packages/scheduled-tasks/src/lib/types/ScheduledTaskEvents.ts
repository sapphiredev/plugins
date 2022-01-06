/**
 * Events emitted during the process setting up the scheduler and running a task.
 * You can use these events to trace the progress for debugging purposes.
 */
export enum ScheduledTaskEvents {
	/** Event that is emitted if a task piece is not found in the store */
	ScheduledTaskNotFound = 'scheduledTaskNotFound',
	/** Event that is emitted before a task's "run" method is called */
	ScheduledTaskRun = 'scheduledTaskRun',
	/** Event that is emitted when a task's "run" method throws an error */
	ScheduledTaskError = 'scheduledTaskError',
	/** Event that is emitted when a tasks's "run" method is successful */
	ScheduledTaskSuccess = 'scheduledTaskSuccess',
	/** Event that is emitted when a task's "run" method finishes, regardless of whether an error occurred or not */
	ScheduledTaskFinished = 'scheduledTaskFinished',
	/** Event that is emitted when the scheduler fails to connect to the server (i.e. redis or sqs) */
	ScheduledTaskStrategyConnectError = 'scheduledTaskStrategyConnectError'
}
