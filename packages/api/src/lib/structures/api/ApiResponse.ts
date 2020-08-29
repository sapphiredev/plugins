import { ServerResponse, STATUS_CODES } from 'http';
import { Types as MimeTypes } from '../../utils/Mime';
import type { CookieStore } from './CookieStore';

/**
 * @since 1.0.0
 */
export class ApiResponse extends ServerResponse {
	/**
	 * @since 1.0.0
	 */
	public cookies!: CookieStore;

	/**
	 * @since 1.0.0
	 */
	public ok(data: unknown = STATUS_CODES[200]) {
		this.status(200);
		return this.respond(data);
	}

	/**
	 * @since 1.0.0
	 */
	public created(data: unknown = STATUS_CODES[201]) {
		this.status(201);
		return this.respond(data);
	}

	/**
	 * @since 1.0.0
	 */
	public noContent(data: unknown = STATUS_CODES[204]) {
		this.status(204);
		return this.respond(data);
	}

	/**
	 * @since 1.0.0
	 */
	public badRequest(data?: unknown) {
		return this.error(400, data);
	}

	/**
	 * @since 1.0.0
	 */
	public unauthorized(data?: unknown) {
		return this.error(401, data);
	}

	/**
	 * @since 1.0.0
	 */
	public forbidden(data?: unknown) {
		return this.error(403, data);
	}

	/**
	 * @since 1.0.0
	 */
	public notFound(data?: unknown) {
		return this.error(404, data);
	}

	/**
	 * @since 1.0.0
	 */
	public conflict(data?: unknown) {
		return this.error(409, data);
	}

	/**
	 * @since 1.0.0
	 */
	public error(error: number | string, data?: unknown): void {
		if (typeof error === 'string') {
			return this.status(500).json({ error });
		}

		return this.status(error).json({ error: data ?? STATUS_CODES[error] });
	}

	/**
	 * @since 1.0.0
	 */
	public respond(data: unknown) {
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
		return this.setContentType(MimeTypes.ApplicationJson).end(JSON.stringify(data));
	}

	/**
	 * @since 1.0.0
	 */
	public text(data: string): void {
		return this.setContentType(MimeTypes.TextPlain).end(data);
	}

	/**
	 * @since 1.0.0
	 */
	public setContentType(contentType: MimeTypes) {
		this.setHeader('Content-Type', contentType);
		return this;
	}
}
