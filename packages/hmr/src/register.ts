import { ILogger, Piece, Plugin, postInitialization, SapphireClient, Store } from '@sapphire/framework';
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
				const fullPath = join(process.cwd(), path);
				const commands = this.stores.get('commands');
				reloadPieceList(commands, this.logger, fullPath);

				const listeners = this.stores.get('listeners');
				reloadPieceList(listeners, this.logger, fullPath);

				const preconditions = this.stores.get('preconditions');
				reloadPieceList(preconditions, this.logger, fullPath);

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

function reloadPieceList<T extends Piece>(list: Store<T>, logger: ILogger, fullLocation: string): void {
	const piece = list.find((piece) => piece.location.full === fullLocation);

	if (!piece) return;

	piece
		.reload()
		.then(() => {
			logger.info(`Reloaded ${basename(fullLocation)}`);
		})
		.catch((err) => {
			logger.error(err);
		});
}

SapphireClient.plugins.registerPostInitializationHook(HmrPlugin[postInitialization], 'HmrCommands-PostInitialization');
