import { container } from '@sapphire/pieces';
import { PluginListener as PluginScheduledTaskError } from './PluginScheduledTaskError';
import { PluginListener as PluginScheduledTaskNotFound } from './PluginScheduledTaskNotFound';
import { PluginListener as PluginScheduledTaskStrategyConnectError } from './PluginScheduledTaskStrategyConnectError';
import { PluginListener as PluginScheduledTaskStrategyClientError } from './PluginScheduledTaskStrategyClientError';
import { PluginListener as PluginScheduledTaskStrategyWorkerError } from './PluginScheduledTaskStrategyWorkerError';

export function loadListeners() {
	const store = 'listeners' as const;
	void container.stores.loadPiece({ name: 'PluginScheduledTaskError', piece: PluginScheduledTaskError, store });
	void container.stores.loadPiece({ name: 'PluginScheduledTaskNotFound', piece: PluginScheduledTaskNotFound, store });
	void container.stores.loadPiece({ name: 'PluginScheduledTaskStrategyConnectError', piece: PluginScheduledTaskStrategyConnectError, store });
	void container.stores.loadPiece({ name: 'PluginScheduledTaskStrategyClientError', piece: PluginScheduledTaskStrategyClientError, store });
	void container.stores.loadPiece({ name: 'PluginScheduledTaskStrategyWorkerError', piece: PluginScheduledTaskStrategyWorkerError, store });
}
