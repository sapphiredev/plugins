import { IncomingMessage, ServerResponse, STATUS_CODES } from 'node:http';
import { Readable } from 'node:stream';
import { ReadableStream } from 'node:stream/web';
import type { MimeType } from '@sapphire/iana-mime-types';
import { HttpCodes } from '../http/HttpCodes';
import type { CookieStore } from './CookieStore';

/**
 * @since 1.0.0
 */
export class ApiResponse<Request extends IncomingMessage = IncomingMessage> extends ServerResponse<Request> {
	/**
	 * @since 1.0.0
	 */
	public cookies!: CookieStore;

	/**
	 * @since 1.0.0
	 */
	public ok(data: unknown = STATUS_CODES[HttpCodes.OK]): void {
		this.status(HttpCodes.OK);
		return this.respond(data);
	}

	/**
	 * @since 1.0.0
	 */
	public created(data: unknown = STATUS_CODES[HttpCodes.Created]): void {
		this.status(HttpCodes.Created);
		return this.respond(data);
	}

	/**
	 * @since 1.0.0
	 */
	public noContent(data: unknown = STATUS_CODES[HttpCodes.NoContent]): void {
		this.status(HttpCodes.NoContent);
		return this.respond(data);
	}

	/**
	 * @since 1.0.0
	 */
	public badRequest(data?: unknown): void {
		return this.error(HttpCodes.BadRequest, data);
	}

	/**
	 * @since 1.0.0
	 */
	public unauthorized(data?: unknown): void {
		return this.error(HttpCodes.Unauthorized, data);
	}

	/**
	 * @since 1.0.0
	 */
	public forbidden(data?: unknown): void {
		return this.error(HttpCodes.Forbidden, data);
	}

	/**
	 * @since 1.0.0
	 */
	public notFound(data?: unknown): void {
		return this.error(HttpCodes.NotFound, data);
	}

	/**
	 * @since 7.0.0
	 */
	public methodNotAllowed(data?: unknown): void {
		return this.error(HttpCodes.MethodNotAllowed, data);
	}

	/**
	 * @since 1.0.0
	 */
	public conflict(data?: unknown) {
		return this.error(HttpCodes.Conflict, data);
	}

	/**
	 * @since 1.0.0
	 */
	public error(error: number | string, data?: unknown): void {
		if (typeof error === 'string') {
			return this.status(HttpCodes.InternalServerError).json({ error });
		}

		return this.status(error).json({ error: data ?? STATUS_CODES[error] });
	}

	/**
	 * @since 1.0.0
	 */
	public respond(data: unknown): void {
		return typeof data === 'string' ? this.text(data) : this.json(data);
	}

	/**
	 * @since 1.0.0
	 */
	public status(code: number): this {
		this.statusCode = code;
		return this;
	}

	/**
	 * @since 1.0.0
	 */
	public json(data: any): void {
		this.setContentType('application/json').end(JSON.stringify(data));
	}

	/**
	 * @since 1.0.0
	 */
	public text(data: string): void {
		this.setContentType('text/plain').end(data);
	}

	/**
	 * @since 6.1.0
	 *
	 * Sets the image content type and sends the image data in the response.
	 *
	 * @param type - The MIME type of the image (e.g., 'image/png').
	 * @param data - The image data as a `string`, {@link Buffer}, {@link Uint8Array}, or {@link ReadableStream}.
	 */
	public image(type: Extract<MimeType, `image/${string}`>, data: string | Buffer | Uint8Array | Readable): void {
		if (data instanceof Readable) {
			this.setContentType(type);
			data.pipe(this);
		} else {
			this.setContentType(type).end(data);
		}
	}

	/**
	 * @since 5.1.0
	 */
	public html(code: number, data: string): void {
		this.setContentType('text/html').status(code).end(data);
	}

	/**
	 * @since 1.0.0
	 */
	public setContentType(contentType: MimeType): this {
		this.setHeader('Content-Type', contentType);
		return this;
	}
}
