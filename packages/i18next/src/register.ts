import { Plugin, preGenericsInitialization, preLogin, SapphireClient } from '@sapphire/framework';
import { I18nextHandler, I18nextClient, I18nextClientOptions } from './index';

export class I18nextPlugin extends Plugin {
	public static [preGenericsInitialization](this: I18nextClient, options: I18nextClientOptions): void {
		this.i18n = new I18nextHandler(options.i18n);

		this.fetchLanguage = options.fetchLanguage ?? (() => null);
	}

	public static async [preLogin](this: SapphireClient): Promise<void> {
		await this.i18n.init();
	}
}

declare module '@sapphire/framework' {
	export interface SapphireClient extends I18nextClient {}

	export interface SapphireClientOptions extends I18nextClientOptions {}
}

SapphireClient.plugins.registerPostInitializationHook(I18nextPlugin[preGenericsInitialization], 'I18next-PreGenericsInitialization');
SapphireClient.plugins.registerPreLoginHook(I18nextPlugin[preLogin], 'I18next-PreLogin');
