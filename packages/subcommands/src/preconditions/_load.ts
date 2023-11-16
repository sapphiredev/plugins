import { container } from '@sapphire/pieces';
import { PluginPrecondition as PluginSubcommandCooldown } from './PluginSubcommandCooldown';

export function loadPreconditions() {
	const store = 'preconditions' as const;
	void container.stores.loadPiece({ name: 'PluginSubcommandCooldown', piece: PluginSubcommandCooldown, store });
}
