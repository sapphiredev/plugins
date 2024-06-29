import { Listener } from '@sapphire/framework';
import type { Route } from '../lib/structures/Route';
import { ServerEvents } from '../lib/structures/http/Server';

export class PluginListener extends Listener {
	public constructor(context: Listener.LoaderContext) {
		super(context, { emitter: 'server', event: ServerEvents.MiddlewareSuccess });
	}

	public override async run(request: Route.Request, response: Route.Response, match: Route) {
		try {
			await match.run(request, response);
		} catch (error) {
			this.container.server.emit(ServerEvents.RouteError, error, { request, response, match });
		}
	}
}
