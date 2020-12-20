import { Plugin, postInitialization, SapphireClient } from '@sapphire/framework';
import type { ClientOptions } from 'discord.js';
import type { ServerOptions } from 'https';
import { Server } from './structures/http/Server';

export const kRoutePathCacheSymbol = Symbol('pathCache');

/**
 * @since 1.0.0
 */
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class Api implements Plugin {
	/**
	 * @since 1.0.0
	 */
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	public static [postInitialization](this: SapphireClient, _options?: ClientOptions): void {
		this.server = new Server(this);
	}
}

/**
 * @since 1.0.0
 */
export interface ApiOptions {
	/**
	 * @since 1.0.0
	 */
	prefix: string;

	/**
	 * @since 1.0.0
	 */
	server: ServerOptions;
}

declare module 'discord.js' {
	export interface Client {
		server: Server;
	}

	export interface ClientOptions {
		api: ApiOptions;
	}
}
