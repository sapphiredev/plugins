import { Plugin, postInitialization, preLogin, SapphireClient } from '@sapphire/framework';
import type { ClientOptions } from 'discord.js';
import { join } from 'path';
import { Server, ServerOptions } from './lib/structures/http/Server';
import type { MediaParserStore } from './lib/structures/MediaParserStore';
import type { MiddlewareStore } from './lib/structures/MiddlewareStore';
import type { RouteStore } from './lib/structures/RouteStore';

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

		this.stores.get('events').registerPath(join(__dirname, 'events'));
		this.server.routes.registerPath(join(__dirname, 'routes'));
		this.server.middlewares.registerPath(join(__dirname, 'middlewares'));
		this.server.mediaParsers.registerPath(join(__dirname, 'mediaParsers'));
	}

	/**
	 * @since 1.0.0
	 */
	public static async [preLogin](this: SapphireClient): Promise<void> {
		await this.server.connect();
	}
}

declare module 'discord.js' {
	export interface Client {
		server: Server;
	}

	export interface ClientOptions {
		api?: ServerOptions;
	}
}

declare module '@sapphire/framework' {
	interface StoreRegistryEntries {
		routes: RouteStore;
		mediaParsers: MediaParserStore;
		middlewares: MiddlewareStore;
	}
}

SapphireClient.plugins.registerPostInitializationHook(Api[postInitialization], 'API-PostInitialization');
SapphireClient.plugins.registerPreLoginHook(Api[preLogin], 'API-PreLogin');
