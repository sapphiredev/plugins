export * from './lib/Phisherman';

import type { Phisherman, PhishermanOptions } from '.';

declare module '@sapphire/pieces' {
	interface Container {
		phisherman: Phisherman;
	}
}

declare module 'discord.js' {
	export interface ClientOptions {
		phisherman?: PhishermanOptions;
	}
}
