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
