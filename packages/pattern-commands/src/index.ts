import 'tslib';

import type { PatternCommandStore } from './lib/structures/PaternCommandStore';

export * from './lib/structures/PaternCommandStore';
export * from './lib/structures/PatternCommand';
export * from './lib/utils/PaternCommandEvents';
export * from './lib/utils/PatternCommandInterfaces';
export { CommandAcceptedListener as PluginPatternCommandsCommandAcceptedListener } from './listeners/PluginCommandAccepted';
export { MessageParseListener as PluginPatternCommandsMessageParseListener } from './listeners/PluginMessageParse';
export { PreCommandRunListener as PluginPatternCommandsPreCommandRunListener } from './listeners/PluginPreCommandRun';

declare module '@sapphire/pieces' {
	interface StoreRegistryEntries {
		'pattern-commands': PatternCommandStore;
	}
}
