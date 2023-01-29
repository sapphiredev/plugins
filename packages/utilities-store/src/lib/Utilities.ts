import { container } from '@sapphire/pieces';
import { UtilitiesStore } from './UtilitiesStore';
import type { UtilityFunction } from './UtilityFunction';

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
	 * Registers a function on this class.
	 * @param name The name of the function to register on this class
	 * @param func The function to register on this class
	 */
	public exposeFunction(name: string, func: UtilityFunction) {
		// @ts-expect-error Bypass TypeScript check for dynamic property assignment
		// eslint-disable-next-line @typescript-eslint/unbound-method
		this[name] = func.handle;
	}
}
