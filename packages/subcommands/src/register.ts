import { Plugin, postInitialization, SapphireClient } from '@sapphire/framework';
import type { ClientOptions } from 'discord.js';
import { loadListeners, loadPreconditions } from './index';

/**
 * @since 3.1.2
 */
export class SubcommandsPlugin extends Plugin {
	/**
	 * @since 3.1.2
	 */
	public static [postInitialization](this: SapphireClient, options: ClientOptions): void {
		loadPreconditions();

		if (options.loadSubcommandErrorListeners !== false) {
			loadListeners();
		}
	}
}

SapphireClient.plugins.registerPostInitializationHook(SubcommandsPlugin[postInitialization], 'Subcommand-PostInitialization');
