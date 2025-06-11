import { isNullishOrEmpty } from '@sapphire/utilities';
import type { Blob } from 'node:buffer';
import { IncomingMessage } from 'node:http';
import type { FormData, Request } from 'undici';
import type { MimeType } from '@sapphire/iana-mime-types';
import { RequestProxy } from '../../utils/_body/RequestProxy';
import type { Route } from '../Route';
import type { AuthData } from '../http/Auth';
import type { RouterNode } from '../router/RouterNode';

export class ApiRequest extends IncomingMessage {
	/**
	 * The query parameters.
	 */
	public query: Record<string, string | string[]> = {};

	/**
	 * The URI parameters.
	 */
	public params: Record<string, string> = {};

	/**
	 * The authorization information. This field indicates three possible values:
	 *
	 * - `undefined`: The authorization middleware has not been executed yet.
	 * - `null`: The user is not authorized.
	 * - `AuthData`: The user is authorized.
	 */
	public auth?: AuthData | null;

	/**
	 * The router node that matched the request. The field indicates three
	 * possible values:
	 *
	 * - `undefined`: The router handler has not been executed yet.
	 * - `null`: The router handler has been executed, but no node matched the
	 *   request.
	 * - `RouterNode`: The router handler has been executed and a node matched
	 *   the request.
	 *
	 * @since 7.0.0
	 */
	public routerNode?: RouterNode | null;

	/**
	 * The route that matched the request. The field indicates three possible
	 * values:
	 *
	 * - `undefined`: The router handler has not been executed yet.
	 * - `null`: The router handler has been executed, but no route matched the
	 *   request.
	 * - `Route`: The router handler has been executed and a route matched the
	 *   request.
	 *
	 * @since 7.0.0
	 */
	public route?: Route | null;

	/**
	 * The response object. This field is cached to prevent multiple response
	 * objects from being created.
	 */
	#cachedRequest: Request | null = null;

	get #isFormContentType() {
		const contentType = this.asWeb().headers.get('content-type') as MimeType | null;

		// If Content-Type isn't sent, we can't assume it's a form.
		if (isNullishOrEmpty(contentType)) return false;

		// If the Content-Type is application/x-www-form-urlencoded or multipart/form-data, it's a form.
		return contentType.startsWith('application/x-www-form-urlencoded') || contentType.startsWith('multipart/form-data');
	}

	/**
	 * The response object, used to validate the request's headers and body.
	 */
	public asWeb(): Request {
		this.#cachedRequest ??= new RequestProxy(this);
		return this.#cachedRequest;
	}

	/**
	 * Reads the request body and tries to parse using JSON or form-urlencoded.
	 *
	 * @example
	 * ```typescript
	 * const body = await request.readBody();
	 * ```
	 *
	 * @returns The result of the body parsing
	 */
	public readBody(): Promise<unknown> {
		return this.#isFormContentType ? this.readBodyFormData() : this.readBodyJson();
	}

	/**
	 * Reads the request body as an {@link ArrayBuffer}.
	 *
	 * @returns The result of the body parsing
	 */
	public readBodyArrayBuffer(): Promise<ArrayBuffer> {
		return this.asWeb().arrayBuffer();
	}

	/**
	 * Reads the request body as a {@link Blob}.
	 *
	 * @returns The result of the body parsing
	 */
	public readBodyBlob(): Promise<Blob> {
		return this.asWeb().blob();
	}

	/**
	 * Reads the request body as a {@link FormData}.
	 *
	 * @remarks
	 *
	 * This will throw an error if the content type is not one of the following:
	 *
	 * - `application/x-www-form-urlencoded`
	 * - `multipart/form-data`
	 *
	 * @returns The result of the body parsing
	 */
	public readBodyFormData(): Promise<FormData> {
		return this.asWeb().formData(); // NOSONAR
	}

	/**
	 * Reads the request body as text, using {@link TextDecoder}. Afterward, it
	 * parses the body as JSON with {@link JSON.parse}.
	 *
	 * @returns The result of the body parsing
	 */
	public readBodyJson(): Promise<unknown> {
		return this.asWeb().json();
	}

	/**
	 * Reads the request body as text, using {@link TextDecoder}.
	 *
	 * @returns The result of the body parsing
	 */
	public readBodyText(): Promise<string> {
		return this.asWeb().text();
	}

	/**
	 * Identical to {@link ApiRequest.readBody}, but it validates the result.
	 *
	 * @param validator The validator function to use on the body parsing result
	 * @returns The validated body
	 */
	public readValidatedBody<Type>(validator: ValidatorFunction<unknown, Type>) {
		return this.readBody().then(validator);
	}

	/**
	 * Identical to {@link ApiRequest.readBodyFormData}, but it validates the
	 * result.
	 *
	 * @param validator The validator function to use on the body parsing result
	 * @returns The validated body
	 */
	public readValidatedBodyFormData<Type>(validator: ValidatorFunction<FormData, Type>) {
		return this.readBodyFormData().then(validator);
	}

	/**
	 * Identical to {@link ApiRequest.readBodyJson}, but it validates the result.
	 *
	 * @param validator The validator function to use on the body parsing result
	 * @returns The validated body
	 */
	public readValidatedBodyJson<Type>(validator: ValidatorFunction<unknown, Type>) {
		return this.readBodyJson().then(validator);
	}

	/**
	 * Identical to {@link ApiRequest.readBodyText}, but it validates the result.
	 *
	 * @param validator The validator function to use on the body parsing result
	 * @returns The validated body
	 */
	public readValidatedBodyText<Type>(validator: ValidatorFunction<string, Type>) {
		return this.readBodyText().then(validator);
	}
}

export type ValidatorFunction<Data, Type> = (data: Data) => Type;
