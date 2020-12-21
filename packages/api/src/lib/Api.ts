import { Plugin, postInitialization, preLogin, SapphireClient } from '@sapphire/framework';
import type { ServerOptions } from 'http';
import type { ListenOptions } from 'net';
import { join } from 'path';
import { Server } from './structures/http/Server';

/**
 * @since 1.0.0
 */
export class Api extends Plugin {
	/**
	 * @since 1.0.0
	 */
	public static [postInitialization](this: SapphireClient): void {
		this.server = new Server(this);
		this.registerStore(this.server.routes) //
			.registerStore(this.server.middlewares);

		this.events.registerPath(join(__dirname, '..', 'events'));
		this.server.middlewares.registerPath(join(__dirname, '..', 'middlewares'));
	}

	/**
	 * @since 1.0.0
	 */
	public static async [preLogin](this: SapphireClient): Promise<void> {
		await this.server.connect();
	}
}

/**
 * @since 1.0.0
 */
export interface ApiOptions {
	/**
	 * @since 1.0.0
	 * @default 'SAPPHIRE_AUTH'
	 */
	authCookieName?: string;

	/**
	 * @since 1.0.0
	 */
	clientSecret?: string;

	/**
	 * @since 1.0.0
	 * @default ''
	 */
	prefix?: string;

	/**
	 * @since 1.0.0
	 * @default '*'
	 */
	origin?: string;

	/**
	 * @since 1.0.0
	 * @default []
	 */
	extraHeaders?: [string, string][];

	/**
	 * @since 1.0.0
	 * @default 1024 * 1024 * 50
	 */
	maximumBodyLength?: number;

	/**
	 * @since 1.0.0
	 * @default {}
	 */
	server?: ServerOptions;

	/**
	 * @since 1.0.0
	 * @default { port: 4000 }
	 */
	listenOptions?: ListenOptions;
}

declare module 'discord.js' {
	export interface Client {
		server: Server;
	}

	export interface ClientOptions {
		api?: ApiOptions;
	}
}
