import './index';
import './register';

export * from './lib/strategies/ScheduledTaskRedisStrategy';

// @ts-expect-error this will work for end-users but TS doesn't like module augmenting itself
declare module '@sapphire/plugin-scheduled-tasks' {
	interface ScheduledTaskOptions {
		/**
		 * A boolean which, if true, removes the job when it successfully completes.
		 * When a number, it specifies the amount of jobs to keep.
		 * Default behavior is to keep the job in the completed set.
		 */
		removeOnComplete?: boolean | number | undefined;

		/**
		 * A boolean which, if true, removes the job when it fails after all attempts.
		 * When a number, it specifies the amount of jobs to keep.
		 * Default behavior is to keep the job in the failed set.
		 */
		removeOnFail?: boolean | number | undefined;
	}
}
