import './index';

import { Plugin, postInitialization, preLogin, SapphireClient } from '@sapphire/framework';
import type { ClientOptions } from 'discord.js';
import { Server } from './lib/structures/http/Server';
import { loadListeners } from './listeners/_load';
import { loadMediaParsers } from './mediaParsers/_load';
import { loadMiddlewares } from './middlewares/_load';
import { loadRoutes } from './routes/_load';

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
			.register(this.server.mediaParsers)
			.register(this.server.middlewares);

		loadListeners();
		loadMediaParsers();
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
