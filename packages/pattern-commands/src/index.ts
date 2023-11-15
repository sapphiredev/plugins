import type { PatternCommandStore } from './lib/structures/PaternCommandStore';

export * from './lib/structures/PaternCommandStore';
export * from './lib/structures/PatternCommand';
export * from './lib/utils/PaternCommandEvents';
export * from './lib/utils/PatternCommandInterfaces';
export { PluginListener as PluginPatternCommandsCommandAcceptedListener } from './listeners/PluginCommandAccepted';
export { PluginListener as PluginPatternCommandsMessageParseListener } from './listeners/PluginMessageParse';
export { PluginListener as PluginPatternCommandsPreCommandRunListener } from './listeners/PluginPreCommandRun';

declare module '@sapphire/pieces' {
	interface StoreRegistryEntries {
		'pattern-commands': PatternCommandStore;
	}
}
