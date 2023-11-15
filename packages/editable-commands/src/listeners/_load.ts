import { container } from '@sapphire/pieces';
import { PluginListener as PluginMessageUpdate } from './PluginMessageUpdate';

export function loadListeners() {
	const store = 'listeners' as const;
	void container.stores.loadPiece({ name: 'PluginMessageUpdate', piece: PluginMessageUpdate, store });
}
