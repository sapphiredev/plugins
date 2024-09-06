/**
 * ================================================
 * | THIS IS FOR TYPEDOC. DO NOT REMOVE THIS FILE |
 * ================================================
 */

import type { MiddlewareStore, RouteStore } from '../..';
import type { Server, ServerOptions } from './http/Server';

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
		middlewares: MiddlewareStore;
	}
}

declare module '@sapphire/pieces' {
	interface Container {
		server: Server;
	}
}
