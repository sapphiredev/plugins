export * from './lib/statcord';

import type { StatcordOptions } from './lib/types';

declare module 'discord.js' {
	export interface ClientOptions {
		statcord?: StatcordOptions;
	}
}
