import { Plugin, postInitialization, SapphireClient } from '@sapphire/framework';
import type { ClientOptions } from 'discord.js';
import { join } from 'path';
import { PatternCommandStore } from './lib/structures/PaternCommandStore';

/**
 * @since 1.0.0
 */
export class PatternCommandPlugin extends Plugin {
	/**
	 * @since 1.0.0
	 */
	public static [postInitialization](this: SapphireClient, _options: ClientOptions): void {
		this.stores.register(new PatternCommandStore().registerPath(join(__dirname, PatternCommandStore.name)));
		this.stores.get('listeners').registerPath(join(__dirname, 'listeners'));
	}
}

SapphireClient.plugins.registerPostInitializationHook(PatternCommandPlugin[postInitialization], 'Pattern-Command-PostInitialization');
