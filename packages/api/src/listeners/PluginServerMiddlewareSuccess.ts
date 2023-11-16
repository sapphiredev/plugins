import { Listener } from '@sapphire/framework';
import type { RouteMatch } from '../lib/structures/RouteStore';
import type { ApiRequest } from '../lib/structures/api/ApiRequest';
import type { ApiResponse } from '../lib/structures/api/ApiResponse';
import { ServerEvents } from '../lib/structures/http/Server';

export class PluginListener extends Listener {
	public constructor(context: Listener.LoaderContext) {
		super(context, { emitter: 'server', event: ServerEvents.MiddlewareSuccess });
	}

	public override async run(request: ApiRequest, response: ApiResponse, match: RouteMatch) {
		try {
			await match.cb(request, response);
		} catch (error) {
			this.container.server.emit(ServerEvents.RouteError, error, { request, response, match });
		}
	}
}
