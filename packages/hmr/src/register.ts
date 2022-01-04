import { Plugin, postInitialization, SapphireClient } from '@sapphire/framework';
import chokidar from 'chokidar';
import { basename } from 'path';

/**
 * @since 1.0.0
 */
export class HmrPlugin extends Plugin {
	/**
	 * @since 1.0.0
	 */
	public static [postInitialization](this: SapphireClient): void {
		if (process.env.NODE_ENV === 'development') {
			this.logger.info('HMR is enabled!');

			chokidar.watch('.').on('change', (path, _stats) => {
				const filePureName = basename(path);

				const commands = this.stores.get('commands');
				for (const command of commands.values()) {
					const filePath = command.location.name;
					if (filePath !== filePureName) continue;

					command
						.reload()
						.then(() => this.logger.info(`Reloaded command ${command.name}`))
						.catch((err) => this.logger.error(err));
				}
			});
		}
	}
}

SapphireClient.plugins.registerPostInitializationHook(HmrPlugin[postInitialization], 'HmrCommands-PostInitialization');
