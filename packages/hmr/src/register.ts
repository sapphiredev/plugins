import { ILogger, Piece, Plugin, postInitialization, SapphireClient } from '@sapphire/framework';
import chokidar from 'chokidar';
import { basename, join } from 'path';

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

			const watcher = chokidar.watch('.', {
				ignoreInitial: true
			});

			watcher.on('change', (path, _stats) => {
				const fileName = basename(path);

				const commands = this.stores.get('commands').values();
				reloadPieceList(commands, this.logger, fileName);

				const listeners = this.stores.get('listeners').values();
				reloadPieceList(listeners, this.logger, fileName);

				const preconditions = this.stores.get('preconditions').values();
				reloadPieceList(preconditions, this.logger, fileName);

				if (path.endsWith('.js')) {
					const absolute_path = join(process.cwd(), path);
					import(absolute_path)
						.then((module) => {
							for (const [key, value] of Object.entries(module)) {
								this.logger.debug(`${key} - ${value}`);
							}
						})
						.catch((err) => this.logger.error(err));
				}
			});
		}
	}
}

function reloadPieceList<T extends Piece>(list: IterableIterator<T>, logger: ILogger, fileName: string): void {
	for (const piece of list) {
		const filePath = piece.location.name;
		if (filePath !== fileName) continue;

		piece
			.reload()
			.then(() => logger.info(`Reloaded piece ${piece.name}`))
			.catch((err) => logger.error(err));
	}
}

SapphireClient.plugins.registerPostInitializationHook(HmrPlugin[postInitialization], 'HmrCommands-PostInitialization');
