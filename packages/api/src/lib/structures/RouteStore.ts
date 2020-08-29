import { BaseStore, SapphireClient } from '@sapphire/framework';
import { Collection } from 'discord.js';
import { METHODS } from 'http';
import type { Methods } from './http/HttpMethods';
import { Route } from './Route';

/**
 * @since 1.0.0
 */
export class RouteStore extends BaseStore<Route> {
	public routingTable: Collection<Methods, Collection<string, Route>> = new Collection();

	public constructor(client: SapphireClient) {
		// @ts-expect-error Argument of type 'typeof Route' is not assignable to parameter of type 'Constructor<Route>'. Cannot assign an abstract constructor type to a non-abstract constructor type. (2345)
		super(client, Route);

		// TODO: Add routes to routingTable
		for (const method of METHODS) this.routingTable.set(method as Methods, new Collection());
	}
}
