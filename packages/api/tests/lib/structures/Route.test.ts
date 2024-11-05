import { container, VirtualPath } from '@sapphire/pieces';
import { Route as BaseRoute, type Server, type ServerOptions } from '../../../src';

class Route extends BaseRoute {
	public run(_request: BaseRoute.Request, _response: BaseRoute.Response) {}
}

function useFakeServer(options: ServerOptions = {}): void {
	const server = { options } as Partial<Server>;
	container.server = server as Server;
}

describe('Route', () => {
	let previousValue: Server;
	beforeEach(() => (previousValue = container.server));
	afterEach(() => (container.server = previousValue));

	describe('virtual', () => {
		test('GIVEN no options THEN generates an empty path with just the name', () => {
			useFakeServer();
			const route = new Route({ name: 'route', root: VirtualPath, path: VirtualPath, store: null! });

			expect(route.path).toEqual(['route']);
			expect(route.methods).toEqual(new Set());
			expect(route.maximumBodyLength).toBe(1024 * 1024 * 50);
		});

		test('GIVEN route THEN generates the specified path', () => {
			useFakeServer();
			const route = new Route({ name: 'route', root: VirtualPath, path: VirtualPath, store: null! }, { route: 'routes/test' });

			expect(route.path).toEqual(['routes', 'test']);
			expect(route.methods).toEqual(new Set());
			expect(route.maximumBodyLength).toBe(1024 * 1024 * 50);
		});

		test('GIVEN no options with prefix THEN generates an empty path with just the name', () => {
			useFakeServer({ prefix: 'v1/' });
			const route = new Route({ name: 'route', root: VirtualPath, path: VirtualPath, store: null! });

			expect(route.path).toEqual(['v1', 'route']);
			expect(route.methods).toEqual(new Set());
			expect(route.maximumBodyLength).toBe(1024 * 1024 * 50);
		});

		test('GIVEN route with prefix THEN generates the specified path', () => {
			useFakeServer({ prefix: 'v1/' });
			const route = new Route({ name: 'route', root: VirtualPath, path: VirtualPath, store: null! }, { route: 'routes/test' });

			expect(route.path).toEqual(['v1', 'routes', 'test']);
			expect(route.methods).toEqual(new Set());
			expect(route.maximumBodyLength).toBe(1024 * 1024 * 50);
		});
	});

	describe('non-virtual', () => {
		test('GIVEN no options THEN generates a path', () => {
			useFakeServer();
			const route = new Route({ name: 'route', root: '/usr/src/app/dist/routes', path: '/usr/src/app/dist/routes/index.ts', store: null! });

			expect(route.path).toEqual(['route']);
			expect(route.methods).toEqual(new Set());
			expect(route.maximumBodyLength).toBe(1024 * 1024 * 50);
		});

		test('GIVEN no options and an index file path with method THEN generates a path with method', () => {
			useFakeServer();
			const route = new Route({
				name: 'index.get',
				root: '/usr/src/app/dist/routes',
				path: '/usr/src/app/dist/routes/index.get.ts',
				store: null!
			});

			expect(route.path).toEqual([]);
			expect(route.methods).toEqual(new Set(['GET']));
			expect(route.maximumBodyLength).toBe(1024 * 1024 * 50);
		});

		test('GIVEN no options and an index file path with a group and method THEN generates a path with method', () => {
			useFakeServer();
			const route = new Route({
				name: 'index.get',
				root: '/usr/src/app/dist/routes',
				path: '/usr/src/app/dist/routes/(administrator)/index.get.ts',
				store: null!
			});

			expect(route.path).toEqual([]);
			expect(route.methods).toEqual(new Set(['GET']));
			expect(route.maximumBodyLength).toBe(1024 * 1024 * 50);
		});

		test('GIVEN no options and an index file path with a folder and method THEN generates a path with method', () => {
			useFakeServer();
			const route = new Route({
				name: 'index.get',
				root: '/usr/src/app/dist/routes',
				path: '/usr/src/app/dist/routes/administrator/index.get.ts',
				store: null!
			});

			expect(route.path).toEqual(['administrator']);
			expect(route.methods).toEqual(new Set(['GET']));
			expect(route.maximumBodyLength).toBe(1024 * 1024 * 50);
		});

		test('GIVEN no options and a non-index file path with a folder and method THEN generates a path with method', () => {
			useFakeServer();
			const route = new Route({
				name: 'create.post',
				root: '/usr/src/app/dist/routes',
				path: '/usr/src/app/dist/routes/administrator/create.post.ts',
				store: null!
			});

			expect(route.path).toEqual(['administrator', 'create']);
			expect(route.methods).toEqual(new Set(['POST']));
			expect(route.maximumBodyLength).toBe(1024 * 1024 * 50);
		});

		test('GIVEN name and a file path with method THEN generates a path with method', () => {
			useFakeServer();
			const route = new Route(
				{
					name: 'index.get',
					root: '/usr/src/app/dist/routes',
					path: '/usr/src/app/dist/routes/index.get.ts',
					store: null!
				},
				{ name: 'MyLittleMainRoute' }
			);

			expect(route.path).toEqual([]);
			expect(route.methods).toEqual(new Set(['GET']));
			expect(route.maximumBodyLength).toBe(1024 * 1024 * 50);
		});
	});
});
