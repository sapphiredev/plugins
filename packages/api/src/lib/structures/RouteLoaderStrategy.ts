import { LoaderStrategy } from '@sapphire/pieces';
import type { Route } from './Route';
import type { RouteStore } from './RouteStore';

export class RouteLoaderStrategy extends LoaderStrategy<Route> {
	public override onLoad(store: RouteStore, piece: Route): void {
		store.router.add(piece);
	}

	public override onUnload(store: RouteStore, piece: Route): void {
		store.router.remove(piece);
	}
}
