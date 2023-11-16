import { Piece } from '@sapphire/pieces';

/**
 * @since 1.0.0
 */
export abstract class Utility<Options extends Utility.Options = Utility.Options> extends Piece<Options, 'utilities'> {}

export namespace Utility {
	/** @deprecated Use {@linkcode LoaderContext} instead. */
	export type Context = LoaderContext;
	export type LoaderContext = Piece.LoaderContext<'utilities'>;
	export type Options = Piece.Options;
	export type JSON = Piece.JSON;
	export type LocationJSON = Piece.LocationJSON;
}
