import { Piece } from '@sapphire/pieces';
import { isNullish, type Awaitable } from '@sapphire/utilities';
import type { MimeType } from '../utils/MimeType';
import type { ApiRequest } from './api/ApiRequest';
import type { ApiResponse } from './api/ApiResponse';
import type { MethodName } from './http/HttpMethods';
import { RouterRoot } from './router/RouterRoot';

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
	public readonly acceptedContentMimeTypes: readonly MimeType[] | null;

	/**
	 * The path this route represents.
	 */
	public readonly path: readonly string[];

	/**
	 * The methods this route accepts.
	 */
	public readonly methods: ReadonlySet<MethodName>;

	public constructor(context: Route.LoaderContext, options: Options = {} as Options) {
		super(context, options);

		const api = this.container.server.options;
		const path = ([] as string[]).concat(
			RouterRoot.normalize(api.prefix),
			RouterRoot.normalize(options.route ?? (this.location.virtual ? this.name : this.location.directories.concat(this.name).join('/')))
		);

		const methods = new Set(options.methods);
		const implied = RouterRoot.extractMethod(path);
		if (!isNullish(implied)) {
			const lastIndex = path.length - 1;
			path[lastIndex] = path[lastIndex].slice(0, path[lastIndex].length - implied.length - 1);
			methods.add(implied as MethodName);
		}

		this.path = path;
		this.methods = methods;
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
	acceptedContentMimeTypes?: readonly MimeType[] | null;

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
