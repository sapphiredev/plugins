import { URLSearchParams } from 'url';
import { MediaParser } from '../lib/structures/MediaParser';
import type { MimeType } from '../lib/utils/MimeType';

export class PluginMediaParser extends MediaParser {
	public constructor(context: MediaParser.LoaderContext) {
		super(context, { name: 'application/x-www-form-urlencoded' satisfies MimeType });
	}

	public override async run(request: MediaParser.Request): Promise<unknown> {
		const body = await this.readString(request);
		return body.length === 0 ? null : Object.fromEntries(new URLSearchParams(body).entries());
	}
}
