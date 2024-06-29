import { Store } from '@sapphire/pieces';
import { isNullish } from '@sapphire/utilities';
import { Collection } from 'discord.js';
import { URLSearchParams } from 'url';
import type { RouteData } from '../utils/RouteData';
import { Route } from './Route';
import { RouteLoaderStrategy } from './RouteLoaderStrategy';
import type { MethodName } from './http/HttpMethods';

const slash = '/'.charCodeAt(0);

/**
 * @since 1.0.0
 */
export class RouteStore extends Store<Route, 'routes'> {
	public readonly methods = new Collection<MethodName, Collection<Route, RouteData>>();

	public constructor() {
		super(Route, { name: 'routes', strategy: new RouteLoaderStrategy() });
	}

	public match(request: Route.Request): Route | null {
		const { method } = request;

		// If there is no method, we can't match a route so return null
		if (typeof method === 'undefined') {
			return null;
		}

		// We get all the routes that are tied to the provided method to have a smaller list to filter through
		const methodTable = this.methods.get(method as MethodName);

		// If there are no routes of the provided type then we won't find any route so we return null
		if (isNullish(methodTable)) {
			return null;
		}

		const { splits, querystring } = this.parseURL(request.url);

		for (const [route, router] of methodTable.entries()) {
			const result = router.match(splits);
			if (result === null) continue;

			request.params = result;
			request.query = Object.fromEntries(new URLSearchParams(querystring).entries());

			return route;
		}

		return null;
	}

	private parseURL(url = '') {
		const index = url.indexOf('?');

		let pathname: string;
		let querystring: string;
		if (index === -1) {
			pathname = url;
			querystring = '';
		} else {
			pathname = url.substring(0, index);
			querystring = url.substring(index + 1);
		}

		if (pathname.charCodeAt(0) === slash) pathname = pathname.substring(1);
		if (pathname.length > 0 && pathname.charCodeAt(pathname.length - 1) === slash) pathname = pathname.substring(0, pathname.length - 1);

		const splits = pathname.split('/');

		return { splits, querystring };
	}
}
