import type { InternationalizationClientOptions } from '../src';
import type { InternationalizationHandler } from '../src/lib/InternationalizationHandler';

declare module '@sapphire/pieces' {
	interface Container {
		client: any; // Client type doesn't really matter for tests but needs to be there for the type checker
		i18n: InternationalizationHandler;
	}
}

declare module 'discord.js' {
	export interface ClientOptions extends InternationalizationClientOptions {}
}
