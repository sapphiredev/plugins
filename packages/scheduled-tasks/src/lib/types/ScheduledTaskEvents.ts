import { ScheduledTask } from '../structures/ScheduledTask';

/**
 * Events emitted during the process setting up the scheduler and running a task.
 * You can use these events to trace the progress for debugging purposes.
 */
export const ScheduledTaskEvents = {
	/**
	 * Event that is emitted if a task piece is not found in the store
	 */
	ScheduledTaskNotFound: 'scheduledTaskNotFound' as const,
	/**
	 * Event that is emitted before a task's "run" method is called
	 */
	ScheduledTaskRun: 'scheduledTaskRun' as const,
	/**
	 * Event that is emitted when a task's "run" method throws an error
	 */
	ScheduledTaskError: 'scheduledTaskError' as const,
	/**
	 * Event that is emitted when a tasks's "run" method is successful
	 */
	ScheduledTaskSuccess: 'scheduledTaskSuccess' as const,
	/**
	 * Event that is emitted when a task's "run" method finishes, regardless of whether an error occurred or not
	 */
	ScheduledTaskFinished: 'scheduledTaskFinished' as const,
	/**
	 * Event that is emitted when the scheduler fails to connect to the server (i.e. redis)
	 */
	ScheduledTaskStrategyConnectError: 'scheduledTaskStrategyConnectError' as const,
	/**
	 * Event that is emitted when the scheduled task handler encounters an error.
	 */
	ScheduledTaskStrategyHandlerError: 'scheduledTaskStrategyHandlerError' as const
};

declare module 'discord.js' {
	interface ClientEvents {
		[ScheduledTaskEvents.ScheduledTaskNotFound]: [
			task: string, //
			payload: unknown
		];
		[ScheduledTaskEvents.ScheduledTaskRun]: [
			task: ScheduledTask, //
			payload: unknown
		];
		[ScheduledTaskEvents.ScheduledTaskError]: [
			error: unknown, //
			task: ScheduledTask,
			payload: unknown
		];
		[ScheduledTaskEvents.ScheduledTaskSuccess]: [
			task: ScheduledTask, //
			payload: unknown,
			result: unknown,
			duration: number
		];
		[ScheduledTaskEvents.ScheduledTaskFinished]: [
			task: ScheduledTask, //
			duration: number | null,
			payload: unknown
		];
		[ScheduledTaskEvents.ScheduledTaskStrategyConnectError]: [error: unknown];
		[ScheduledTaskEvents.ScheduledTaskStrategyHandlerError]: [error: unknown];
	}
}
