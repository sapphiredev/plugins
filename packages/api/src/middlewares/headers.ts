import { Middleware } from '../lib/structures/Middleware';
import type { Route } from '../lib/structures/Route';
import type { RouteStore } from '../lib/structures/RouteStore';
import { HttpCodes } from '../lib/structures/http/HttpCodes';

export class PluginMiddleware extends Middleware {
	private readonly origin: string;
	private readonly routes: RouteStore;

	public constructor(context: Middleware.LoaderContext) {
		super(context, { position: 10 });
		this.origin = this.container.server.options.origin ?? '*';
		this.routes = this.container.stores.get('routes');
	}

	public override run(request: Middleware.Request, response: Middleware.Response, route: Route | null) {
		response.setHeader('Date', new Date().toUTCString());
		response.setHeader('Access-Control-Allow-Credentials', 'true');
		response.setHeader('Access-Control-Allow-Origin', this.origin);
		response.setHeader('Access-Control-Allow-Headers', 'Authorization, User-Agent, Content-Type');
		response.setHeader('Access-Control-Allow-Methods', this.getMethods(route));

		this.ensurePotentialEarlyExit(request, response, route);
	}

	private getMethods(route: Route | null) {
		if (route === null) {
			const { methods } = this.routes;
			if (methods.size === 0) return '';
			if (methods.size === 1) return methods.firstKey()!;
			return [...methods.keys()].join(', ');
		}

		if (route.methods.size === 0) return '';
		if (route.methods.size === 1) return route.methods.keys().next().value;
		return [...route.methods].join(', ');
	}

	/**
	 * **RFC 7231 4.3.7.**
	 * > This method allows a client to determine the options and/or requirements associated with a
	 * > resource, or the capabilities of a server, without implying a resource action.
	 *
	 * This method ensures that the request is exited early in case required
	 * The conditions in which an early exit is required are:
	 * 1. If the request method is 'OPTIONS'. In this case the request is returned with status code 200
	 * 2. If the requested route isn't matched with any existing route in the RouteStore.
	 * In this case the request is returned with a status code 404.
	 *
	 * @param request The API Request coming in
	 * @param response The API response that will go out
	 * @param route The route being requested by the request
	 */
	private ensurePotentialEarlyExit(request: Middleware.Request, response: Middleware.Response, route: Route | null) {
		if (request.method === 'OPTIONS') {
			if (!route || !route.methods.has('OPTIONS')) {
				response.end();
			}
		} else if (route === null) {
			response.status(HttpCodes.NotFound).end();
		}
	}
}
