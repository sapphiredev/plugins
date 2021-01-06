import type { PieceContext } from '@sapphire/pieces';
import type { ApiRequest } from '../lib/structures/api/ApiRequest';
import type { ApiResponse } from '../lib/structures/api/ApiResponse';
import { HttpCodes } from '../lib/structures/http/HttpCodes';
import type { MediaParserStore } from '../lib/structures/MediaParserStore';
import { Middleware } from '../lib/structures/Middleware';
import type { Route } from '../lib/structures/Route';

export class PluginMiddleware extends Middleware {
	private readonly maximumBodyLength: number;
	private readonly mediaParsers: MediaParserStore;
	public constructor(context: PieceContext) {
		super(context, { position: 20 });
		this.maximumBodyLength = this.context.server.options.maximumBodyLength ?? 1024 * 1024 * 50;
		this.mediaParsers = this.context.server.mediaParsers;
	}

	public async run(request: ApiRequest, response: ApiResponse, route: Route | null) {
		const contentType = request.headers['content-type'];
		if (typeof contentType !== 'string') return;

		// RFC 7230 3.3.2.
		const lengthString = request.headers['content-length'];
		if (typeof lengthString !== 'string') return;

		const length = Number(lengthString);
		const maximumLength = route?.maximumBodyLength ?? this.maximumBodyLength;
		if (length > maximumLength) {
			response.status(HttpCodes.PayloadTooLarge).json({ error: 'Exceeded maximum content length.' });
			return;
		}

		const index = contentType.indexOf(';');
		const type = index === -1 ? contentType : contentType.slice(0, index);
		const parser = this.mediaParsers.get(type);
		if (!parser) {
			response.status(HttpCodes.UnsupportedMediaType).json({ error: `Unsupported type ${type}.` });
			return;
		}

		try {
			request.body = await parser.run(request);
		} catch {
			response.status(HttpCodes.BadRequest).json({ error: `Cannot parse ${type} data.` });
		}
	}
}
