export * from './lib/hmr';

import type { HMROptions } from './lib/hmr';

declare module 'discord.js' {
	export interface ClientOptions {
		hmr?: HMROptions;
	}
}
