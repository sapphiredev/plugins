import { Piece } from '@sapphire/pieces';
import type { Awaited } from '@sapphire/utilities';
import { createBrotliDecompress, createGunzip, createInflate } from 'zlib';
import type { ApiRequest } from './api/ApiRequest';
import type { MimeTypeWithoutParameters } from './http/Server';
import type { Route } from './Route';

/**
 * A media parser
 * @since 1.3.0
 */
export abstract class MediaParser extends Piece {
	/**
	 * Parses the body data from an API request.
	 * @since 1.3.0
	 */
	public abstract run(request: ApiRequest): Awaited<unknown>;

	/**
	 * Checks if a route accepts the media type from this parser.
	 * @since 1.3.0
	 * @param route The route to be checked.
	 */
	public accepts(route: Route): boolean {
		return route.acceptedContentMimeTypes === null || route.acceptedContentMimeTypes.includes(this.name as MimeTypeWithoutParameters);
	}

	/**
	 * Reads the content body as a string, this is useful for parsing/reading plain-text data.
	 * @since 1.3.0
	 * @param request The request to read the body from.
	 */
	protected async readString(request: ApiRequest): Promise<string> {
		const stream = this.contentStream(request);
		if (stream === null) return '';

		let body = '';
		for await (const chunk of stream) body += chunk;

		return body;
	}

	/**
	 * Reads the content body as a buffer, this is useful for parsing/reading binary data.
	 * @since 1.3.0
	 * @param request The request to read the body from.
	 */
	protected async readBuffer(request: ApiRequest): Promise<Buffer> {
		const stream = this.contentStream(request);
		if (stream === null) return Buffer.alloc(0);

		const bodies: Buffer[] = [];
		for await (const chunk of stream) bodies.push(chunk);

		return Buffer.concat(bodies);
	}

	/**
	 * Reads the content stream from a request, piping the data through a transformer stream.
	 * @since 1.3.0
	 * @param request The request to read the body from.
	 */
	protected contentStream(request: ApiRequest) {
		switch ((request.headers['content-encoding'] ?? 'identity').toLowerCase()) {
			// RFC 7230 4.2.2:
			//
			// The "deflate" coding is a "zlib" data format (RFC 1950) containing a "deflate" compressed data stream
			// (RFC 1951) that uses a combination of the Lempel-Ziv (LZ77) compression algorithm and Huffman coding.
			case 'deflate': {
				const stream = createInflate();
				request.pipe(stream);
				return stream;
			}

			// RFC 7230 4.2.3
			//
			// The "gzip" coding is an LZ77 coding with a 32-bit Cyclic Redundancy Check (CRC) that is commonly produced
			// by the gzip file compression program (RFC 1952).
			case 'x-gzip':
			case 'gzip': {
				const stream = createGunzip();
				request.pipe(stream);
				return stream;
			}

			// RFC 7932
			//
			// A format using the Brotli algorithm.
			case 'br': {
				const stream = createBrotliDecompress();
				request.pipe(stream);
				return stream;
			}

			// An "identity" token is used as a synonym for "no encoding" in order to communicate when no encoding is
			// preferred.
			case 'identity': {
				return request;
			}
		}

		return null;
	}
}
