import { container } from '@sapphire/pieces';
import { UtilitiesStore } from './UtilitiesStore';
import type { Utility } from './Utility';

/**
 * @since 1.0.0
 */
export class Utilities {
	/**
	 * The utilities this store holds.
	 * @since 1.0.0
	 */
	public readonly store: UtilitiesStore;

	/**
	 * @since 1.0.0
	 * @param options The options for this server
	 */
	public constructor() {
		container.utilities = this;
		this.store = new UtilitiesStore();
	}

	/**
	 * Registers a piece on this class.
	 * @param name The name of the piece to register on this class
	 * @param piece The piece to register on this class
	 */
	public exposePiece(name: string, piece: Utility) {
		// @ts-expect-error Bypass TypeScript check for dynamic property assignment
		this[name] = piece;
	}
}
