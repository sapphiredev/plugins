import { Store } from '@sapphire/pieces';
import { Collection } from 'discord.js';
import { URLSearchParams } from 'url';
import type { ApiRequest } from './api/ApiRequest';
import type { ApiResponse } from './api/ApiResponse';
import { methodEntries, type Methods } from './http/HttpMethods';
import { Route } from './Route';

const slash = '/'.charCodeAt(0);

export interface MethodCallback {
	(request: ApiRequest, response: ApiResponse): unknown;
}

export interface RouteMatch {
	route: Route;
	cb: MethodCallback;
}

/**
 * @since 1.0.0
 */
export class RouteStore extends Store<Route, 'routes'> {
	public readonly table = new Collection<Methods, Collection<Route, MethodCallback>>();

	public constructor() {
		super(Route, { name: 'routes' });

		for (const [method] of methodEntries) this.table.set(method, new Collection());
	}

	public match(request: ApiRequest): RouteMatch | null {
		const { method } = request;

		// If there is no method, we can't match a route so return null
		if (typeof method === 'undefined') {
			return null;
		}

		// We get all the methods that are tied to the provided method to have a smaller list to filter through
		const methodTable = this.table.get(method as Methods);

		// If there are no methods of the provided type then we won't find any route so we return null
		if (typeof methodTable === 'undefined') {
			return null;
		}

		const { splits, querystring } = this.parseURL(request.url);

		for (const [route, cb] of methodTable.entries()) {
			const result = route.router.match(splits);
			if (result === null) continue;

			request.params = result;
			request.query = Object.fromEntries(new URLSearchParams(querystring).entries());

			return { route, cb };
		}

		return null;
	}

	private parseURL(url = '') {
		const index = url.indexOf('?');

		/* eslint-disable @typescript-eslint/init-declarations */
		let pathname: string;
		let querystring: string;
		/* eslint-enable @typescript-eslint/init-declarations */
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
