import { MediaParser } from '../lib/structures/MediaParser';
import type { MimeType } from '../lib/utils/MimeType';

export class PluginMediaParser extends MediaParser {
	public constructor(context: MediaParser.LoaderContext) {
		super(context, { name: 'application/json' satisfies MimeType });
	}

	public override async run(request: MediaParser.Request): Promise<unknown> {
		const body = await this.readString(request);
		return body.length === 0 ? null : JSON.parse(body);
	}
}
