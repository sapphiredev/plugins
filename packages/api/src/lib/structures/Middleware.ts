import { Awaited, BasePiece } from '@sapphire/framework';
import type { PieceContext, PieceOptions } from '@sapphire/pieces';
import type { ApiRequest } from './api/ApiRequest';
import type { ApiResponse } from './api/ApiResponse';
import type { Route } from './Route';

/**
 * @since 1.0.0
 */
export abstract class Middleware extends BasePiece {
	public readonly position: number;

	public constructor(context: PieceContext, options: MiddlewareOptions = {}) {
		super(context, options);
		this.position = options.position ?? 1000;
	}

	public abstract run(request: ApiRequest, response: ApiResponse, route: Route): Awaited<unknown>;
}

export interface MiddlewareOptions extends PieceOptions {
	position?: number;
}
