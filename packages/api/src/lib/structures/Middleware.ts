import { Piece } from '@sapphire/pieces';
import type { Awaitable } from '@sapphire/utilities';
import type { ApiRequest } from './api/ApiRequest';
import type { ApiResponse } from './api/ApiResponse';

/**
 * @since 1.0.0
 */
export abstract class Middleware<Options extends Middleware.Options = Middleware.Options> extends Piece<Options, 'middlewares'> {
	/**
	 * The position the middleware has. The {@link MiddlewareStore} will run all middlewares with lower position than
	 * this one.
	 *
	 * The built-in middlewares follow the following positions:
	 * - headers: 10
	 * - body: 20
	 * - cookies: 30
	 * - auth: 40
	 */
	public readonly position: number;

	public constructor(context: Middleware.LoaderContext, options: Options = {} as Options) {
		super(context, options);
		this.position = options.position ?? 1000;
	}

	/**
	 * The method to be overridden by other middlewares.
	 * @param request The client's request.
	 * @param response The server's response.
	 * @param route The route that matched this request, will be `null` if none matched.
	 */
	public abstract run(request: Middleware.Request, response: Middleware.Response): Awaitable<unknown>;
}

/**
 * The options for all middlewares.
 */
export interface MiddlewareOptions extends Piece.Options {
	/**
	 * The position to insert the middleware at.
	 * @see Middleware#position
	 * @default 1000
	 */
	position?: number;
}

export namespace Middleware {
	/** @deprecated Use {@linkcode LoaderContext} instead. */
	export type Context = LoaderContext;
	export type LoaderContext = Piece.LoaderContext<'middlewares'>;
	export type Options = MiddlewareOptions;
	export type JSON = Piece.JSON;
	export type LocationJSON = Piece.LocationJSON;

	export type Request = ApiRequest;
	export type Response = ApiResponse;
}
