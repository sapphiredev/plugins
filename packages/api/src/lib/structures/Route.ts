import { BasePiece } from '@sapphire/framework';
import { Collection } from 'discord.js';
import { kRoutePathCacheSymbol } from '../Api';
import { METHODS } from 'http';
import type { RouteCacheDefinition } from '../decorators/HttpMethods';
import { parse, ParsedPart } from '../utils/pathParsing';
import type { Methods } from './http/HttpMethods';
import type { PieceContext, PieceOptions } from '@sapphire/pieces';

/**
 * @since 1.0.0
 */
export abstract class Route extends BasePiece {
	/**
	 * @since 1.0.0
	 */
	public route: string;

	/**
	 * @since 1.0.0
	 */
	public $internalRoutingTable: Collection<Methods, [string, ParsedPart[]][]> = new Collection();

	/**
	 * Internal route remains empty until either the store fills it from piece options or the decorator sets it.
	 * Its main function is acting as the main route for the DEFAULT HttpMethod decorators.
	 * OR as the base route for decorator defined sub routes.
	 * @protected
	 * @since 1.0.0
	 */
	protected $internalRoute = '';

	public constructor(context: PieceContext, { name, ...options }: PieceOptions = {}) {
		super(context, { ...options, name: name?.toLowerCase() });

		this.route = `${this.client.options.api.prefix}${this.$internalRoute}`;

		Reflect.defineProperty(Route, kRoutePathCacheSymbol, { value: [] });
		for (const method of METHODS) {
			this.$internalRoutingTable.set(
				method as Methods,
				(Reflect.get(Route, kRoutePathCacheSymbol) as RouteCacheDefinition[])
					.filter((rt) => rt.httpMethod === method)
					.map((rt) => [rt.method, parse(rt.route)])
			);
		}
	}

	public matchRoute(method: Methods, split: string[]): string {
		const routes = this.$internalRoutingTable.get(method)!;
		if (!routes.some((rt) => rt[1].length === split.length)) return '';
		for (const rte of routes) {
			for (let ir = 0; ir < rte[1].length; ir++) {
				const routeEntry = rte[1][ir];
				if (routeEntry[1] !== 0 && routeEntry[0] === split[ir]) return rte[0];
			}
		}
		return '';
	}

	/**
	 * @since 1.0.0
	 */
	public static [kRoutePathCacheSymbol]: RouteCacheDefinition[];
}
