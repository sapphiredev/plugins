import type { ScheduledTaskHandler } from './lib/ScheduledTaskHandler';
import type { ScheduledTaskStore } from './lib/structures/ScheduledTaskStore';
import type { ScheduledTasksOptions } from './lib/types/ScheduledTasksOptions';

export * from './lib/ScheduledTaskHandler';
export type {
	Client as BullClient,
	ScheduledTaskRedisStrategy,
	ScheduledTaskRedisStrategyJob,
	ScheduledTaskRedisStrategyOptions
} from './lib/strategies/ScheduledTaskRedisStrategy';
export type { Client as SQSClient, ScheduledTaskSQSStrategy, ScheduledTaskSQSStrategyMessageBody } from './lib/strategies/ScheduledTaskSQSStrategy';
export * from './lib/structures/ScheduledTask';
export * from './lib/structures/ScheduledTaskStore';
export * from './lib/types';

declare module '@sapphire/pieces' {
	interface Container {
		tasks: ScheduledTaskHandler;
	}

	interface StoreRegistryEntries {
		'scheduled-tasks': ScheduledTaskStore;
	}
}

declare module 'discord.js' {
	export interface ClientOptions {
		tasks?: ScheduledTasksOptions;
	}
}
