import { Listener } from '@sapphire/framework';
import type { ApiRequest } from '../lib/structures/api/ApiRequest';
import type { ApiResponse } from '../lib/structures/api/ApiResponse';
import type { MethodName } from '../lib/structures/http/HttpMethods';
import { ServerEvent } from '../lib/structures/http/Server';
import { RouterRoot } from '../lib/structures/router/RouterRoot';

export class PluginListener extends Listener {
	public constructor(context: Listener.LoaderContext) {
		super(context, { emitter: 'server', event: ServerEvent.Request });
	}

	public override async run(request: ApiRequest, response: ApiResponse) {
		const { parts, querystring } = this.#parseURL(request.url);
		request.query = Object.fromEntries(new URLSearchParams(querystring).entries());

		const branch = this.container.server.routes.router.find(parts);
		const node = branch ? branch.node : null;
		const route = node ? node.get((request.method ?? 'GET') as MethodName) : null;

		if (node !== null) {
			request.params = node!.extractParameters(parts);
		}

		request.routerNode = node;
		request.route = route;

		try {
			// Middlewares need to be run regardless of the match, specially since browsers do an OPTIONS request first.
			await this.container.server.middlewares.run(request, response);
		} catch (error) {
			this.container.server.emit(ServerEvent.MiddlewareError, error as Error, request, response);

			// If a middleware errored, it might cause undefined behavior in the routes, so we will return early.
			return;
		}

		if (branch === null) {
			this.container.server.emit(ServerEvent.RouterBranchNotFound, request, response);
		} else if (route === null) {
			this.container.server.emit(ServerEvent.RouterBranchMethodNotAllowed, request, response, branch);
		} else {
			this.container.server.emit(ServerEvent.RouterFound, request, response);
		}
	}

	#parseURL(url = '') {
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

		return { parts: RouterRoot.normalize(pathname), querystring };
	}
}
