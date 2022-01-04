import { Plugin, postInitialization, SapphireClient } from '@sapphire/framework';
import chokidar from 'chokidar';

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

			chokidar.watch('.').on('change', async (path, _stats) => {
				this.logger.info(`File ${path} has been changed.`);
				this.logger.info('Reloading...');
				const cache = this.stores.get('commands');
				if (cache) {
					for (const [commandName, command] of cache) {
						this.logger.debug(`Reloading command ${commandName}`);
						await command.reload();
					}
				}
			});
		}
	}
}

SapphireClient.plugins.registerPostInitializationHook(HmrPlugin[postInitialization], 'HmrCommands-PostInitialization');
