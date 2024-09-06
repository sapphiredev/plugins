import { container } from '@sapphire/pieces';
import { PluginListener as PluginRouteError } from './PluginRouteError';
import { PluginListener as PluginServerMiddlewareError } from './PluginServerMiddlewareError';
import { PluginListener as PluginServerMiddlewareSuccess } from './PluginServerMiddlewareSuccess';
import { PluginListener as PluginServerRequest } from './PluginServerRequest';
import { PluginListener as PluginServerRouterBranchMethodNotAllowed } from './PluginServerRouterBranchMethodNotAllowed';
import { PluginListener as PluginServerRouterBranchNotFound } from './PluginServerRouterBranchNotFound';
import { PluginListener as PluginServerRouterFound } from './PluginServerRouterFound';

export function loadListeners() {
	const store = 'listeners';
	void container.stores.loadPiece({ name: 'PluginRouteError', piece: PluginRouteError, store });
	void container.stores.loadPiece({ name: 'PluginServerMiddlewareError', piece: PluginServerMiddlewareError, store });
	void container.stores.loadPiece({ name: 'PluginServerMiddlewareSuccess', piece: PluginServerMiddlewareSuccess, store });
	void container.stores.loadPiece({ name: 'PluginServerRequest', piece: PluginServerRequest, store });
	void container.stores.loadPiece({ name: 'PluginServerRouterBranchMethodNotAllowed', piece: PluginServerRouterBranchMethodNotAllowed, store });
	void container.stores.loadPiece({ name: 'PluginServerRouterBranchNotFound', piece: PluginServerRouterBranchNotFound, store });
	void container.stores.loadPiece({ name: 'PluginServerRouterFound', piece: PluginServerRouterFound, store });
}
