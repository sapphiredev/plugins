import { IncomingMessage } from 'http';
import type { AuthData } from '../http/Auth';
// import { RESTPostOAuth2AccessTokenResult } from 'discord-api-types/v6';

export class ApiRequest extends IncomingMessage {
	public query: Record<string, string | string[]> = {};
	public params: Record<string, string> = {};
	public body?: unknown;
	public auth?: AuthData;
}
