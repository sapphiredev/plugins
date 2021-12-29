import type { PatternCommandStore } from './lib/structures/PaternCommandStore';

export * from './lib/structures/PaternCommandStore';
export * from './lib/structures/PatternCommand';
export * from './lib/utils/PaternCommandEvents';
export * from './lib/utils/PatternCommandInterfaces';
export * as PatternCommandListeners from './listeners';

declare module '@sapphire/pieces' {
	interface StoreRegistryEntries {
		'pattern-commands': PatternCommandStore;
	}
}
