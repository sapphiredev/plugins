import { BaseStore, SapphireClient } from '@sapphire/framework';
import { Collection } from 'discord.js';
import { URL } from 'url';
import type { ApiRequest } from './api/ApiRequest';
import type { ApiResponse } from './api/ApiResponse';
import { methodEntries, Methods } from './http/HttpMethods';
import { Route } from './Route';

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
export class RouteStore extends BaseStore<Route> {
	public readonly table = new Collection<Methods, Collection<Route, MethodCallback>>();

	public constructor(client: SapphireClient) {
		super(client, Route as any, { name: 'routes' });

		for (const [method] of methodEntries) this.table.set(method, new Collection());
	}

	public match(request: ApiRequest): RouteMatch | null {
		const { method } = request;
		if (typeof method === 'undefined') return null;

		const methodTable = this.table.get(method as Methods);
		if (typeof methodTable === 'undefined') return null;

		const parsed = new URL(request.url ?? '');
		const splitUrl = parsed.pathname.split('/');
		for (const [route, cb] of methodTable) {
			const result = route.router.match(splitUrl);
			if (result === null) continue;

			request.params = result;
			request.query = Object.fromEntries(parsed.searchParams.entries());

			return { route, cb };
		}

		return null;
	}
}
