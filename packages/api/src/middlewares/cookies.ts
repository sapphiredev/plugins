import type { PieceContext } from '@sapphire/framework';
import type { ApiRequest } from '../lib/structures/api/ApiRequest';
import type { ApiResponse } from '../lib/structures/api/ApiResponse';
import { CookieStore } from '../lib/structures/api/CookieStore';
import { Middleware } from '../lib/structures/Middleware';

export class PluginMiddleware extends Middleware {
	private readonly production: boolean = process.env.NODE_ENV === 'production';
	public constructor(context: PieceContext) {
		super(context, { position: 30 });
	}

	public run(request: ApiRequest, response: ApiResponse) {
		response.cookies = new CookieStore(request, response, this.production);
	}
}
