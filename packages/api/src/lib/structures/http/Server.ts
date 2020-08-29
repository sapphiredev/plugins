import type { SapphireClient } from '@sapphire/framework';
import { createServer as httpCreateServer, Server as HttpServer } from 'http';

/**
 * @since 1.0.0
 */
export class Server {
	/**
	 * The http.Server instance that manages the recieved HTTP requests.
	 * @since 1.0.0
	 */
	public readonly server: HttpServer;

	/**
	 * The managing Client instance on which this Server instance is mounted.
	 * @private
	 * @since 1.0.0
	 */
	private readonly client: SapphireClient;

	/**
	 * @since 1.0.0
	 * @param client The @sapphire/framework Client instance
	 */
	public constructor(client: SapphireClient) {
		this.client = client;
		this.server = httpCreateServer(this.client.options.api.server!);
	}
}
