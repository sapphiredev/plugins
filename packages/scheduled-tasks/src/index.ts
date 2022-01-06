import type { ScheduledTaskHandler } from './lib/ScheduledTaskHandler';
import type { ScheduledTaskStore } from './lib/structures/ScheduledTaskStore';
import type { ScheduledTasksOptions } from './lib/types/ScheduledTasksOptions';

export * from './lib/ScheduledTaskHandler';
export * from './lib/structures/ScheduledTask';
export * from './lib/structures/ScheduledTaskStore';
export * from './lib/types/ScheduledTaskBaseStrategy';
export * from './lib/types/ScheduledTaskCreateRepeatedTask';
export * from './lib/types/ScheduledTaskEvents';
export * from './lib/types/ScheduledTasksOptions';
export * from './lib/types/ScheduledTasksTaskOptions';

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
