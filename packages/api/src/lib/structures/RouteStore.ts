import { Store } from '@sapphire/pieces';
import { Route } from './Route';
import { RouteLoaderStrategy } from './RouteLoaderStrategy';
import { RouterRoot } from './router/RouterRoot';

/**
 * @since 1.0.0
 */
export class RouteStore extends Store<Route, 'routes'> {
	public readonly router = new RouterRoot();

	public constructor() {
		super(Route, { name: 'routes', strategy: new RouteLoaderStrategy() });
	}
}
