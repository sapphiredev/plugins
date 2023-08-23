import { URLSearchParams } from 'url';
import { MediaParser } from '../lib/structures/MediaParser';
import type { ApiRequest } from '../lib/structures/api/ApiRequest';
import { MimeTypes } from '../lib/utils/MimeTypes';

export class PluginMediaParser extends MediaParser {
	public constructor(context: MediaParser.Context) {
		super(context, { name: MimeTypes.ApplicationFormUrlEncoded });
	}

	public override async run(request: ApiRequest): Promise<unknown> {
		const body = await this.readString(request);
		return body.length === 0 ? null : Object.fromEntries(new URLSearchParams(body).entries());
	}
}
