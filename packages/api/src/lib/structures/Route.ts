import { Awaited, BasePiece } from '@sapphire/framework';
import type { PieceContext, PieceOptions } from '@sapphire/pieces';
import { RouteData } from '../utils/RouteData';
import { methodEntries, Methods } from './http/HttpMethods';
import type { MethodCallback, RouteStore } from './RouteStore';

/**
 * @since 1.0.0
 */
export abstract class Route extends BasePiece {
	/**
	 * (RFC 7230 3.3.2) The maximum decimal number of octets.
	 */
	public readonly maximumBodyLength: number;

	/**
	 * The route information.
	 */
	public readonly router: RouteData;

	/**
	 * The methods this route accepts.
	 */
	public readonly methods = new Map<Methods, MethodCallback>();

	public constructor(context: PieceContext, options: RouteOptions = {}) {
		super(context, options);
		this.router = new RouteData(`${this.client.options.api?.prefix ?? ''}${options.route ?? ''}`);

		for (const [method, symbol] of methodEntries) {
			const value = Reflect.get(this, symbol) as MethodCallback;
			if (typeof value === 'function') this.methods.set(method, value);
		}

		this.maximumBodyLength = options.maximumBodyLength ?? this.client.options.api?.maximumBodyLength ?? 1024 * 1024 * 50;
	}

	/**
	 * Per-piece listener that is called when the piece is loaded into the store.
	 * Useful to set-up asynchronous initialization tasks.
	 */
	public onLoad(): Awaited<unknown> {
		const store = (this.store as unknown) as RouteStore;

		for (const [method, cb] of this.methods) {
			store.table.get(method)!.set(this, cb.bind(this));
		}

		return undefined;
	}

	/**
	 * Per-piece listener that is called when the piece is unloaded from the store.
	 * Useful to set-up clean-up tasks.
	 */
	public onUnload(): Awaited<unknown> {
		const store = (this.store as unknown) as RouteStore;

		for (const [method] of this.methods) {
			store.table.get(method)!.delete(this);
		}

		return undefined;
	}
}

export interface RouteOptions extends PieceOptions {
	/**
	 * The route the piece should represent.
	 * @default ''
	 * @example
	 * ```typescript
	 * '/users'
	 * // request.params -> {}
	 * ```
	 * @example
	 * ``typescript
	 * '/guilds/:guild/members/:member/'
	 * // request.params -> { guild: '...', member: '...' }
	 * ```
	 */
	route?: string;

	/**
	 * (RFC 7230 3.3.2) The maximum decimal number of octets.
	 * @default this.client.options.api?.maximumBodyLength ?? 1024 * 1024 * 50
	 */
	maximumBodyLength?: number;
}
