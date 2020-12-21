import type { SapphireClient } from '@sapphire/framework';
import { EventEmitter } from 'events';
import { createServer as httpCreateServer, Server as HttpServer } from 'http';
import { ApiRequest } from '../api/ApiRequest';
import { ApiResponse } from '../api/ApiResponse';
import { MiddlewareStore } from '../MiddlewareStore';
import { RouteStore } from '../RouteStore';
import { Auth } from './Auth';

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

	public readonly auth: Auth | null;

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
		this.server = httpCreateServer({
			// eslint-disable-next-line @typescript-eslint/naming-convention
			IncomingMessage: ApiRequest,
			// eslint-disable-next-line @typescript-eslint/naming-convention
			ServerResponse: ApiResponse,
			...(this.client.options.api?.server ?? {})
		});
		this.routes = new RouteStore(client);
		this.middlewares = new MiddlewareStore(client);
		this.auth = Auth.create(client, this.client.options.api?.auth);
		this.server.on('error', this.emit.bind(this, ServerEvents.Error));
		this.server.on('request', this.emit.bind(this, ServerEvents.Request));
	}

	public connect() {
		const { server } = this;
		server.listen({
			port: 4000,
			...(this.client.options.api?.listenOptions ?? {})
		});

		return new Promise<void>((resolve, reject) => {
			function listening() {
				cleanup();
				resolve();
			}

			function error(error: Error) {
				cleanup();
				reject(error);
			}

			function close() {
				cleanup();
				reject(new Error('Closed unexpectedly.'));
			}

			function cleanup() {
				server.off('listening', listening);
				server.off('error', error);
				server.off('close', close);
			}

			server.on('listening', listening);
			server.on('error', error);
			server.on('close', close);
		});
	}

	public disconnect() {
		return new Promise<void>((resolve, reject) => {
			this.server.close((error) => (error ? resolve() : reject(error)));
		});
	}
}
