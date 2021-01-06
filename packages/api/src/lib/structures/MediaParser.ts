import { Piece } from '@sapphire/pieces';
import type { Awaited } from '@sapphire/utilities';
import { createGunzip, createInflate } from 'zlib';
import type { ApiRequest } from './api/ApiRequest';

/**
 * @since 1.3.0
 */
export abstract class MediaParser extends Piece {
	/**
	 * Per-piece listener that is called when the piece is loaded into the store.
	 * Useful to set-up asynchronous initialization tasks.
	 */
	public abstract run(request: ApiRequest): Awaited<unknown>;

	protected async readString(request: ApiRequest): Promise<string> {
		const stream = this.contentStream(request);
		if (stream === null) return '';

		let body = '';
		for await (const chunk of stream) body += chunk;

		return body;
	}

	protected async readBuffer(request: ApiRequest): Promise<Buffer> {
		const stream = this.contentStream(request);
		if (stream === null) return Buffer.alloc(0);

		const bodies: Buffer[] = [];
		for await (const chunk of stream) bodies.push(chunk);

		return Buffer.concat(bodies);
	}

	protected contentStream(request: ApiRequest) {
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
