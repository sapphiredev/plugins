import type { PieceContext } from '@sapphire/framework';
import { URLSearchParams } from 'url';
import { createGunzip, createInflate } from 'zlib';
import type { ApiRequest } from '../lib/structures/api/ApiRequest';
import type { ApiResponse } from '../lib/structures/api/ApiResponse';
import { HttpCodes } from '../lib/structures/http/HttpCodes';
import { Middleware } from '../lib/structures/Middleware';
import type { Route } from '../lib/structures/Route';
import { MimeTypes } from '../lib/utils/MimeTypes';

export class PluginMiddleware extends Middleware {
	public constructor(context: PieceContext) {
		super(context, { priority: 20 });
	}

	public run(request: ApiRequest, response: ApiResponse, route: Route) {
		const contentType = request.headers['content-type'];
		if (typeof contentType !== 'string') return null;

		const lengthString = request.headers['content-length'];
		const length = lengthString ? Number(lengthString) : Number.MAX_SAFE_INTEGER;
		if (length > route.maximumBodyLength) {
			response.status(HttpCodes.PayloadTooLarge).json({ error: 'Exceeded maximum content length.' });
			return null;
		}

		const index = contentType.indexOf(';');
		const type = index === -1 ? contentType : contentType.slice(0, index);

		switch (type) {
			case MimeTypes.ApplicationJson:
				return this.applicationJson(request, response);
			case MimeTypes.ApplicationFormUrlEncoded:
				return this.applicationFormUrlEncoded(request, response);
			case MimeTypes.TextPlain:
				return this.textPlain(request);
			default:
				response.status(HttpCodes.UnsupportedMediaType).json({ error: `Unsupported type ${type}.` });
				return null;
		}
	}

	private async textPlain(request: ApiRequest) {
		const body = await this.loadStringBody(request);
		request.body = body === '' ? null : '';
	}

	private async applicationJson(request: ApiRequest, response: ApiResponse) {
		const body = await this.loadStringBody(request);
		try {
			request.body = body === '' ? null : JSON.parse(body);
		} catch {
			response.status(HttpCodes.BadRequest).json({ error: 'Cannot parse application JSON data.' });
		}
	}

	private async applicationFormUrlEncoded(request: ApiRequest, response: ApiResponse) {
		const body = await this.loadStringBody(request);
		try {
			request.body = body === '' ? null : Object.fromEntries(new URLSearchParams(body).entries());
		} catch {
			response.status(HttpCodes.BadRequest).json({ error: 'Cannot parse Form URL-Encoded data.' });
		}
	}

	private async loadStringBody(request: ApiRequest) {
		const stream = this.contentStream(request);
		if (stream === null) return '';

		let body = '';
		for await (const chunk of stream) body += chunk;

		return body;
	}

	private contentStream(request: ApiRequest) {
		switch ((request.headers['content-encoding'] ?? 'identity').toLowerCase()) {
			case 'deflate': {
				const stream = createInflate();
				request.pipe(stream);
				return stream;
			}
			case 'gzip': {
				const stream = createGunzip();
				request.pipe(stream);
				return stream;
			}
			case 'identity': {
				return request;
			}
		}

		return null;
	}
}
