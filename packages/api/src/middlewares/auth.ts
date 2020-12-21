import type { PieceContext } from '@sapphire/framework';
import type { ApiRequest } from '../lib/structures/api/ApiRequest';
import type { ApiResponse } from '../lib/structures/api/ApiResponse';
import { Middleware } from '../lib/structures/Middleware';

export class PluginMiddleware extends Middleware {
	private readonly cookieName: string;
	public constructor(context: PieceContext) {
		super(context, { position: 40 });

		this.cookieName = this.client.options.api?.auth?.cookie ?? 'SAPPHIRE_AUTH';
		this.enabled = this.client.server.auth !== null;
	}

	public run(request: ApiRequest, response: ApiResponse) {
		const authorization = response.cookies.get(this.cookieName);
		request.auth = authorization ? this.client.server.auth!.decrypt(authorization) : null;
	}
}
