import { Listener } from '@sapphire/framework';
import type { ApiRequest } from '../lib/structures/api/ApiRequest';
import type { ApiResponse } from '../lib/structures/api/ApiResponse';
import { ServerEvents } from '../lib/structures/http/Server';

export class PluginListener extends Listener {
	public constructor(context: Listener.LoaderContext) {
		super(context, { emitter: 'server', event: ServerEvents.Request });
	}

	public override async run(request: ApiRequest, response: ApiResponse) {
		const route = this.container.server.routes.match(request);

		try {
			// Middlewares need to be run regardless of the match, specially since browsers do an OPTIONS request first.
			await this.container.server.middlewares.run(request, response, route);
		} catch (error) {
			this.container.server.emit(ServerEvents.MiddlewareError, error, { request, response, match: route });

			// If a middleware errored, it might cause undefined behavior in the routes, so we will return early.
			return;
		}

		if (route === null) {
			this.container.server.emit(ServerEvents.NoMatch, request, response);
		} else {
			this.container.server.emit(ServerEvents.Match, request, response, route);
		}
	}
}
