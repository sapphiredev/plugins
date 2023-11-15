import { Store } from '@sapphire/pieces';
import { Middleware } from './Middleware';
import type { Route } from './Route';
import type { ApiRequest } from './api/ApiRequest';
import type { ApiResponse } from './api/ApiResponse';

/**
 * @since 1.0.0
 */
export class MiddlewareStore extends Store<Middleware, 'middlewares'> {
	/**
	 * The sorted middlewares, in ascending order of see {@link Middleware.position}.
	 */
	public readonly sortedMiddlewares: Middleware[] = [];

	public constructor() {
		super(Middleware as any, { name: 'middlewares' });
	}

	public async run(request: ApiRequest, response: ApiResponse, route: Route | null): Promise<void> {
		for (const middleware of this.sortedMiddlewares) {
			if (response.writableEnded) return;
			if (middleware.enabled) await middleware.run(request, response, route);
		}
	}

	public override set(key: string, value: Middleware): this {
		const index = this.sortedMiddlewares.findIndex((middleware) => middleware.position >= value.position);

		// If a middleware with lower priority wasn't found, push to the end of the array
		if (index === -1) this.sortedMiddlewares.push(value);
		else this.sortedMiddlewares.splice(index, 0, value);

		return super.set(key, value);
	}

	public override delete(key: string): boolean {
		const index = this.sortedMiddlewares.findIndex((middleware) => middleware.name === key);

		// If the middleware was found, remove it
		if (index !== -1) this.sortedMiddlewares.splice(index, 1);

		return super.delete(key);
	}

	public override clear(): void {
		this.sortedMiddlewares.length = 0;
		return super.clear();
	}
}
