import type { PieceContext } from '@sapphire/framework';
import { METHODS } from 'http';
import type { ApiRequest } from '../lib/structures/api/ApiRequest';
import type { ApiResponse } from '../lib/structures/api/ApiResponse';
import { Middleware } from '../lib/structures/Middleware';

export class PluginMiddleware extends Middleware {
	private readonly origin: string;
	private readonly methods: string = METHODS.join(', ');
	private readonly extraHeaders: readonly [string, string][];

	public constructor(context: PieceContext) {
		super(context, { priority: 10 });
		this.origin = this.client.options.api?.origin ?? '*';
		this.extraHeaders = this.client.options.api?.extraHeaders ?? [];
	}

	public run(request: ApiRequest, response: ApiResponse) {
		response.setHeader('Date', new Date().toUTCString());
		response.setHeader('Access-Control-Allow-Credentials', 'true');
		response.setHeader('Access-Control-Allow-Origin', this.origin);
		response.setHeader('Access-Control-Allow-Headers', 'Authorization, User-Agent, Content-Type');
		response.setHeader('Access-Control-Allow-Methods', this.methods);
		for (const [name, value] of this.extraHeaders) response.setHeader(name, value);

		// RFC 7231 4.3.7:
		// > This method allows a client to determine the options and/or requirements associated with a
		// > resource, or the capabilities of a server, without implying a resource action.
		//
		// Due to this method's nature, it is recommended to end the request after setting pre-flight CORS headers.
		if (request.method === 'OPTIONS') response.end();
	}
}
