import { Event, PieceContext } from '@sapphire/framework';
import type { ApiRequest } from '../lib/structures/api/ApiRequest';
import type { ApiResponse } from '../lib/structures/api/ApiResponse';
import { HttpCodes } from '../lib/structures/http/HttpCodes';
import { ServerEvents } from '../lib/structures/http/Server';

export class PluginEvent extends Event {
	public constructor(context: PieceContext) {
		super(context, { emitter: 'server', event: ServerEvents.MiddlewareError });
	}

	public run(_: ApiRequest, response: ApiResponse, error: Error) {
		// Log the error to console:
		this.context.client.logger.fatal(error);

		// Send a response to the client if none was sent:
		if (!response.writableEnded) response.status(HttpCodes.InternalServerError).json({ error: error.message });
	}
}
