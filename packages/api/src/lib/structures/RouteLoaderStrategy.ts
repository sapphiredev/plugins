import { LoaderStrategy } from '@sapphire/pieces';
import { Collection } from 'discord.js';
import type { Route } from './Route';
import type { RouteStore } from './RouteStore';

export class RouteLoaderStrategy extends LoaderStrategy<Route> {
	public override onLoad(store: RouteStore, piece: Route): void {
		for (const method of piece.methods) {
			store.methods.ensure(method, () => new Collection()).set(piece, piece.router);
		}
	}

	public override onUnload(store: RouteStore, piece: Route): void {
		for (const method of piece.methods) {
			const methods = store.methods.get(method);
			if (typeof methods === 'undefined') continue;

			methods.delete(piece);
			if (methods.size === 0) store.methods.delete(method);
		}
	}
}
