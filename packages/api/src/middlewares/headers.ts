import type { PieceContext } from '@sapphire/framework';
import { METHODS } from 'http';
import type { ApiRequest } from '../lib/structures/api/ApiRequest';
import type { ApiResponse } from '../lib/structures/api/ApiResponse';
import { Middleware } from '../lib/structures/Middleware';

export class PluginMiddleware extends Middleware {
	private readonly origin: string;
	private readonly methods: string = METHODS.join(', ');

	public constructor(context: PieceContext) {
		super(context, { priority: 10 });
		this.origin = this.client.options.api?.origin ?? '*';
	}

	public run(request: ApiRequest, response: ApiResponse) {
		response.setHeader('Date', new Date().toUTCString());
		response.setHeader('Access-Control-Allow-Credentials', 'true');
		response.setHeader('Access-Control-Allow-Origin', this.origin);
		response.setHeader('Access-Control-Allow-Headers', 'Authorization, User-Agent, Content-Type');
		response.setHeader('Access-Control-Allow-Methods', this.methods);
		if (request.method === 'OPTIONS') response.end();
	}
}
