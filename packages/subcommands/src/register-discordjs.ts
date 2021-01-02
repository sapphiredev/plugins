import type { SubCommandsPluginOptions } from './lib/utils/SubCommandsHandler';

import './register';

declare module 'discord.js' {
	export interface ClientOptions {
		subCommands?: SubCommandsPluginOptions;
	}
}
