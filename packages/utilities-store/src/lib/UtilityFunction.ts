import { Piece } from '@sapphire/pieces';
import type { Awaitable } from '@sapphire/utilities';

/**
 * @since 1.0.0
 */
export abstract class UtilityFunction extends Piece {
	/**
	 * The function that should be called when calling this utility from the container
	 */
	public abstract handle(...args: unknown[]): Awaitable<unknown>;
}

export namespace UtilityFunction {
	export type Context = Piece.Context;
	export type Options = Piece.Options;
}
