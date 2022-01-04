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

			chokidar.watch('.').on('change', (path, _stats) => {
				this.logger.info(`File ${path} has been changed.`);
				this.logger.info('Reloading...');
				const commands = this.stores.get('commands');
				this.logger.info(`Cached commands: ${commands.size}`);
				for (const command of commands.values()) {
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
