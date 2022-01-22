import type { JobOptions } from 'bull';
import './index';
import './register';

export * from './lib/strategies/ScheduledTaskRedisStrategy';

// @ts-expect-error this will work for end-users but TS doesn't like module augmenting itself
declare module '@sapphire/plugin-scheduled-tasks' {
	interface ScheduledTaskOptions {
		bullJobOptions?: Omit<JobOptions, 'repeat'>;
	}
}
