import { Listener } from '@sapphire/framework';
import type { ApiRequest } from '../lib/structures/api/ApiRequest';
import type { ApiResponse } from '../lib/structures/api/ApiResponse';
import { ServerEvent } from '../lib/structures/http/Server';

export class PluginListener extends Listener {
	public constructor(context: Listener.LoaderContext) {
		super(context, { emitter: 'server', event: ServerEvent.MiddlewareSuccess });
	}

	public override async run(request: ApiRequest, response: ApiResponse) {
		try {
			await request.route!.run(request, response);
		} catch (error) {
			this.container.server.emit(ServerEvent.RouteError, error as Error, request, response);
		}
	}
}
