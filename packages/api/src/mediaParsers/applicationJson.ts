import type { PieceContext } from '@sapphire/pieces';
import type { ApiRequest } from '../lib/structures/api/ApiRequest';
import { MediaParser } from '../lib/structures/MediaParser';
import { MimeTypes } from '../lib/utils/MimeTypes';

export class PluginMediaParser extends MediaParser {
	public constructor(context: PieceContext) {
		super(context, { name: MimeTypes.ApplicationJson });
	}

	public async run(request: ApiRequest): Promise<unknown> {
		const body = await this.readString(request);
		return body.length === 0 ? null : JSON.parse(body);
	}
}
