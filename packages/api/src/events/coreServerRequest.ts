import { Event, PieceContext } from '@sapphire/framework';
import type { ApiRequest } from '../lib/structures/api/ApiRequest';
import type { ApiResponse } from '../lib/structures/api/ApiResponse';
import { ServerEvents } from '../lib/structures/http/Server';

export class PluginEvent extends Event {
	public constructor(context: PieceContext) {
		super(context, { emitter: 'server', event: ServerEvents.Request });
	}

	public async run(request: ApiRequest, response: ApiResponse) {
		const match = this.context.server.routes.match(request);

		try {
			// Middlewares need to be run regardless of the match, specially since browsers do an OPTIONS request first.
			await this.context.server.middlewares.run(request, response, match?.route ?? null);
		} catch (error) {
			this.context.server.emit(ServerEvents.MiddlewareError, error, { request, response, match });

			// If a middleware errored, it might cause undefined behaviour in the routes, so we will return early.
			return;
		}

		if (match === null) {
			this.context.server.emit(ServerEvents.NoMatch, request, response);
		} else {
			this.context.server.emit(ServerEvents.Match, request, response, match);
		}
	}
}
