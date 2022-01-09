import { container, Plugin, preGenericsInitialization, SapphireClient } from '@sapphire/framework';
import type { ClientOptions } from 'discord.js';
import { Phisherman } from '.';

export class PhishermanPlugin extends Plugin {
	public [preGenericsInitialization](this: SapphireClient, options: ClientOptions) {
		container.phisherman = new Phisherman(options.phisherman);
	}
}
