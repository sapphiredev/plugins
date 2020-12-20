import { IncomingMessage } from 'http';

export interface UserAuthObject {
	token: string;
	refresh: string;
	// eslint-disable-next-line @typescript-eslint/naming-convention
	user_id: string;
	expires: number;
}

export class ApiRequest extends IncomingMessage {
	public query: Record<string, string | string[]> = {};
	public params: Record<string, string> = {};
	public body?: unknown;
	public auth?: UserAuthObject;
}
