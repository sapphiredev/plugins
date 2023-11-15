import { container } from '@sapphire/pieces';
import { PluginListener as PluginRouteError } from './PluginRouteError';
import { PluginListener as PluginServerMatch } from './PluginServerMatch';
import { PluginListener as PluginServerMiddlewareError } from './PluginServerMiddlewareError';
import { PluginListener as PluginServerMiddlewareSuccess } from './PluginServerMiddlewareSuccess';
import { PluginListener as PluginServerNoMatch } from './PluginServerNoMatch';
import { PluginListener as PluginServerRequest } from './PluginServerRequest';

export function loadListeners() {
	const store = 'listeners' as const;
	void container.stores.loadPiece({ name: 'PluginRouteError', piece: PluginRouteError, store });
	void container.stores.loadPiece({ name: 'PluginServerMatch', piece: PluginServerMatch, store });
	void container.stores.loadPiece({ name: 'PluginServerMiddlewareError', piece: PluginServerMiddlewareError, store });
	void container.stores.loadPiece({ name: 'PluginServerMiddlewareSuccess', piece: PluginServerMiddlewareSuccess, store });
	void container.stores.loadPiece({ name: 'PluginServerNoMatch', piece: PluginServerNoMatch, store });
	void container.stores.loadPiece({ name: 'PluginServerRequest', piece: PluginServerRequest, store });
}
