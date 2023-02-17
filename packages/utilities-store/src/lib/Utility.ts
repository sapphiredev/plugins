import { Piece } from '@sapphire/pieces';

/**
 * @since 1.0.0
 */
export abstract class Utility extends Piece {}

export namespace Utility {
	export type Context = Piece.Context;
	export type Options = Piece.Options;
}
