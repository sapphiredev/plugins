import { container, fromAsync, isErr, Piece, Store } from '@sapphire/framework';
import { watch, WatchOptions } from 'chokidar';
import { error } from 'console';
import { relative } from 'path';

export interface HMROptions extends WatchOptions {
	enabled?: boolean;
}

/**
 * Starts HMR for all registered {@link Store Stores} in {@link container.stores the main container}.
 */
export function start(options: HMROptions = {}) {
	if (!options.enabled) return;
	container.logger.info('[HMR-Plugin]: Enabled. Watching for piece changes.');

	for (const store of container.stores.values()) {
		const deleteCb = handlePiecePathDelete.bind(null, store);
		const updateCb = handlePiecePathUpdate.bind(null, store);

		watch([...store.paths], options)
			.on('change', updateCb)
			.on('unlink', deleteCb);
	}
}

async function handlePiecePathDelete(store: Store<Piece>, path: string) {
	if (!store.strategy.filter(path)) return;

	const pieceToDelete = store.find((piece) => piece.location.full === path);
	if (!pieceToDelete) return;

	const result = await fromAsync(async () => {
		await pieceToDelete.unload();
		container.logger.info(`[HMR-Plugin]: Unloaded ${pieceToDelete.name} piece from ${pieceToDelete.store.name} store.`);
	});

	if (isErr(result)) {
		container.logger.error(`[HMR-Plugin]: Failed to unload ${pieceToDelete.name} piece from ${pieceToDelete.store.name} store.`, error);
	}
}

async function handlePiecePathUpdate(store: Store<Piece>, path: string) {
	if (!store.strategy.filter(path)) return;

	const pieceToUpdate = store.find((piece) => piece.location.full === path);

	const result = await fromAsync(async () => {
		if (pieceToUpdate) {
			await pieceToUpdate.reload();
			container.logger.info(`[HMR-Plugin]: reloaded ${pieceToUpdate.name} piece from ${pieceToUpdate.store.name} store.`);
		} else {
			const rootPath = [...store.paths].find((storePath) => path.startsWith(storePath));
			if (!rootPath) throw new Error(`[HMR-Plugin]: Could not find root path for ${path}.`);

			const piecesLoaded = await store.load(rootPath, relative(rootPath, path));
			const piecesLoadedNames = piecesLoaded.map((piece) => piece.name);
			const piecesLoadedStoreNames = piecesLoaded.map((piece) => piece.store.name);
			container.logger.info(
				`[HMR-Plugin]: Loaded ${piecesLoadedNames.join(', ')} piece(s) from ${[...new Set(piecesLoadedStoreNames)].join(', ')} store(s).`
			);
		}
	});

	if (isErr(result)) {
		container.logger.error(`[HMR-Plugin]: Failed to load pieces from ${path}.`, result.error);
	}
}
