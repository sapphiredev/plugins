import { Listener } from '@sapphire/framework';
import type { Route } from '../lib/structures/Route';
import { ServerEvents } from '../lib/structures/http/Server';

export class PluginListener extends Listener {
	public constructor(context: Listener.LoaderContext) {
		super(context, { emitter: 'server', event: ServerEvents.Match });
	}

	public override run(request: Route.Request, response: Route.Response, route: Route) {
		this.container.server.emit(
			response.writableEnded ? ServerEvents.MiddlewareFailure : ServerEvents.MiddlewareSuccess,
			request,
			response,
			route
		);
	}
}
