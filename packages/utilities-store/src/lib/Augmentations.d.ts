/**
 * ================================================
 * | THIS IS FOR TYPEDOC. DO NOT REMOVE THIS FILE |
 * ================================================
 */

import type { Utilities } from '../index';
import type { UtilitiesStore } from './UtilitiesStore';

declare module '@sapphire/framework' {
	interface StoreRegistryEntries {
		utilities: UtilitiesStore;
	}
}

declare module '@sapphire/pieces' {
	interface Container {
		utilities: Utilities;
	}
}
