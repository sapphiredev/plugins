import type { Utilities } from './lib/Utilities';
import type { UtilitiesStore } from './lib/UtilitiesStore';

export * from './lib/Utilities';
export * from './lib/UtilitiesStore';
export * from './lib/UtilityFunction';

export interface UtilitiesFunctions {}

declare module 'discord.js' {
	export interface Client {
		utilities: Utilities;
	}
}

declare module '@sapphire/pieces' {
	interface StoreRegistryEntries {
		utilities: UtilitiesStore;
	}

	interface Container {
		utilities: Utilities;
	}
}
