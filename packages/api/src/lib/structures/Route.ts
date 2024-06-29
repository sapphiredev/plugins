import { Piece } from '@sapphire/pieces';
import type { Awaitable } from '@sapphire/utilities';
import { RouteData } from '../utils/RouteData';
import type { ApiRequest } from './api/ApiRequest';
import type { ApiResponse } from './api/ApiResponse';
import type { MethodName } from './http/HttpMethods';
import type { MimeTypeWithoutParameters } from './http/Server';

/**
 * @since 1.0.0
 *
 * @example A simple GET route that returns a JSON response:
 * ```typescript
 * // hello.get.ts
 * import { Route } from '@sapphire/plugin-api';
 *
 * export class MyRoute extends Route {
 *   public run(request: Route.Request, response: Route.Response) {
 *     return response.json({ message: 'Hello, World!' });
 *   }
 * }
 * ```
 *
 * ```bash
 * $ curl http://localhost:4000/hello
 * {"message":"Hello, World!"}
 * ```
 *
 * @example A simple POST route that reads the body and returns it:
 * ```typescript
 * // echo.post.ts
 * import { Route } from '@sapphire/plugin-api';
 *
 * export class MyRoute extends Route {
 *   public run(request: Route.Request, response: Route.Response) {
 *     return response.json(request.params);
 *   }
 * }
 * ```
 *
 * ```bash
 * $ curl -X POST -H "Content-Type: application/json" -d '{"hello":"world"}' http://localhost:4000/echo
 * {"hello":"world"}
 * ```
 */
export abstract class Route<Options extends Route.Options = Route.Options> extends Piece<Options, 'routes'> {
	/**
	 * (RFC 7230 3.3.2) The maximum decimal number of octets.
	 */
	public readonly maximumBodyLength: number;

	/**
	 * The accepted content types.
	 */
	public readonly acceptedContentMimeTypes: readonly MimeTypeWithoutParameters[] | null;

	/**
	 * The route information.
	 */
	public readonly router: RouteData;

	/**
	 * The methods this route accepts.
	 */
	public readonly methods: ReadonlySet<MethodName>;

	public constructor(context: Route.LoaderContext, options: Options = {} as Options) {
		super(context, options);

		const api = this.container.server.options;
		// Concat a `/` to the prefix if it does not end with it
		const prefix = api.prefix ? (api.prefix.endsWith('/') ? api.prefix : `${api.prefix}/`) : '';
		// Use the defined route, otherwise:
		// - If the location is virtual, use the name.
		// - Otherwise, use the directories and the name.
		let path = options.route ?? (this.location.virtual ? this.name : this.location.directories.concat(this.name).join('/'));

		const methods = new Set(options.methods);
		// If the path contains a method (e.g. `/users.get`), extract it and add it to the methods set:
		const methodIndex = path.lastIndexOf('.');
		if (methodIndex !== -1) {
			// Extract the method from the path:
			const method = path.slice(methodIndex + 1).toUpperCase() as MethodName;
			if (!methods.has(method)) methods.add(method);

			// Update the path to remove the method:
			path = path.slice(0, methodIndex);
		}

		this.methods = methods;
		this.router = new RouteData(`${prefix}${path}`);
		this.maximumBodyLength = options.maximumBodyLength ?? api.maximumBodyLength ?? 1024 * 1024 * 50;
		this.acceptedContentMimeTypes = options.acceptedContentMimeTypes ?? api.acceptedContentMimeTypes ?? null;
	}

	public abstract run(request: Route.Request, response: Route.Response): Awaitable<unknown>;
}

export interface RouteOptions extends Piece.Options {
	/**
	 * The route the piece should represent.
	 * @since 1.0.0
	 *
	 * @defaultValue The filesystem-based path, or the name if the location is virtual.
	 *
	 * @example
	 * ```typescript
	 * '/users'
	 * // request.params -> {}
	 * ```
	 * @example
	 * ```typescript
	 * '/guilds/[guild]/members/[member]'
	 * // request.params -> { guild: '...', member: '...' }
	 * ```
	 */
	route?: string;

	/**
	 * (RFC 7230 3.3.2) The maximum decimal number of octets.
	 * @since 1.0.0
	 *
	 * @defaultValue this.context.server.options.maximumBodyLength ?? 1024 * 1024 * 50
	 */
	maximumBodyLength?: number;

	/**
	 * The accepted content types for this route. If set to null, the route will accept any data.
	 * @since 1.3.0
	 *
	 * @defaultValue this.context.server.options.acceptedContentMimeTypes ?? null
	 */
	acceptedContentMimeTypes?: readonly MimeTypeWithoutParameters[] | null;

	/**
	 * The methods this route accepts.
	 * @since 7.0.0
	 *
	 * @defaultValue The method defined in the piece name, or none if not set.
	 */
	methods?: readonly MethodName[];
}

export namespace Route {
	/** @deprecated Use {@linkcode LoaderContext} instead. */
	export type Context = LoaderContext;
	export type LoaderContext = Piece.LoaderContext<'routes'>;
	export type Options = RouteOptions;
	export type JSON = Piece.JSON;
	export type LocationJSON = Piece.LocationJSON;

	export type Request = ApiRequest;
	export type Response = ApiResponse;
}
