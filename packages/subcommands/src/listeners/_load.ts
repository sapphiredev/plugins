import { container } from '@sapphire/pieces';
import { PluginListener as PluginChatInputSubcommandError } from './PluginChatInputSubcommandError';
import { PluginListener as PluginChatInputSubcommandNoMatch } from './PluginChatInputSubcommandNoMatch';
import { PluginListener as PluginMessageSubcommandError } from './PluginMessageSubcommandError';
import { PluginListener as PluginMessageSubcommandNoMatch } from './PluginMessageSubcommandNoMatch';
import { PluginListener as PluginSubcommandMappingIsMissingChatInputCommandHandler } from './PluginSubcommandMappingIsMissingChatInputCommandHandler';
import { PluginListener as PluginSubcommandMappingIsMissingMessageCommandHandler } from './PluginSubcommandMappingIsMissingMessageCommandHandler';

export function loadListeners() {
	const store = 'listeners' as const;
	void container.stores.loadPiece({ name: 'PluginChatInputSubcommandError', piece: PluginChatInputSubcommandError, store });
	void container.stores.loadPiece({ name: 'PluginMessageSubcommandError', piece: PluginMessageSubcommandError, store });
	void container.stores.loadPiece({
		name: 'PluginSubcommandMappingIsMissingChatInputCommandHandler',
		piece: PluginSubcommandMappingIsMissingChatInputCommandHandler,
		store
	});
	void container.stores.loadPiece({
		name: 'PluginSubcommandMappingIsMissingMessageCommandHandler',
		piece: PluginSubcommandMappingIsMissingMessageCommandHandler,
		store
	});
	void container.stores.loadPiece({
		name: 'PluginMessageSubcommandNoMatch',
		piece: PluginMessageSubcommandNoMatch,
		store
	});
	void container.stores.loadPiece({
		name: 'PluginChatInputSubcommandNoMatch',
		piece: PluginChatInputSubcommandNoMatch,
		store
	});
}
