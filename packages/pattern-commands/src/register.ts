import './index';

import { Plugin, postInitialization, SapphireClient } from '@sapphire/framework';
import type { ClientOptions } from 'discord.js';
import { PatternCommandStore } from './lib/structures/PaternCommandStore';
import { loadListeners } from './listeners/_load';

/**
 * @since 1.0.0
 */
export class PatternCommandPlugin extends Plugin {
	/**
	 * @since 1.0.0
	 */
	public static [postInitialization](this: SapphireClient, _options: ClientOptions): void {
		this.stores.register(new PatternCommandStore());
		loadListeners();
	}
}

SapphireClient.plugins.registerPostInitializationHook(PatternCommandPlugin[postInitialization], 'Pattern-Command-PostInitialization');
