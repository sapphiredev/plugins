import { container } from '@sapphire/pieces';
import { PluginMiddleware as PluginAuth } from './auth';
import { PluginMiddleware as PluginBody } from './body';
import { PluginMiddleware as PluginCookies } from './cookies';
import { PluginMiddleware as PluginHeaders } from './headers';

export function loadMiddlewares() {
	const store = 'middlewares';
	void container.stores.loadPiece({ name: 'auth', piece: PluginAuth, store });
	void container.stores.loadPiece({ name: 'body', piece: PluginBody, store });
	void container.stores.loadPiece({ name: 'cookies', piece: PluginCookies, store });
	void container.stores.loadPiece({ name: 'headers', piece: PluginHeaders, store });
}
