import { container, Piece, Store } from '@sapphire/framework';
import { watch } from 'chokidar';
import { relative } from 'path';

export function start() {
	container.logger.info('HMR is enabled!');
	for (const store of container.stores.values()) {
		const deleteCb = handlePiecePathDelete.bind(null, store);
		const updateCb = handlePiecePathUpdate.bind(null, store);

		watch([...store.paths])
			.on('change', updateCb)
			.on('unlink', deleteCb);
	}
}

async function handlePiecePathDelete(store: Store<Piece>, path: string) {
	if (!store.strategy.filter(path)) return;

	const pieceToDelete = store.find((piece) => piece.location.full === path);
	if (!pieceToDelete) return;

	try {
		await pieceToDelete.unload();
		container.logger.info(`[HMR] Unloaded ${pieceToDelete.name}`);
	} catch (error) {
		container.logger.error(`[HMR] Failed to unload ${pieceToDelete.name}`, error);
	}
}

async function handlePiecePathUpdate(store: Store<Piece>, path: string) {
	if (!store.strategy.filter(path)) return;

	const pieceToUpdate = store.find((piece) => piece.location.full === path);
	if (pieceToUpdate) {
		try {
			await pieceToUpdate.reload();
			container.logger.info(`[HMR] reloaded ${pieceToUpdate.name}`);
		} catch (error) {
			container.logger.error(`[HMR] Failed to reload ${pieceToUpdate.name}`, error);
		}
	} else {
		try {
			const rootPath = [...store.paths].find((storePath) => path.startsWith(storePath));
			if (!rootPath) throw new Error(`[HMR] Could not find root path for ${path}`);

			const commandsLoaded = await store.load(rootPath, relative(rootPath, path));
			const commandsLoadedNames = commandsLoaded.map((piece) => piece.name);
			container.logger.info(`[HMR] Loaded ${commandsLoadedNames.join(', ')}`);
		} catch (error) {
			container.logger.error(`[HMR] Failed to load ${path}`, error);
		}
	}
}
