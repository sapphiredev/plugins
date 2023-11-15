import { container } from '@sapphire/pieces';
import { PluginRoute as PluginOAuthCallback } from './oauth/callback';
import { PluginRoute as PluginOAuthLogout } from './oauth/logout';

export function loadRoutes() {
	const store = 'routes' as const;
	void container.stores.loadPiece({ name: 'callback', piece: PluginOAuthCallback, store });
	void container.stores.loadPiece({ name: 'logout', piece: PluginOAuthLogout, store });
}
