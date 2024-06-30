import { IncomingMessage } from 'node:http';
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
	 * The body that was sent by the user.
	 */
	public body?: unknown;

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
}
