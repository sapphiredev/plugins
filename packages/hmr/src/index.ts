export * from './lib/hmr';

import type { HMROptions } from './lib/hmr';

declare module 'discord.js' {
	export interface ClientOptions {
		hmr?: HMROptions;
	}
}

/**
 * The [@sapphire/plugin-hmr](https://github.com/sapphiredev/plugins/blob/main/packages/hmr) version that you are currently using.
 * An example use of this is showing it of in a bot information command.
 *
 * Note to Sapphire developers: This needs to explicitly be `string` so it is not typed as the string that gets replaced by esbuild
 */
// eslint-disable-next-line @typescript-eslint/no-inferrable-types
export const version: string = '[VI]{{inject}}[/VI]';
