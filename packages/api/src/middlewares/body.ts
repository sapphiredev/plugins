import { HttpCodes } from '../lib/structures/http/HttpCodes';
import { Middleware } from '../lib/structures/Middleware';

export class PluginMiddleware extends Middleware {
	public constructor(context: Middleware.LoaderContext) {
		super(context, { position: 20 });
	}

	public override run(request: Middleware.Request, response: Middleware.Response) {
		if (!request.route) return;

		// RFC 1341 4.
		const contentType = request.headers['content-type'];
		if (typeof contentType !== 'string') return;

		// RFC 7230 3.3.2.
		const lengthString = request.headers['content-length'];
		if (typeof lengthString !== 'string') return;

		// Verify if the content length is lower than accepted:
		const length = Number(lengthString);
		const maximumLength = request.route.maximumBodyLength;
		if (length > maximumLength) {
			response.status(HttpCodes.PayloadTooLarge).json({ error: 'Exceeded maximum content length.' });
		}
	}
}
