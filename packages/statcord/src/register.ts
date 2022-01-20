import { Plugin, container, postInitialization, postLogin, preGenericsInitialization, SapphireClient } from '@sapphire/framework';
import { join } from 'path';

import { Statcord } from './index';

/**
 * Plugin allowing Out of the box Statcord integration with @sapphire/framework.
 * @since 1.0.0
 */
export class StatcordPlugin extends Plugin {
	public static [preGenericsInitialization](this: SapphireClient): void {
		container.statcord = new Statcord(this.options.statcord);
	}

	public static [postInitialization](this: SapphireClient): void {
		this.stores.get('listeners').registerPath(join(__dirname, 'listeners'));
	}

	public static [postLogin](this: SapphireClient): void {
		if ((this.options.statcord?.autopost ?? true) && this.options.statcord?.key) {
			container.logger.info('[Statcord-Plugin]: Auto-posting of statistics has been activated.');
			setTimeout(async () => container.statcord.postStats(), 1_000);
		}

		if (this.shard && this.options?.statcord?.sharding && this.options.statcord?.key) {
			container.logger.info('[Statcord-Plugin]: Sharding mode activated.');
		}
	}
}

SapphireClient.plugins.registerPostLoginHook(StatcordPlugin[preGenericsInitialization], 'Statcord-PreGenericsInitialization');
SapphireClient.plugins.registerPostLoginHook(StatcordPlugin[postInitialization], 'Statcord-PostInitialization');
SapphireClient.plugins.registerPostLoginHook(StatcordPlugin[postLogin], 'Statcord-PostLogin');

declare module '@sapphire/pieces' {
	interface Container {
		statcord: Statcord;
	}
}
