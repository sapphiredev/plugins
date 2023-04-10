import { Piece, Result, Store, container } from '@sapphire/framework';
import { watch, type WatchOptions } from 'chokidar';
import { relative } from 'node:path';

export interface HMROptions extends WatchOptions {
	enabled?: boolean;
	silent?: boolean;
}

/**
 * Starts HMR for all registered {@link Store Stores} in {@link container.stores the main container}.
 *
 * @param __namedParameter The {@link HMROptions}.
 * This includes [all options from chokidar](https://github.com/paulmillr/chokidar#persistence),
 * as well as whether the HMR should be enabled.
 * The default options are `{ enabled: true }`,
 * and if not provided in the object then `enabled` is also set to true.
 *
 */
export function start({ enabled = true, silent = false, ...options }: HMROptions = { enabled: true }) {
	// Do not enable plugin when enabled is false
	if (!enabled) return;

	if (!silent) container.logger.info('[HMR-Plugin]: Enabled. Watching for piece changes.');

	for (const store of container.stores.values()) {
		watch([...store.paths], options)
			.on('change', (path) => handlePiecePathUpdate(store, path, silent))
			.on('unlink', (path) => handlePiecePathDelete(store, path, silent));
	}
}

async function handlePiecePathDelete(store: Store<Piece>, path: string, silent: boolean) {
	if (!store.strategy.filter(path)) return;

	const pieceToDelete = store.find((piece) => piece.location.full === path);
	if (!pieceToDelete) return;

	const result = await Result.fromAsync(async () => {
		await pieceToDelete.unload();
		if (!silent) container.logger.info(`[HMR-Plugin]: Unloaded ${pieceToDelete.name} piece from ${pieceToDelete.store.name} store.`);
	});

	result.inspectErr((error) =>
		container.logger.error(`[HMR-Plugin]: Failed to unload ${pieceToDelete.name} piece from ${pieceToDelete.store.name} store.`, error)
	);
}

async function handlePiecePathUpdate(store: Store<Piece>, path: string, silent: boolean) {
	if (!store.strategy.filter(path)) return;

	const pieceToUpdate = store.find((piece) => piece.location.full === path);

	const result = await Result.fromAsync(async () => {
		if (pieceToUpdate) {
			await pieceToUpdate.reload();
			if (!silent) container.logger.info(`[HMR-Plugin]: reloaded ${pieceToUpdate.name} piece from ${pieceToUpdate.store.name} store.`);
		} else {
			const rootPath = [...store.paths].find((storePath) => path.startsWith(storePath));
			if (!rootPath) throw new Error(`[HMR-Plugin]: Could not find root path for ${path}.`);

			const piecesLoaded = await store.load(rootPath, relative(rootPath, path));
			const piecesLoadedNames = piecesLoaded.map((piece) => piece.name);
			const piecesLoadedStoreNames = piecesLoaded.map((piece) => piece.store.name);
			if (!silent)
				container.logger.info(
					`[HMR-Plugin]: Loaded ${piecesLoadedNames.join(', ')} piece(s) from ${[...new Set(piecesLoadedStoreNames)].join(', ')} store(s).`
				);
		}
	});

	result.inspectErr((error) => container.logger.error(`[HMR-Plugin]: Failed to load pieces from ${path}.`, error));
}
