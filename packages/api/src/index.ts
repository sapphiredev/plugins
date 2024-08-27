import type { Server, ServerOptions } from './lib/structures/http/Server';
import type { MiddlewareStore } from './lib/structures/MiddlewareStore';
import type { RouteStore } from './lib/structures/RouteStore';

export * from './lib/structures/api/ApiRequest';
export * from './lib/structures/api/ApiResponse';
export * from './lib/structures/api/CookieStore';
export * from './lib/structures/http/Auth';
export * from './lib/structures/http/HttpCodes';
export * from './lib/structures/http/HttpMethods';
export * from './lib/structures/http/Server';
export * from './lib/structures/Middleware';
export * from './lib/structures/MiddlewareStore';
export * from './lib/structures/Route';
export * from './lib/structures/router/RouterBranch';
export * from './lib/structures/router/RouterNode';
export * from './lib/structures/router/RouterRoot';
export * from './lib/structures/RouteStore';
export type * from './lib/utils/MimeType';

export { loadListeners } from './listeners/_load';
export { loadMiddlewares } from './middlewares/_load';
export { loadRoutes } from './routes/_load';

declare module 'discord.js' {
	interface Client {
		server: Server;
	}

	interface ClientOptions {
		api?: ServerOptions;
	}
}

declare module '@sapphire/pieces' {
	interface StoreRegistryEntries {
		routes: RouteStore;
		middlewares: MiddlewareStore;
	}

	interface Container {
		server: Server;
	}
}

/**
 * The [@sapphire/plugin-api](https://github.com/sapphiredev/plugins/blob/main/packages/api) version that you are currently using.
 * An example use of this is showing it of in a bot information command.
 *
 * Note to Sapphire developers: This needs to explicitly be `string` so it is not typed as the string that gets replaced by esbuild
 */
// eslint-disable-next-line @typescript-eslint/no-inferrable-types
export const version: string = '[VI]{{inject}}[/VI]';
