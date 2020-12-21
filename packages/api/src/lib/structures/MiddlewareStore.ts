import { BaseStore, SapphireClient } from '@sapphire/framework';
import type { ApiRequest } from './api/ApiRequest';
import type { ApiResponse } from './api/ApiResponse';
import { Middleware } from './Middleware';
import type { Route } from './Route';

/**
 * @since 1.0.0
 */
export class MiddlewareStore extends BaseStore<Middleware> {
	/**
	 * The sorted middlewares, in ascending order of {@see Middleware#position}.
	 */
	public readonly sortedMiddlewares: Middleware[] = [];

	public constructor(client: SapphireClient) {
		super(client, Middleware as any, { name: 'middlewares' });
	}

	public async run(request: ApiRequest, response: ApiResponse, route: Route): Promise<void> {
		for (const middleware of this.sortedMiddlewares) {
			if (response.writableEnded) return;
			if (middleware.enabled) await middleware.run(request, response, route);
		}
	}

	public set(key: string, value: Middleware): this {
		const index = this.sortedMiddlewares.findIndex((middleware) => middleware.position >= value.position);

		// If a middleware with lower priority wasn't found, push to the end of the array
		if (index === -1) this.sortedMiddlewares.push(value);
		else this.sortedMiddlewares.splice(index, 0, value);

		return super.set(key, value);
	}

	public delete(key: string): boolean {
		const index = this.sortedMiddlewares.findIndex((middleware) => middleware.name === key);

		// If the middleware was found, remove it
		if (index !== -1) this.sortedMiddlewares.splice(index, 1);

		return super.delete(key);
	}

	public clear(): void {
		this.sortedMiddlewares.length = 0;
		return super.clear();
	}
}
