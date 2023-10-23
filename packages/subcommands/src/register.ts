import { Plugin, postInitialization, SapphireClient } from '@sapphire/framework';
import type { ClientOptions } from 'discord.js';
import { join } from 'node:path';
import './index';

/**
 * @since 3.1.2
 */
export class SubcommandsPlugin extends Plugin {
	/**
	 * @since 3.1.2
	 */
	public static [postInitialization](this: SapphireClient, options: ClientOptions): void {
		if (options.loadSubcommandErrorListeners !== false) {
			this.stores.get('listeners').registerPath(join(__dirname, 'listeners'));
		}
	}
}

SapphireClient.plugins.registerPostInitializationHook(SubcommandsPlugin[postInitialization], 'Subcommand-PostInitialization');
