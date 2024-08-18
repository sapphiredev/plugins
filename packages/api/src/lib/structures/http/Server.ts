import { container } from '@sapphire/pieces';
import { AsyncEventEmitter } from '@vladfrangu/async_event_emitter';
import { Server as HttpServer, createServer as httpCreateServer, type ServerOptions as HttpOptions } from 'node:http';
import type { ListenOptions } from 'node:net';
import type { MimeType } from '../../utils/MimeType';
import { MediaParserStore } from '../MediaParserStore';
import { MiddlewareStore } from '../MiddlewareStore';
import type { Route } from '../Route';
import { RouteStore } from '../RouteStore';
import { ApiRequest } from '../api/ApiRequest';
import { ApiResponse } from '../api/ApiResponse';
import type { RouterBranch } from '../router/RouterBranch';
import { Auth, type ServerOptionsAuth } from './Auth';

export enum ServerEvent {
	Error = 'error',
	Request = 'request',
	RouterBranchNotFound = 'routerBranchNotFound',
	RouterBranchMethodNotAllowed = 'routerBranchMethodNotAllowed',
	RouterFound = 'routerFound',
	RouteError = 'routeError',
	MiddlewareFailure = 'middlewareFailure',
	MiddlewareError = 'middlewareError',
	MiddlewareSuccess = 'middlewareSuccess'
}

export interface ServerEvents {
	[ServerEvent.Error]: [error: Error, request: ApiRequest, response: ApiResponse];
	[ServerEvent.Request]: [request: ApiRequest, response: ApiResponse];
	[ServerEvent.RouterBranchNotFound]: [request: ApiRequest, response: ApiResponse];
	[ServerEvent.RouterBranchMethodNotAllowed]: [request: ApiRequest, response: ApiResponse, node: RouterBranch];
	[ServerEvent.RouterFound]: [request: ApiRequest, response: ApiResponse];
	[ServerEvent.RouteError]: [error: Error, request: ApiRequest, response: ApiResponse];
	[ServerEvent.MiddlewareFailure]: [request: ApiRequest, response: ApiResponse];
	[ServerEvent.MiddlewareSuccess]: [request: Route.Request, response: Route.Response, route: Route];
	[ServerEvent.MiddlewareError]: [error: Error, request: ApiRequest, response: ApiResponse];
}

/**
 * @since 1.0.0
 */
export class Server extends AsyncEventEmitter<ServerEvents> {
	/**
	 * The routes this server holds.
	 * @since 1.0.0
	 */
	public readonly routes: RouteStore;

	/**
	 * The middlewares this server holds.
	 * @since 1.0.0
	 */
	public readonly middlewares: MiddlewareStore;

	/**
	 * The media parsers this server holds.
	 * @since 1.3.0
	 */
	public readonly mediaParsers: MediaParserStore;

	/**
	 * The authentication system.
	 * @since 1.0.0
	 */
	public readonly auth: Auth | null;

	/**
	 * The http.Server instance that manages the recieved HTTP requests.
	 * @since 1.0.0
	 */
	public readonly server: HttpServer;

	/**
	 * The options for this server.
	 * @since 1.0.0
	 */
	public readonly options: AuthLessServerOptions;

	/**
	 * @since 1.0.0
	 * @param options The options for this server
	 */
	public constructor({ auth, ...options }: ServerOptions = {}) {
		super();

		container.server = this;

		this.options = options;
		this.server = httpCreateServer({
			IncomingMessage: ApiRequest,
			ServerResponse: ApiResponse,
			...(options.server ?? {})
		});
		this.routes = new RouteStore();
		this.middlewares = new MiddlewareStore();
		this.mediaParsers = new MediaParserStore();
		this.auth = Auth.create(auth);
		this.server.on('error', this.emit.bind(this, ServerEvent.Error));
		this.server.on('request', this.emit.bind(this, ServerEvent.Request));
	}

	public connect() {
		const { server } = this;
		server.listen({
			port: 4000,
			...(this.options.listenOptions ?? {})
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

/**
 * RFC 1341 4: Defines a Content-Type's type, which follows the following structure:
 *
 * - `type` = `text` | `multipart` | `message` | `image` | `audio` | `video` | `application` | x-token
 * - `x-token` = The two characters "X-" followed, with no intervening white space, by any token
 * @since 1.3.0
 */
export type ContentTypeType = 'text' | 'multipart' | 'message' | 'image' | 'audio' | 'video' | 'application' | `X-${string}`;

/**
 * RFC 1341 4: Defines a Content-Type's parameter, which follows the following structure:
 *
 * - `parameter` = `attribute` "=" `value`
 * - `attribute` = `token`
 * - `value` = `token` / `quoted-string`
 * - `token` = `1*<any CHAR except "SPACE", "CTLs", or "tspecials">`
 * - `tspecials` = `(` | `)` | `<` | `>` | `@` | `,` | `;` | `:` | `\` | `"` | `/` | `[` | `]` | `?` | `.` | `=`
 *
 * @note `tspecials` must be in quoted-string, to use within parameter values.
 * @note The definition of `tspecials` is the same as the RFC 822 definition of `specials` with the addition of the
 * three characters `/`, `?`, and `=`.
 * @since 1.3.0
 */
export type ContentTypeParameter = `; ${string}=${string}`;

/**
 * RFC 1341 4: Defines the syntax for a Content-Type field without parameters, which follows the following structure:
 * `type "/" subtype`.
 * @since 7.0.0
 */
export type GenericMimeType = `${ContentTypeType}/${string}`;

/**
 * RFC 1341 4: Defines the syntax for a Content-Type field, which follows the following structure:
 * `type "/" subtype *[";" parameter]`.
 * @since 7.0.0
 */
export type GenericParametrizedMimeType = `${GenericMimeType}${'' | ContentTypeParameter}`;

/**
 * The API options.
 * @since 1.0.0
 */
export interface ServerOptions {
	/**
	 * The prefix for all routes, e.g. `v1/`.
	 * @since 1.0.0
	 * @default ''
	 */
	prefix?: string;

	/**
	 * The origin header to be set on every request at 'Access-Control-Allow-Origin'.
	 * @since 1.0.0
	 * @default '*'
	 */
	origin?: string;

	/**
	 * (RFC 7230 3.3.2) The maximum decimal number of octets.
	 * @since 1.0.0
	 * @default 1024 * 1024 * 50
	 */
	maximumBodyLength?: number;

	/**
	 * The accepted content types for this route. If set to null, the route will accept any data.
	 * @since 1.3.0
	 * @default null
	 */
	acceptedContentMimeTypes?: MimeType[] | null;

	/**
	 * The HTTP server options.
	 * @since 1.0.0
	 * @default {}
	 */
	server?: HttpOptions;

	/**
	 * The HTTP listen options.
	 * @since 1.0.0
	 * @default { port: 4000 }
	 */
	listenOptions?: ListenOptions;

	/**
	 * The auth options. If neither `auth` nor `auth.secret` are defined, auth-related routes and middlewares will be
	 * automatically disabled.
	 * @since 1.0.0
	 * @default {}
	 */
	auth?: ServerOptionsAuth;

	/**
	 * Whether the server should connect upon being when the plugin is loaded.
	 * @since 3.2.0
	 * @default true
	 */
	automaticallyConnect?: boolean;
}

/**
 * The {@link ServerOptions} without {@link ServerOptions.auth}.
 * @since 1.0.0
 */
export type AuthLessServerOptions = Omit<ServerOptions, 'auth'>;
