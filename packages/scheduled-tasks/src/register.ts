import './index';

import { container, Plugin, postInitialization, postLogin, preGenericsInitialization, SapphireClient } from '@sapphire/framework';
import type { ClientOptions } from 'discord.js';
import { loadListeners, ScheduledTaskHandler, ScheduledTaskStore } from './index';

/**
 * A plugin for scheduling tasks in a SapphireClient.
 * @since 1.0.0
 */
export class ScheduledTasksPlugin extends Plugin {
	public service: string | undefined;
	/**
	 * @since 1.0.0
	 */
	public static override [preGenericsInitialization](this: SapphireClient, options: ClientOptions): void {
		container.tasks = new ScheduledTaskHandler(options.tasks);
	}

	/**
	 * @since 1.0.0
	 */
	public static override [postInitialization](this: SapphireClient, options: ClientOptions): void {
		this.stores.register(new ScheduledTaskStore());

		if (options.loadScheduledTaskErrorListeners !== false) {
			loadListeners();
		}
	}

	/**
	 * @since 1.0.0
	 */
	public static override [postLogin](this: SapphireClient): void {
		void container.tasks.createRepeated();
	}
}

SapphireClient.plugins.registerPreGenericsInitializationHook(
	ScheduledTasksPlugin[preGenericsInitialization],
	'Scheduled-Task-PreGenericsInitialization'
);

SapphireClient.plugins.registerPostInitializationHook(ScheduledTasksPlugin[postInitialization], 'Scheduled-Task-PostInitialization');

SapphireClient.plugins.registerPostLoginHook(ScheduledTasksPlugin[postLogin], 'Scheduled-Task-PostLogin');
