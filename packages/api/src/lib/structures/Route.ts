import { Awaited, BasePiece } from '@sapphire/framework';
import type { PieceContext, PieceOptions } from '@sapphire/pieces';
import { RouteData } from '../utils/RouteData';
import { methodEntries, Methods } from './http/HttpMethods';
import type { MethodCallback, RouteStore } from './RouteStore';

/**
 * @since 1.0.0
 */
export abstract class Route extends BasePiece {
	public maximumBodyLength: number;
	public readonly router: RouteData;
	public readonly methods: readonly [Methods, MethodCallback][];

	public constructor(context: PieceContext, options: RouteOptions = {}) {
		super(context, options);
		this.router = new RouteData(`${this.client.options.api?.prefix ?? ''}${options.route ?? ''}`);

		const methods: [Methods, MethodCallback][] = [];
		for (const [method, symbol] of methodEntries) {
			const value = Reflect.get(this, symbol) as MethodCallback;
			if (typeof value === 'function') methods.push([method, value]);
		}

		this.methods = methods;
		this.maximumBodyLength = options.maximumBodyLength ?? Infinity;
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
	route?: string;
	maximumBodyLength?: number;
}
