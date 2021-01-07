import { Store } from '@sapphire/pieces';
import { MediaParser } from './MediaParser';

/**
 * @since 1.3.0
 */
export class MediaParserStore extends Store<MediaParser> {
	public constructor() {
		super(MediaParser as any, { name: 'mediaParsers' });
	}

	/**
	 * Parses a content type by getting the relevant information inside.
	 * @since 1.3.0
	 * @param contentType The content type to parse.
	 */
	public parseContentType(contentType: string): string {
		const index = contentType.indexOf(';');
		return index === -1 ? contentType : contentType.slice(0, index);
	}
}
