import type { JobsOptions } from 'bullmq';
import './index';
import './register';

export * from './lib/strategies/ScheduledTaskRedisStrategy';

// @ts-expect-error this will work for end-users but TS doesn't like module augmenting itself
declare module '@sapphire/plugin-scheduled-tasks' {
	interface ScheduledTaskOptions {
		bullJobsOptions?: Omit<JobsOptions, 'repeat'>;
	}
}
