import { Plugin, preInitialization, SapphireClient } from '@sapphire/framework';
import { join } from 'path';

/**
 * @since 1.0.0
 */
export class EditableCommandsPlugin extends Plugin {
	/**
	 * @since 1.0.0
	 */
	public static [preInitialization](this: SapphireClient): void {
		this.stores.get('listeners').registerPath(join(__dirname, 'listeners'));
	}
}

SapphireClient.plugins.registerPreInitializationHook(EditableCommandsPlugin[preInitialization], 'EditableCommands-PreInitialization');
