import { container } from '@sapphire/pieces';
import { PluginListener as PluginScheduledTaskError } from './PluginScheduledTaskError';
import { PluginListener as PluginScheduledTaskNotFound } from './PluginScheduledTaskNotFound';
import { PluginListener as PluginScheduledTaskStrategyConnectError } from './PluginScheduledTaskStrategyConnectError';

export function loadListeners() {
	const store = 'listeners' as const;
	void container.stores.loadPiece({ name: 'PluginScheduledTaskError', piece: PluginScheduledTaskError, store });
	void container.stores.loadPiece({ name: 'PluginScheduledTaskNotFound', piece: PluginScheduledTaskNotFound, store });
	void container.stores.loadPiece({ name: 'PluginScheduledTaskStrategyConnectError', piece: PluginScheduledTaskStrategyConnectError, store });
}
