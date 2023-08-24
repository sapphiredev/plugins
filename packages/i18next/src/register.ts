import { Plugin, SapphireClient, container, postLogin, preGenericsInitialization, preLogin } from '@sapphire/framework';
import { watch } from 'chokidar';
import type { ClientOptions } from 'discord.js';

import { InternationalizationHandler } from './index';

export class I18nextPlugin extends Plugin {
	public static [preGenericsInitialization](this: SapphireClient, options: ClientOptions): void {
		container.i18n = new InternationalizationHandler(options.i18n);
	}

	public static async [preLogin](this: SapphireClient): Promise<void> {
		await container.i18n.init();
	}

	public static [postLogin](this: SapphireClient): void {
		if (this.options.i18n?.hmr?.enabled) {
			container.logger.info('[i18next-Plugin]: HMR enabled. Watching for languages changes.');
			const hmr = watch(container.i18n.languagesDirectory, this.options.i18n.hmr.options);

			for (const event of ['change', 'unlink']) hmr.on(event, () => container.i18n.reloadResources());
		}
	}
}

SapphireClient.plugins.registerPostInitializationHook(I18nextPlugin[preGenericsInitialization], 'I18next-PreGenericsInitialization');
SapphireClient.plugins.registerPreLoginHook(I18nextPlugin[preLogin], 'I18next-PreLogin');
SapphireClient.plugins.registerPostLoginHook(I18nextPlugin[postLogin], 'I18next-PostLogin');
