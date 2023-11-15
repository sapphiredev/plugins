import { container } from '@sapphire/pieces';
import { PluginListener as PluginCommandAccepted } from './PluginCommandAccepted';
import { PluginListener as PluginMessageParse } from './PluginMessageParse';
import { PluginListener as PluginPreCommandRun } from './PluginPreCommandRun';

export function loadListeners() {
	const store = 'listeners' as const;
	void container.stores.loadPiece({ name: 'PluginCommandAccepted', piece: PluginCommandAccepted, store });
	void container.stores.loadPiece({ name: 'PluginMessageParse', piece: PluginMessageParse, store });
	void container.stores.loadPiece({ name: 'PluginPreCommandRun', piece: PluginPreCommandRun, store });
}
