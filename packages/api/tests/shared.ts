import { VirtualPath, container } from '@sapphire/pieces';
import { Route, type MethodName } from '../src';

export function makeRoute(route: string, methods: readonly MethodName[] = ['GET']) {
	// @ts-expect-error Stub
	container.server ??= { options: {} };

	class UserRoute extends Route {
		public constructor(context: Route.LoaderContext) {
			super(context, { route, methods });
		}

		public override run() {
			// noop
		}
	}

	return new UserRoute({
		name: VirtualPath,
		path: VirtualPath,
		root: VirtualPath,
		store: container.stores.get('routes')
	});
}
