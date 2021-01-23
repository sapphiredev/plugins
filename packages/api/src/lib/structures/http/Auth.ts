import { createCipheriv, createDecipheriv, randomBytes } from 'crypto';
import type { Snowflake } from 'discord-api-types/v8';

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

	// eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
	#secret: string;

	private constructor(options: ServerOptionsAuth) {
		this.id = options.id as Snowflake;
		this.cookie = options.cookie ?? 'SAPPHIRE_AUTH';
		this.scopes = options.scopes ?? ['identify'];
		this.redirect = options.redirect;
		this.#secret = options.secret;
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
			return JSON.parse(decipher.update(data, 'base64', 'utf8') + decipher.final('utf8'));
		} catch {
			return null;
		}
	}

	public static create(options?: ServerOptionsAuth): Auth | null {
		if (!options?.secret || !options.id) return null;
		return new Auth(options);
	}
}

export interface AuthData {
	id: string;
	expires: number;
	refresh: string;
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
}
