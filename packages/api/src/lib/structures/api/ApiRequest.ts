import { IncomingMessage } from 'http';
import type { AuthData } from '../http/Auth';

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
}
