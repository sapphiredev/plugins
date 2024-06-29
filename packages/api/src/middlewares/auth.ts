import { Middleware } from '../lib/structures/Middleware';

export class PluginMiddleware extends Middleware {
	private readonly cookieName: string;

	public constructor(context: Middleware.LoaderContext) {
		super(context, { position: 40 });

		const { server } = this.container;
		this.cookieName = server.auth?.cookie ?? 'SAPPHIRE_AUTH';
		this.enabled = server.auth !== null;
	}

	public override run(request: Middleware.Request, response: Middleware.Response) {
		// If there are no cookies, set auth as null:
		const authorization = response.cookies.get(this.cookieName);
		if (!authorization) {
			request.auth = null;
			return;
		}

		// Decrypt the cookie, and if the token is invalid, remove the cookie:
		request.auth = this.container.server.auth!.decrypt(authorization);
		if (request.auth === null) response.cookies.remove(this.cookieName);
	}
}
