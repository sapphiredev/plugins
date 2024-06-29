import { MediaParser } from '../lib/structures/MediaParser';
import { MimeTypes } from '../lib/utils/MimeTypes';

export class PluginMediaParser extends MediaParser {
	public constructor(context: MediaParser.LoaderContext) {
		super(context, { name: MimeTypes.TextPlain });
	}

	public override async run(request: MediaParser.Request): Promise<unknown> {
		const body = await this.readString(request);
		return body.length === 0 ? null : body;
	}
}
