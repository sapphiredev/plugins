import { Piece } from '@sapphire/pieces';
import type { Awaitable } from '@sapphire/utilities';
import { Collection } from 'discord.js';
import { RouteData } from '../utils/RouteData';
import type { MethodCallback, RouteStore } from './RouteStore';
import { methodEntries, type Methods } from './http/HttpMethods';
import type { MimeTypeWithoutParameters } from './http/Server';

/**
 * @since 1.0.0
 */
export abstract class Route<Options extends Route.Options = Route.Options> extends Piece<Options, 'routes'> {
	/**
	 * (RFC 7230 3.3.2) The maximum decimal number of octets.
	 */
	public readonly maximumBodyLength: number;

	/**
	 * The accepted content types.
	 */
	public readonly acceptedContentMimeTypes: readonly MimeTypeWithoutParameters[] | null;

	/**
	 * The route information.
	 */
	public readonly router: RouteData;

	/**
	 * The methods this route accepts.
	 */
	public readonly methods = new Collection<Methods, MethodCallback>();

	public constructor(context: Route.LoaderContext, options: Options = {} as Options) {
		super(context, options);

		const apiPrefix = this.parseApiPrefix();
		const routeName = options.route ?? this.name ?? '';
		this.router = new RouteData(apiPrefix + routeName);

		for (const [method, symbol] of methodEntries) {
			const value = Reflect.get(this, symbol) as MethodCallback;
			if (typeof value === 'function') this.methods.set(method, value);
		}

		const { maximumBodyLength, acceptedContentMimeTypes } = this.container.server.options;
		this.maximumBodyLength = options.maximumBodyLength ?? maximumBodyLength ?? 1024 * 1024 * 50;
		this.acceptedContentMimeTypes = options.acceptedContentMimeTypes ?? acceptedContentMimeTypes ?? null;
	}

	/**
	 * Per-piece listener that is called when the piece is loaded into the store.
	 * Useful to set-up asynchronous initialization tasks.
	 */
	public override onLoad(): Awaitable<unknown> {
		const store = this.store as unknown as RouteStore;

		for (const [method, cb] of this.methods) {
			store.table.get(method)!.set(this, cb.bind(this));
		}

		return undefined;
	}

	/**
	 * Per-piece listener that is called when the piece is unloaded from the store.
	 * Useful to set-up clean-up tasks.
	 */
	public override onUnload(): Awaitable<unknown> {
		const store = this.store as unknown as RouteStore;

		for (const [method] of this.methods) {
			store.table.get(method)!.delete(this);
		}

		return undefined;
	}

	/**
	 * Parses the `api.prefix` option.
	 *
	 * What this comes down to is the following rules being applied:
	 *
	 * 1. If the prefix is not set, return an empty string.
	 * 2. If the prefix ends with a `/`, return the prefix.
	 * 3. If the prefix does not end with a `/`, return the prefix with a `/` appended.
	 *
	 * This is to ensure that if a prefix *is* set, it always ends with a `/` character to form a URL that follows
	 * best practises.
	 * Note that if your prefix *does not* also start with a `/`, this will be automatically added regardless.
	 *
	 * If you wish to override this behaviour, you can do so by overriding this method.
	 */
	protected parseApiPrefix(): string {
		const { prefix } = this.container.server.options;

		if (!prefix) return '';

		if (prefix.endsWith('/')) return prefix;

		return `${prefix}/`;
	}
}

export interface RouteOptions extends Piece.Options {
	/**
	 * The route the piece should represent.
	 * @since 1.0.0
	 * @default ''
	 * @example
	 * ```typescript
	 * '/users'
	 * // request.params -> {}
	 * ```
	 * @example
	 * ```typescript
	 * '/guilds/:guild/members/:member/'
	 * // request.params -> { guild: '...', member: '...' }
	 * ```
	 */
	route?: string;

	/**
	 * (RFC 7230 3.3.2) The maximum decimal number of octets.
	 * @since 1.0.0
	 * @default this.context.server.options.maximumBodyLength ?? 1024 * 1024 * 50
	 */
	maximumBodyLength?: number;

	/**
	 * The accepted content types for this route. If set to null, the route will accept any data.
	 * @since 1.3.0
	 * @default this.context.server.options.acceptedContentMimeTypes ?? null
	 */
	acceptedContentMimeTypes?: MimeTypeWithoutParameters[] | null;
}

export namespace Route {
	/** @deprecated Use {@linkcode LoaderContext} instead. */
	export type Context = LoaderContext;
	export type LoaderContext = Piece.LoaderContext<'routes'>;
	export type Options = RouteOptions;
	export type JSON = Piece.JSON;
	export type LocationJSON = Piece.LocationJSON;
}
