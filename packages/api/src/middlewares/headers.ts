import { isNullish } from '@sapphire/utilities';
import { Middleware } from '../lib/structures/Middleware';
import type { RouteStore } from '../lib/structures/RouteStore';
import { HttpCodes } from '../lib/structures/http/HttpCodes';
import type { RouterNode } from '../lib/structures/router/RouterNode';

export class PluginMiddleware extends Middleware {
	private readonly origin: string;
	private readonly routes: RouteStore;

	public constructor(context: Middleware.LoaderContext) {
		super(context, { position: 10 });
		this.origin = this.container.server.options.origin ?? '*';
		this.routes = this.container.stores.get('routes');
	}

	public override run(request: Middleware.Request, response: Middleware.Response) {
		response.setHeader('Date', new Date().toUTCString());
		response.setHeader('Access-Control-Allow-Credentials', 'true');
		response.setHeader('Access-Control-Allow-Origin', this.origin);
		response.setHeader('Access-Control-Allow-Headers', 'Authorization, User-Agent, Content-Type');
		response.setHeader('Access-Control-Allow-Methods', this.getMethods(request.routerNode));

		this.ensurePotentialEarlyExit(request, response);
	}

	private getMethods(routerNode: RouterNode | null | undefined): string {
		if (isNullish(routerNode)) {
			return this.routes.router.supportedMethods.join(', ');
		}

		return [...routerNode.methods()].join(', ');
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
	private ensurePotentialEarlyExit({ method, route, routerNode }: Middleware.Request, response: Middleware.Response) {
		if (method === 'OPTIONS') {
			if (!route?.methods.has('OPTIONS')) {
				response.end();
			}
		} else if (routerNode === null) {
			response.status(HttpCodes.NotFound).end();
		} else if (route === null) {
			response.status(HttpCodes.MethodNotAllowed).end();
		}
	}
}
