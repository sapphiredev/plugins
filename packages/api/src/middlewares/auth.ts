import type { PieceContext } from '@sapphire/framework';
import type { ApiRequest } from '../lib/structures/api/ApiRequest';
import type { ApiResponse } from '../lib/structures/api/ApiResponse';
import { Middleware } from '../lib/structures/Middleware';

export class PluginMiddleware extends Middleware {
	private readonly cookieName: string;
	public constructor(context: PieceContext) {
		super(context, { priority: 30 });

		this.cookieName = this.client.options.api?.authCookieName ?? 'SAPPHIRE_AUTH';
		if (this.client.server.auth === null) this.enabled = false;
	}

	public run(request: ApiRequest, response: ApiResponse) {
		const authorization = response.cookies.get(this.cookieName);
		if (authorization) {
			request.auth = this.client.server.auth!.decrypt(authorization);
		}
	}
}
