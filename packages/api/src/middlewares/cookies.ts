import { Middleware } from '../lib/structures/Middleware';
import type { ApiRequest } from '../lib/structures/api/ApiRequest';
import type { ApiResponse } from '../lib/structures/api/ApiResponse';
import { CookieStore } from '../lib/structures/api/CookieStore';

export class PluginMiddleware extends Middleware {
	private readonly production: boolean = process.env.NODE_ENV === 'production';
	private domainOverwrite: string | null = null;

	public constructor(context: Middleware.LoaderContext) {
		super(context, { position: 30 });

		const { server } = this.container;
		this.domainOverwrite = server.auth?.domainOverwrite ?? null;
	}

	public override run(request: ApiRequest, response: ApiResponse) {
		response.cookies = new CookieStore(request, response, this.production, this.domainOverwrite);
	}
}
