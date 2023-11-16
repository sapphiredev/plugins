import { Listener } from '@sapphire/framework';
import type { RouteMatch } from '../lib/structures/RouteStore';
import type { ApiRequest } from '../lib/structures/api/ApiRequest';
import type { ApiResponse } from '../lib/structures/api/ApiResponse';
import { ServerEvents } from '../lib/structures/http/Server';

export class PluginListener extends Listener {
	public constructor(context: Listener.LoaderContext) {
		super(context, { emitter: 'server', event: ServerEvents.Match });
	}

	public override run(request: ApiRequest, response: ApiResponse, match: RouteMatch) {
		this.container.server.emit(
			response.writableEnded ? ServerEvents.MiddlewareFailure : ServerEvents.MiddlewareSuccess,
			request,
			response,
			match
		);
	}
}
