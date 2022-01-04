import { ILogger, Piece, Plugin, postInitialization, SapphireClient } from '@sapphire/framework';
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

				const commands = this.stores.get('commands').values();
				reloadPieceList(commands, this.logger, filePureName);
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
			.then(() => logger.info(`Reloaded command ${piece.name}`))
			.catch((err) => logger.error(err));
	}
}

SapphireClient.plugins.registerPostInitializationHook(HmrPlugin[postInitialization], 'HmrCommands-PostInitialization');
