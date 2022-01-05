import { Plugin, postInitialization, SapphireClient, Store } from '@sapphire/framework';
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

			for (const store of this.stores.values()) {
				const cb = handlePiecePathUpdate.bind(null, store);

				for (const path of store.paths) {
					chokidar.watch(path).on('change', cb);
				}
			}
		}
	}
}

function handlePiecePathUpdate(store: Store<any>, path: string) {
	// ...
}

SapphireClient.plugins.registerPostInitializationHook(HmrPlugin[postInitialization], 'HmrCommands-PostInitialization');
