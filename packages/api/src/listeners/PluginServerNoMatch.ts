import { Listener } from '@sapphire/framework';
import type { ApiRequest } from '../lib/structures/api/ApiRequest';
import type { ApiResponse } from '../lib/structures/api/ApiResponse';
import { ServerEvents } from '../lib/structures/http/Server';

export class PluginListener extends Listener {
	public constructor(context: Listener.Context) {
		super(context, { emitter: 'server', event: ServerEvents.NoMatch });
	}

	public override run(_: ApiRequest, response: ApiResponse) {
		if (!response.writableEnded) response.notFound();
	}
}
