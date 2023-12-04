import type { Utilities } from './lib/Utilities';
import type { UtilitiesStore } from './lib/UtilitiesStore';

export * from './lib/Utilities';
export * from './lib/UtilitiesStore';
export * from './lib/Utility';

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

/**
 * The [@sapphire/plugin-utilities-store](https://github.com/sapphiredev/plugins/blob/main/packages/utilities-store) version that you are currently using.
 * An example use of this is showing it of in a bot information command.
 *
 * Note to Sapphire developers: This needs to explicitly be `string` so it is not typed as the string that gets replaced by esbuild
 */
// eslint-disable-next-line @typescript-eslint/no-inferrable-types
export const version: string = '[VI]{{inject}}[/VI]';
