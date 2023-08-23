import type { ApiRequest } from '../lib/structures/api/ApiRequest';
import { MediaParser } from '../lib/structures/MediaParser';
import { MimeTypes } from '../lib/utils/MimeTypes';

export class PluginMediaParser extends MediaParser {
	public constructor(context: MediaParser.Context) {
		super(context, { name: MimeTypes.TextPlain });
	}

	public override async run(request: ApiRequest): Promise<unknown> {
		const body = await this.readString(request);
		return body.length === 0 ? null : body;
	}
}
