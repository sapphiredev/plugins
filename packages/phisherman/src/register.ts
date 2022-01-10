import { container, Plugin, preGenericsInitialization, SapphireClient } from '@sapphire/framework';
import type { ClientOptions } from 'discord.js';
import { Phisherman } from './lib/Phisherman';

export class PhishermanPlugin extends Plugin {
	public static async [preGenericsInitialization](this: SapphireClient, options: ClientOptions) {
		if (options.phisherman) {
			container.phisherman = new Phisherman(options.phisherman);

			await container.phisherman.init();
		}
	}
}

SapphireClient.plugins.registerPreGenericsInitializationHook(PhishermanPlugin[preGenericsInitialization], 'Phisherman-PreGenericsInitialization');
