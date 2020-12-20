import type { SapphireClient } from '@sapphire/framework';
import { EventEmitter } from 'events';
import { createServer as httpCreateServer, Server as HttpServer } from 'http';
import { MiddlewareStore } from '../MiddlewareStore';
import { RouteStore } from '../RouteStore';

export const enum ServerEvents {
	Error = 'error',
	Request = 'request',
	Match = 'match',
	NoMatch = 'noMatch',
	MiddlewareFailure = 'middlewareFailure',
	MiddlewareError = 'middlewareError',
	MiddlewareSuccess = 'middlewareSuccess'
}

/**
 * @since 1.0.0
 */
export class Server extends EventEmitter {
	public readonly routes: RouteStore;

	public readonly middlewares: MiddlewareStore;

	/**
	 * The http.Server instance that manages the recieved HTTP requests.
	 * @since 1.0.0
	 */
	public readonly server: HttpServer;

	/**
	 * The managing Client instance on which this Server instance is mounted.
	 * @since 1.0.0
	 */
	private readonly client: SapphireClient;

	/**
	 * @since 1.0.0
	 * @param client The @sapphire/framework Client instance
	 */
	public constructor(client: SapphireClient) {
		super();

		this.client = client;
		this.server = httpCreateServer(this.client.options.api.server!);
		this.routes = new RouteStore(client);
		this.middlewares = new MiddlewareStore(client);
		this.server.on('error', this.emit.bind(this, ServerEvents.Error));
		this.server.on('request', this.emit.bind(this, ServerEvents.Request));
	}
}
