import './index';

import { Plugin, preGenericsInitialization, SapphireClient } from '@sapphire/framework';
import type { ClientOptions } from 'discord.js';
import { Logger } from './index';

/**
 * @since 1.0.0
 */
export class LoggerPlugin extends Plugin {
	/**
	 * @since 1.0.0
	 */
	public static [preGenericsInitialization](this: SapphireClient, options: ClientOptions): void {
		options.logger ??= {};
		options.logger.instance = new Logger(options.logger);
	}
}

SapphireClient.plugins.registerPreGenericsInitializationHook(LoggerPlugin[preGenericsInitialization], 'Logger-PreGenericsInitialization');
