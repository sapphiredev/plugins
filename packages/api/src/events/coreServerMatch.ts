import { Event, PieceContext } from '@sapphire/framework';
import type { ApiRequest } from '../lib/structures/api/ApiRequest';
import type { ApiResponse } from '../lib/structures/api/ApiResponse';
import { ServerEvents } from '../lib/structures/http/Server';
import type { RouteMatch } from '../lib/structures/RouteStore';

export class PluginEvent extends Event {
	public constructor(context: PieceContext) {
		super(context, { emitter: 'server', event: ServerEvents.Match });
	}

	public async run(request: ApiRequest, response: ApiResponse, match: RouteMatch) {
		try {
			await this.context.server.middlewares.run(request, response, match.route);
			this.context.server.emit(
				response.writableEnded ? ServerEvents.MiddlewareFailure : ServerEvents.MiddlewareSuccess,
				request,
				response,
				match
			);
		} catch (error) {
			this.context.server.emit(ServerEvents.MiddlewareError, request, response, error, match);
		}
	}
}
