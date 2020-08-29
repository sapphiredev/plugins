import { kRoutePathCacheSymbol } from '../Api';
import { Methods } from '../structures/http/HttpMethods';

/**
 * @since 1.0.0
 * @private
 * @param httpMethod The standard Http method for the specified route.
 * @param route The route on which this method should answer.
 */
export function createHttpMethodDecorator(httpMethod: Methods, _route?: string) {
	return (target: Record<PropertyKey, unknown>, method: string) => {
		const ctor = target.constructor;
		const previous: RouteCacheDefinition[] | undefined = Reflect.get(ctor, kRoutePathCacheSymbol);
		const route = _route ?? method.toString();

		if (previous) {
			previous.push({ method, route, httpMethod });
		} else {
			Reflect.defineProperty(ctor, kRoutePathCacheSymbol, {
				value: [{ method, route, httpMethod }],
				configurable: false,
				enumerable: false,
				writable: false
			});
		}
	};
}

/**
 * @since 1.0.0
 */
export interface RouteCacheDefinition {
	/**
	 * @since 1.0.0
	 */
	method: string;

	/**
	 * @since 1.0.0
	 */
	route: string;

	/**
	 * @since 1.0.0
	 */
	httpMethod: Methods;
}

// From this point onward we don't want naming convention to be enforced
/* eslint-disable @typescript-eslint/naming-convention */

/**
 * @since 1.0.0
 * @param route The route on which this method should answer.
 */
export const HttpGet = (route?: string) => createHttpMethodDecorator(Methods.GET, route);

/**
 * @since 1.0.0
 * @param route The route on which this method should answer.
 */
export const HttpHead = (route?: string) => createHttpMethodDecorator(Methods.HEAD, route);

/**
 * @since 1.0.0
 * @param route The route on which this method should answer.
 */
export const HttpPost = (route?: string) => createHttpMethodDecorator(Methods.POST, route);

/**
 * @since 1.0.0
 * @param route The route on which this method should answer.
 */
export const HttpPut = (route?: string) => createHttpMethodDecorator(Methods.PUT, route);

/**
 * @since 1.0.0
 * @param route The route on which this method should answer.
 */
export const HttpDelete = (route?: string) => createHttpMethodDecorator(Methods.DELETE, route);

/**
 * @since 1.0.0
 * @param route The route on which this method should answer.
 */
export const HttpConnect = (route?: string) => createHttpMethodDecorator(Methods.CONNECT, route);

/**
 * @since 1.0.0
 * @param route The route on which this method should answer.
 */
export const HttpOptions = (route?: string) => createHttpMethodDecorator(Methods.OPTIONS, route);

/**
 * @since 1.0.0
 * @param route The route on which this method should answer.
 */
export const HttpTrace = (route?: string) => createHttpMethodDecorator(Methods.TRACE, route);

/**
 * @since 1.0.0
 * @param route The route on which this method should answer.
 */
export const HttpPatch = (route?: string) => createHttpMethodDecorator(Methods.PATCH, route);
