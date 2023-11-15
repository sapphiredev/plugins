import { container } from '@sapphire/pieces';
import { PluginMediaParser as PluginApplicationFormUrlEncoded } from './applicationFormUrlEncoded';
import { PluginMediaParser as PluginApplicationJson } from './applicationJson';
import { PluginMediaParser as PluginTextPlain } from './textPlain';

export function loadMediaParsers() {
	const store = 'mediaParsers' as const;
	void container.stores.loadPiece({ name: 'applicationFormUrlEncoded', piece: PluginApplicationFormUrlEncoded, store });
	void container.stores.loadPiece({ name: 'applicationJson', piece: PluginApplicationJson, store });
	void container.stores.loadPiece({ name: 'textPlain', piece: PluginTextPlain, store });
}
