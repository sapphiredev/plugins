import type { PieceContext } from '@sapphire/pieces';
import type { RESTPostOAuth2AccessTokenResult, RESTPostOAuth2AccessTokenURLEncodedData } from 'discord-api-types/v8';
import fetch from 'node-fetch';
import { stringify } from 'querystring';
import type { ApiRequest } from '../../lib/structures/api/ApiRequest';
import type { ApiResponse } from '../../lib/structures/api/ApiResponse';
import { HttpCodes } from '../../lib/structures/http/HttpCodes';
import { methods } from '../../lib/structures/http/HttpMethods';
import { Route } from '../../lib/structures/Route';

export class PluginRoute extends Route {
	private readonly scopes: readonly string[];
	private readonly scopeString: string;
	private readonly redirectUri: string | undefined;

	public constructor(context: PieceContext) {
		super(context, { route: 'oauth/callback' });

		const { server } = this.context;
		this.enabled = server.auth !== null;
		this.scopes = server.auth?.scopes ?? ['identify'];
		this.scopeString = this.scopes.join(' ');
		this.redirectUri = server.auth?.redirect;
	}

	public async [methods.POST](request: ApiRequest, response: ApiResponse) {
		const body = request.body as OAuth2BodyData;
		if (typeof body?.code !== 'string') {
			return response.badRequest();
		}

		const value = await this.fetchAuth(body);
		if (value === null) {
			return response.status(HttpCodes.InternalServerError).json({ error: 'Failed to fetch the token.' });
		}

		const now = Date.now();
		const auth = this.context.server.auth!;
		const data = await auth.fetchData(value.access_token);
		if (!data.user) {
			return response.status(HttpCodes.InternalServerError).json({ error: 'Failed to fetch the user.' });
		}

		const token = auth.encrypt({
			id: data.user.id,
			expires: now + value.expires_in,
			refresh: value.refresh_token,
			token: value.access_token
		});

		response.cookies.add(auth.cookie, token, { maxAge: value.expires_in });
		return response.json(data);
	}

	private async fetchAuth(body: OAuth2BodyData) {
		const { id, secret } = this.context.server.auth!;

		const data: RESTPostOAuth2AccessTokenURLEncodedData = {
			/* eslint-disable @typescript-eslint/naming-convention */
			client_id: id,
			client_secret: secret,
			code: body.code,
			grant_type: 'authorization_code',
			scope: this.scopeString,
			redirect_uri: this.redirectUri ?? body.redirectUri
			/* eslint-enable @typescript-eslint/naming-convention */
		};

		const result = await fetch('https://discord.com/api/v8/oauth2/token', {
			method: 'POST',
			body: stringify(data as any),
			headers: {
				'content-type': 'application/x-www-form-urlencoded'
			}
		});

		const json = await result.json();
		if (result.ok) return json as RESTPostOAuth2AccessTokenResult;

		this.context.client.logger.error(json);
		return null;
	}
}

/**
 * The OAuth2 body data sent to the callback.
 * @since 1.2.0
 */
export interface OAuth2BodyData {
	/**
	 * The code sent by the client.
	 * @since 1.2.0
	 */
	code: string;

	/**
	 * The client's ID.
	 * @since 1.2.0
	 */
	clientId: string;

	/**
	 * The redirect URI.
	 * @since 1.2.0
	 */
	redirectUri: string;
}
