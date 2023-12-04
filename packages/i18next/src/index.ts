import type { InternationalizationHandler } from './lib/InternationalizationHandler';
import type { InternationalizationClientOptions } from './lib/types';

export { default as i18next, type TFunction, type TOptions } from 'i18next';
export * from './lib/InternationalizationHandler';
export * from './lib/functions';
export * from './lib/types';

declare module '@sapphire/pieces' {
	interface Container {
		i18n: InternationalizationHandler;
	}
}

declare module 'discord.js' {
	export interface ClientOptions extends InternationalizationClientOptions {}
}

/**
 * The [@sapphire/plugin-i18next](https://github.com/sapphiredev/plugins/blob/main/packages/i18next) version that you are currently using.
 * An example use of this is showing it of in a bot information command.
 *
 * Note to Sapphire developers: This needs to explicitly be `string` so it is not typed as the string that gets replaced by esbuild
 */
// eslint-disable-next-line @typescript-eslint/no-inferrable-types
export const version: string = '[VI]{{inject}}[/VI]';
