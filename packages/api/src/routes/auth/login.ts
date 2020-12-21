/* eslint-disable @typescript-eslint/naming-convention */
import type { PieceContext } from '@sapphire/pieces';
import type { APIUser, RESTPostOAuth2AccessTokenResult, RESTPostOAuth2AccessTokenURIEncodedData } from 'discord-api-types/v8';
import fetch from 'node-fetch';
import { stringify } from 'querystring';
import type { ApiRequest } from '../../lib/structures/api/ApiRequest';
import type { ApiResponse } from '../../lib/structures/api/ApiResponse';
import { HttpCodes } from '../../lib/structures/http/HttpCodes';
import { methods } from '../../lib/structures/http/HttpMethods';
import { Route } from '../../lib/structures/Route';

export class PluginRoute extends Route {
	public constructor(context: PieceContext) {
		super(context);
		this.enabled = this.client.server.auth !== null;
	}

	public async [methods.POST](request: ApiRequest, response: ApiResponse) {
		const body = request.body as Record<string, string>;
		if (typeof body?.code !== 'string') {
			return response.badRequest();
		}

		const value = await this.fetchAuth(body.code);
		if (value === null) {
			return response.status(HttpCodes.InternalServerError).json({ error: 'Failed to fetch the token.' });
		}

		const user = await this.fetchUser(value.access_token);
		if (user === null) {
			return response.status(HttpCodes.InternalServerError).json({ error: 'Failed to fetch the user.' });
		}

		const auth = this.client.server.auth!;
		const token = auth.encrypt({
			id: user.id,
			expires: value.expires_in,
			refresh: value.refresh_token,
			token: value.access_token
		});

		response.cookies.add(auth.cookie, token, { maxAge: value.expires_in });
		return response.json({ user });
	}

	private async fetchAuth(code: string) {
		const data: RESTPostOAuth2AccessTokenURIEncodedData = {
			client_id: this.client.server.auth!.id,
			client_secret: this.client.server.auth!.secret,
			code,
			grant_type: 'authorization_code',
			scope: 'identify',
			redirect_uri: undefined
		};

		const result = await fetch('https://discord.com/api/v8/oauth2/token', {
			method: 'POST',
			body: stringify(data as any),
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		});

		return result.ok ? ((await result.json()) as RESTPostOAuth2AccessTokenResult) : null;
	}

	private async fetchUser(token: string) {
		const result = await fetch('https://discord.com/api/v8/users/@me', {
			headers: {
				Authorization: `Bearer ${token}`
			}
		});

		return result.ok ? ((await result.json()) as APIUser) : null;
	}
}
