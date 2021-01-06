import { Store } from '@sapphire/pieces';
import { MediaParser } from './MediaParser';

/**
 * @since 1.3.0
 */
export class MediaParserStore extends Store<MediaParser> {
	public constructor() {
		super(MediaParser as any, { name: 'mediaParsers' });
	}
}
