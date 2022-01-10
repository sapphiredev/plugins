/**
 * Events emitted during the process setting up the scheduler and running a task.
 * You can use these events to trace the progress for debugging purposes.
 */
export enum ScheduledTaskEvents {
	/** Event that is emitted if a task piece is not found in the store
	 * @param task The name of the task what tried to run
	 * @param payload The payload of the task
	 */
	ScheduledTaskNotFound = 'scheduledTaskNotFound',
	/** Event that is emitted before a task's "run" method is called
	 * @param task The name of the task what tried to run
	 * @param payload The payload of the task
	 */
	ScheduledTaskRun = 'scheduledTaskRun',
	/** Event that is emitted when a task's "run" method throws an error
	 * @param error The error what occured during the run
	 * @param task The name of the task what tried to run
	 * @param duration The duration what indicates how long running the task took
	 * @param payload The payload of the task
	 */
	ScheduledTaskError = 'scheduledTaskError',
	/** Event that is emitted when a tasks's "run" method is successful
	 * @param task The name of the task what tried to run
	 * @param payload The payload of the task
	 * @param result The result of the run
	 */
	ScheduledTaskSuccess = 'scheduledTaskSuccess',
	/** Event that is emitted when a task's "run" method finishes, regardless of whether an error occurred or not 
	 * @param task The name of the task what tried to run
	 * @param duration The duration what indicates how long running the task took
	 * @param payload The payload of the task
	 */
	ScheduledTaskFinished = 'scheduledTaskFinished',
	/** Event that is emitted when the scheduler fails to connect to the server (i.e. redis or sqs)
	 * @param error The error occured the connection
	 */
	ScheduledTaskStrategyConnectError = 'scheduledTaskStrategyConnectError'
}
