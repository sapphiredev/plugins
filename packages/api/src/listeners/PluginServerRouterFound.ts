import { Listener } from '@sapphire/framework';
import type { ApiRequest } from '../lib/structures/api/ApiRequest';
import type { ApiResponse } from '../lib/structures/api/ApiResponse';
import { ServerEvent } from '../lib/structures/http/Server';

export class PluginListener extends Listener {
	public constructor(context: Listener.LoaderContext) {
		super(context, { emitter: 'server', event: ServerEvent.RouterFound });
	}

	public override run(request: ApiRequest, response: ApiResponse) {
		const event = response.writableEnded ? ServerEvent.MiddlewareFailure : ServerEvent.MiddlewareSuccess;
		this.container.server.emit(event, request, response);
	}
}
