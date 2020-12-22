import type { PieceContext } from '@sapphire/pieces';
import type { ApiRequest } from '../lib/structures/api/ApiRequest';
import type { ApiResponse } from '../lib/structures/api/ApiResponse';
import { Middleware } from '../lib/structures/Middleware';

export class PluginMiddleware extends Middleware {
	private readonly cookieName: string;
	public constructor(context: PieceContext) {
		super(context, { position: 40 });

		const { server } = this.context;
		this.cookieName = server.auth?.cookie ?? 'SAPPHIRE_AUTH';
		this.enabled = server.auth !== null;
	}

	public run(request: ApiRequest, response: ApiResponse) {
		const authorization = response.cookies.get(this.cookieName);
		request.auth = authorization ? this.context.server.auth!.decrypt(authorization) : null;
	}
}
