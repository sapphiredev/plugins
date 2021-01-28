import { Awaited, isThenable } from '@sapphire/utilities';
import { createCipheriv, createDecipheriv, randomBytes } from 'crypto';
import type {
	RESTGetAPICurrentUserConnectionsResult,
	RESTGetAPICurrentUserGuildsResult,
	RESTGetAPICurrentUserResult,
	Snowflake
} from 'discord-api-types/v8';
import fetch from 'node-fetch';

export class Auth {
	/**
	 * The client's application id, this can be retrieved in Discord Developer Portal at https://discord.com/developers/applications.
	 * @since 1.0.0
	 */
	public id: Snowflake;

	/**
	 * The name for the cookie, this will be used to identify a Secure HttpOnly cookie.
	 * @since 1.0.0
	 */
	public cookie: string;

	/**
	 * The scopes defined at https://discord.com/developers/docs/topics/oauth2#shared-resources-oauth2-scopes.
	 * @since 1.0.0
	 */
	public scopes: readonly string[];

	/**
	 * The redirect uri.
	 * @since 1.0.0
	 */
	public redirect: string | undefined;

	/**
	 * The transformers used for [[Auth.fetchData]].
	 * @since 1.4.0
	 */
	public transformers: LoginDataTransformer[];

	// eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
	#secret: string;

	private constructor(options: ServerOptionsAuth) {
		this.id = options.id as Snowflake;
		this.cookie = options.cookie ?? 'SAPPHIRE_AUTH';
		this.scopes = options.scopes ?? ['identify'];
		this.redirect = options.redirect;
		this.#secret = options.secret;
		this.transformers = options.transformers ?? [];
	}

	/**
	 * The client secret, this can be retrieved in Discord Developer Portal at https://discord.com/developers/applications.
	 * @since 1.0.0
	 */
	public get secret() {
		return this.#secret;
	}

	/**
	 * Encrypts an object with aes-256-cbc to use as a token.
	 * @since 1.0.0
	 * @param data An object to encrypt
	 * @param secret The secret to encrypt the data with
	 */
	public encrypt(data: AuthData): string {
		const iv = randomBytes(16);
		const cipher = createCipheriv('aes-256-cbc', this.#secret, iv);
		return `${cipher.update(JSON.stringify(data), 'utf8', 'base64') + cipher.final('base64')}.${iv.toString('base64')}`;
	}

	/**
	 * Decrypts an object with aes-256-cbc to use as a token.
	 * @since 1.0.0
	 * @param token An data to decrypt
	 * @param secret The secret to decrypt the data with
	 */
	public decrypt(token: string): AuthData | null {
		const [data, iv] = token.split('.');
		const decipher = createDecipheriv('aes-256-cbc', this.#secret, Buffer.from(iv, 'base64'));

		try {
			const parsed = JSON.parse(decipher.update(data, 'base64', 'utf8') + decipher.final('utf8')) as AuthData;
			// If the token expired, return null:
			return parsed.expires >= Date.now() ? parsed : null;
		} catch {
			return null;
		}
	}

	/**
	 * Retrieves the data for a specific user.
	 * @since 1.4.0
	 * @param token The access token from the user.
	 */
	public async fetchData(token: string): Promise<LoginData> {
		// Fetch the information:
		const [user, guilds, connections] = await Promise.all([
			this.fetchInformation<RESTGetAPICurrentUserResult>('identify', token, 'https://discord.com/api/v8/users/@me'),
			this.fetchInformation<RESTGetAPICurrentUserGuildsResult>('guilds', token, 'https://discord.com/api/v8/users/@me/guilds'),
			this.fetchInformation<RESTGetAPICurrentUserConnectionsResult>('connections', token, 'https://discord.com/api/v8/users/@me/connections')
		]);

		// Transform the information:
		let data: LoginData = { user, guilds, connections };
		for (const transformer of this.transformers) {
			const result = transformer(data);
			if (isThenable(result)) data = await result;
			else data = result as LoginData;
		}

		return data;
	}

	private async fetchInformation<T>(scope: string, token: string, url: string): Promise<T | null | undefined> {
		if (!this.scopes.includes(scope)) return undefined;

		const result = await fetch(url, {
			headers: {
				authorization: `Bearer ${token}`
			}
		});

		return result.ok ? ((await result.json()) as T) : null;
	}

	public static create(options?: ServerOptionsAuth): Auth | null {
		if (!options?.secret || !options.id) return null;
		return new Auth(options);
	}
}

/**
 * Defines the authentication data, this is to be encrypted and decrypted by the server.
 * @since 1.0.0
 */
export interface AuthData {
	/**
	 * The user ID.
	 * @since 1.0.0
	 */
	id: string;

	/**
	 * The timestamp at which the token expires.
	 * @since 1.0.0
	 */
	expires: number;

	/**
	 * The refresh token.
	 * @since 1.0.0
	 */
	refresh: string;

	/**
	 * The access token.
	 * @since 1.0.0
	 */
	token: string;
}

/**
 * Defines the authentication options.
 * @since 1.0.0
 */
export interface ServerOptionsAuth {
	/**
	 * The client's application id, this can be retrieved in Discord Developer Portal at https://discord.com/developers/applications.
	 * @since 1.0.0
	 */
	id: string;

	/**
	 * The name for the cookie, this will be used to identify a Secure HttpOnly cookie.
	 * @since 1.0.0
	 * @default 'SAPPHIRE_AUTH'
	 */
	cookie?: string;

	/**
	 * The client secret, this can be retrieved in Discord Developer Portal at https://discord.com/developers/applications.
	 * @since 1.0.0
	 */
	secret: string;

	/**
	 * The scopes defined at https://discord.com/developers/docs/topics/oauth2#shared-resources-oauth2-scopes.
	 * @since 1.0.0
	 * @default ['identify']
	 */
	scopes?: string[];

	/**
	 * The redirect uri. This will default to [[OAuth2BodyData.redirectUri]] if missing.
	 * @since 1.0.0
	 */
	redirect?: string;

	/**
	 * The login data transformers used for [[Auth.fetchData]].
	 * @since 1.4.0
	 * @default []
	 */
	transformers?: LoginDataTransformer[];
}

/**
 * The login data sent when fetching data from a user.
 * @since 1.4.0
 */
export interface LoginData {
	/**
	 * The user data, defined when the `'identify'` scope is defined.
	 * @since 1.4.0
	 */
	user?: RESTGetAPICurrentUserResult | null;

	/**
	 * The guilds data, defined when the `'guilds'` scope is defined.
	 * @since 1.4.0
	 */
	guilds?: RESTGetAPICurrentUserGuildsResult | null;

	/**
	 * The connections data, defined when the `'connections'` scope is defined.
	 * @since 1.4.0
	 */
	connections?: RESTGetAPICurrentUserConnectionsResult | null;
}

/**
 * A login data transformer.
 * @since 1.4.0
 */
export interface LoginDataTransformer<T extends LoginData = LoginData> {
	/**
	 * Transforms the object by mutating its properties or adding new ones.
	 * @since 1.4.0
	 */
	(data: LoginData): Awaited<T>;
}
