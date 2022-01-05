import { Plugin, postLogin, SapphireClient } from '@sapphire/framework';
import { start } from './index';

/**
 * @since 1.0.0
 */
export class HmrPlugin extends Plugin {
	/**
	 * @since 1.0.0
	 */
	public static [postLogin](this: SapphireClient): void {
		start();
	}
}

SapphireClient.plugins.registerPostLoginHook(HmrPlugin[postLogin], 'Hmr-PostLogin');
