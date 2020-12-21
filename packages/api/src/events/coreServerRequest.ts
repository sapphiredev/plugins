import { Event, PieceContext } from '@sapphire/framework';
import type { ApiRequest } from '../lib/structures/api/ApiRequest';
import type { ApiResponse } from '../lib/structures/api/ApiResponse';
import { ServerEvents } from '../lib/structures/http/Server';

export class PluginEvent extends Event {
	public constructor(context: PieceContext) {
		super(context, { emitter: 'server', event: ServerEvents.Request });
	}

	public run(request: ApiRequest, response: ApiResponse) {
		const match = this.client.server.routes.match(request);
		if (match === null) {
			this.client.server.emit(ServerEvents.NoMatch, request, response);
		} else {
			this.client.server.emit(ServerEvents.Match, request, response, match);
		}
	}
}
