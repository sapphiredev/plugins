import type { ScheduledTaskHandler } from './lib/ScheduledTaskHandler';
import type { ScheduledTaskStore } from './lib/structures/ScheduledTaskStore';
import type { ScheduledTaskHandlerOptions } from './lib/types/ScheduledTaskTypes';

export * from './lib/ScheduledTaskHandler';
export * from './lib/structures/ScheduledTask';
export * from './lib/structures/ScheduledTaskStore';
export * from './lib/types/ScheduledTaskEvents';
export * from './lib/types/ScheduledTaskTypes';

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
		tasks?: ScheduledTaskHandlerOptions;
		/**
		 * If the the pre-included scheduled task error listeners should be loaded
		 * @default false
		 */
		loadScheduledTaskErrorListeners?: boolean;
	}
}

/**
 * The [@sapphire/plugin-scheduled-tasks](https://github.com/sapphiredev/plugins/blob/main/packages/scheduled-tasks) version that you are currently using.
 * An example use of this is showing it of in a bot information command.
 *
 * Note to Sapphire developers: This needs to explicitly be `string` so it is not typed as the string that gets replaced by esbuild
 */
// eslint-disable-next-line @typescript-eslint/no-inferrable-types
export const version: string = '[VI]{{inject}}[/VI]';
