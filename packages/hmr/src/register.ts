<<<<<<< HEAD
=======
import { Piece, Plugin, postLogin, SapphireClient, Store } from '@sapphire/framework';
import chokidar from 'chokidar';
import { relative } from 'path';

/**
 * @since 1.0.0
 */
export class HmrPlugin extends Plugin {
	/**
	 * @since 1.0.0
	 */
	public static [postLogin](this: SapphireClient): void {
		if (process.env.NODE_ENV !== 'development') return;
		this.logger.info('HMR is enabled!');
		for (const store of this.stores.values()) {
			const deleteCb = handlePiecePathDelete.bind(null, store);
			const updateCb = handlePiecePathUpdate.bind(null, store);

			chokidar
				.watch([...store.paths])
				.on('change', updateCb)
				.on('unlink', deleteCb);
		}
	}
}

async function handlePiecePathDelete(store: Store<Piece>, path: string) {
	if (!store.strategy.filter(path)) return;

	const pieceToDelete = store.find((piece) => piece.location.full === path);
	if (!pieceToDelete) return;

	const { logger } = store.container;
	try {
		await pieceToDelete.unload();
		logger.info(`[HMR] Unloaded ${pieceToDelete.name}`);
	} catch (error) {
		logger.error(`[HMR] Failed to unload ${pieceToDelete.name}`, error);
	}
}

async function handlePiecePathUpdate(store: Store<Piece>, path: string) {
	if (!store.strategy.filter(path)) return;

	const pieceToUpdate = store.find((piece) => piece.location.full === path);

	if (pieceToUpdate) {
		const { logger } = store.container;
		try {
			await pieceToUpdate.reload();
			logger.info(`[HMR] reloaded ${pieceToUpdate.name}`);
		} catch (error) {
			logger.error(`[HMR] Failed to reload ${pieceToUpdate.name}`, error);
		}
	} else {
		const { logger } = store.container;
		try {
			const rootPath = [...store.paths].find((storePath) => path.startsWith(storePath));
			if (!rootPath) throw new Error(`[HMR] Could not find root path for ${path}`);
			const subPath = relative(rootPath, path);

			const commandsLoaded = await store.load(rootPath, subPath);
			const commandsLoadedNames = commandsLoaded.map((piece) => piece.name);
			logger.info(`[HMR] Loaded ${commandsLoadedNames.join(', ')}`);
		} catch (error) {
			logger.error(`[HMR] Failed to load ${path}`, error);
		}
	}
}

>>>>>>> d90de441 (hmr: type changes and reformat)
SapphireClient.plugins.registerPostLoginHook(HmrPlugin[postLogin], 'Hmr-PostLogin');
