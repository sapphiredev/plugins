import { Middleware } from '../lib/structures/Middleware';
import { CookieStore } from '../lib/structures/api/CookieStore';

export class PluginMiddleware extends Middleware {
	private readonly production: boolean = process.env.NODE_ENV === 'production';
	private readonly domainOverwrite: string | null;

	public constructor(context: Middleware.LoaderContext) {
		super(context, { position: 30 });

		const { server } = this.container;
		this.domainOverwrite = server.auth?.domainOverwrite ?? null;
	}

	public override run(request: Middleware.Request, response: Middleware.Response) {
		response.cookies = new CookieStore(request, response, this.production, this.domainOverwrite);
	}
}
