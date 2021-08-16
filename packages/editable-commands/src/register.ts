import { Plugin, postInitialization, SapphireClient } from '@sapphire/framework';
import { join } from 'path';

/**
 * @since 1.0.0
 */
export class EditableCommandsPlugin extends Plugin {
	/**
	 * @since 1.0.0
	 */
	public static [postInitialization](this: SapphireClient): void {
		this.stores.get('listeners').registerPath(join(__dirname, 'listeners'));
	}
}

SapphireClient.plugins.registerPostInitializationHook(EditableCommandsPlugin[postInitialization], 'EditableCommands-PostInitialization');
