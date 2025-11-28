import { Plugin, postInitialization, SapphireClient } from '@sapphire/framework';
import { loadListeners } from './index';

/**
 * @since 1.0.0
 */
export class EditableCommandsPlugin extends Plugin {
	/**
	 * @since 1.0.0
	 */
	public static override [postInitialization](this: SapphireClient): void {
		loadListeners();
	}
}

SapphireClient.plugins.registerPostInitializationHook(EditableCommandsPlugin[postInitialization], 'EditableCommands-PostInitialization');
