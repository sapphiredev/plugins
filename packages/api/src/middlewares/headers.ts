import { METHODS } from 'http';
import type { ApiRequest } from '../lib/structures/api/ApiRequest';
import type { ApiResponse } from '../lib/structures/api/ApiResponse';
import { HttpCodes } from '../lib/structures/http/HttpCodes';
import { Middleware } from '../lib/structures/Middleware';
import type { Route } from '../lib/structures/Route';

export class PluginMiddleware extends Middleware {
	private readonly origin: string;
	private readonly methods: string = METHODS.join(', ');

	public constructor(context: Middleware.Context) {
		super(context, { position: 10 });
		this.origin = this.container.server.options.origin ?? '*';
	}

	public run(request: ApiRequest, response: ApiResponse, route: Route | null) {
		response.setHeader('Date', new Date().toUTCString());
		response.setHeader('Access-Control-Allow-Credentials', 'true');
		response.setHeader('Access-Control-Allow-Origin', this.origin);
		response.setHeader('Access-Control-Allow-Headers', 'Authorization, User-Agent, Content-Type');
		response.setHeader('Access-Control-Allow-Methods', this.methods);

		this.ensurePotentialEarlyExit(request, response, route);
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
	private ensurePotentialEarlyExit(request: ApiRequest, response: ApiResponse, route: Route | null) {
		if (request.method === 'OPTIONS') {
			response.end();
		} else if (route === null) {
			response.status(HttpCodes.NotFound).end();
		}
	}
}
