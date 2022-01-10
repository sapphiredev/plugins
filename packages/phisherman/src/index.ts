export * from './lib/Phisherman';
export * from './lib/PhishermanEvents';
export type { CheckReturnType, PhishermanOptions, PhishermanReportType, PhishermanReturnType } from './lib/PhishermanTypes';

import type { Phisherman } from './lib/Phisherman';
import type { PhishermanOptions } from './lib/PhishermanTypes';

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
