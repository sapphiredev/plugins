import { Plugin, postInitialization, preLogin, SapphireClient } from '@sapphire/framework';
import type { ClientOptions } from 'discord.js';
import { loadListeners, loadMiddlewares, loadRoutes, Server } from './index';

/**
 * @since 1.0.0
 */
export class Api extends Plugin {
	/**
	 * @since 1.0.0
	 */
	public static [postInitialization](this: SapphireClient, options: ClientOptions): void {
		this.server = new Server(options.api);
		this.stores
			.register(this.server.routes) //
			.register(this.server.middlewares);

		loadListeners();
		loadMiddlewares();
		loadRoutes();
	}

	/**
	 * @since 1.0.0
	 */
	public static async [preLogin](this: SapphireClient): Promise<void> {
		if (!(this.server.options.automaticallyConnect ?? true)) {
			return;
		}

		await this.server.connect();
	}
}

SapphireClient.plugins.registerPostInitializationHook(Api[postInitialization], 'API-PostInitialization');
SapphireClient.plugins.registerPreLoginHook(Api[preLogin], 'API-PreLogin');
