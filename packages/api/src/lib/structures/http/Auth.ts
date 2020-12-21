import type { SapphireClient } from '@sapphire/framework';
import { createCipheriv, createDecipheriv, randomBytes } from 'crypto';
import type { ApiOptionsAuth } from '../../Api';

export class Auth {
	public id: string;
	public cookie: string;

	// eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
	#secret: string;

	private constructor(id: string, cookie: string, secret: string) {
		this.id = id;
		this.cookie = cookie;
		this.#secret = secret;
	}

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
	public decrypt(token: string): AuthData {
		const [data, iv] = token.split('.');
		const decipher = createDecipheriv('aes-256-cbc', this.#secret, Buffer.from(iv, 'base64'));
		return JSON.parse(decipher.update(data, 'base64', 'utf8') + decipher.final('utf8'));
	}

	public static create(client: SapphireClient, options?: ApiOptionsAuth): Auth | null {
		if (!options?.secret) return null;

		const id = options.id ?? client.id ?? client.options.id;
		if (!id) return null;

		return new Auth(id, options.cookie ?? 'SAPPHIRE_AUTH', options.secret);
	}
}

export interface AuthData {
	id: string;
	expires: number;
	refresh: string;
	token: string;
}
