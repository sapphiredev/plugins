import { Plugin, postInitialization, SapphireClient } from '@sapphire/framework';
import type { ClientOptions } from 'discord.js';
import { join } from 'path';
import './index';

/**
 * @since 3.1.2
 */
export class SubcommandsPlugin extends Plugin {
	/**
	 * @since 3.1.2
	 */
	public static [postInitialization](this: SapphireClient, options: ClientOptions): void {
		console.log('registering plugin');
		if (options.loadSubcommandErrorListeners !== false) {
			console.log('loading listeners');
			this.stores.get('listeners').registerPath(join(__dirname, 'listeners'));
		}
	}
}

SapphireClient.plugins.registerPostInitializationHook(SubcommandsPlugin[postInitialization], 'Subcommand-PostInitialization');
