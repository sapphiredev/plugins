/**
 * ================================================
 * | THIS IS FOR TYPEDOC. DO NOT REMOVE THIS FILE |
 * ===============================================
 */

import type { Server, ServerOptions } from './http/Server';

declare module 'discord.js' {
	export interface Client {
		server: Server;
	}

	export interface ClientOptions {
		api?: ServerOptions;
	}
}
