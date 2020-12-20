import { Plugin, postInitialization, SapphireClient } from '@sapphire/framework';
import type { ServerOptions } from 'http';
import { Server } from './structures/http/Server';

export const kRoutePathCacheSymbol = Symbol('pathCache');

/**
 * @since 1.0.0
 */
export class Api extends Plugin {
	/**
	 * @since 1.0.0
	 */
	public static [postInitialization](this: SapphireClient): void {
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
