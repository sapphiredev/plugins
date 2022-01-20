import { fetch, FetchMethods, FetchResultTypes, QueryError } from '@sapphire/fetch';
import { container } from '@sapphire/framework';
import { totalmem } from 'os';
import { currentLoad } from 'systeminformation';
import EventEmitter from 'events';
import type { Snowflake } from 'discord.js';

import { PostStats, ClientStats, BucketStats, UserVotesStats, StatcordOptions, StatcordEvents } from './types';
/**
 * The Statcord class.
 * @since 1.0.0
 */
export class Statcord extends EventEmitter {
	private activeUsers: Snowflake[] = [];
	private popularCommands: Array<{ name: string; count: number }> = [];
	private commandsRun = 0;
	private defaultHeader = { 'content-type': 'application/json', authorization: this.options?.key ?? '' };
	private bandwidthUsage = '0';
	private baseUrl = this.options?.baseUrl ?? 'https://api.statcord.com/v3';

	public constructor(private readonly options?: StatcordOptions) {
		super();

		if (!this.options?.key) {
			throw new Error('[Statcord-Plugin]: Statistics will not be sent because no API key has been provided in the Statcord options.');
		}
	}

	/**
	 * Post the statistics collected from the client to Statcord.
	 * @since 1.0.0
	 */
	public async postStats() {
		try {
			const request = await fetch<PostStats>(
				`${this.baseUrl}/stats`,
				{
					method: FetchMethods.Post,
					headers: this.defaultHeader,
					body: JSON.stringify({
						id: container.client.user?.id,
						key: this.options?.key,
						servers: this.computeTotalGuilds(),
						users: await this.computeMembersGuilds(),
						active: this.activeUsers,
						commands: this.commandsRun.toString(),
						popular: this.getPopularCommands(),
						memactive: process.memoryUsage().heapUsed.toString(),
						memload: Math.round((process.memoryUsage().heapUsed / totalmem()) * 100).toString(),
						cpuload: Math.round((await currentLoad()).currentLoad).toString(),
						bandwidth: this.bandwidthUsage
					})
				},
				FetchResultTypes.JSON
			);

			if (this.options?.debug) {
				container.logger.debug(
					`[Statcord-Plugin]: Statistics sent correctly > Commands executed: ${this.commandsRun.toLocaleString()} | Active users: ${this.activeUsers.length.toLocaleString()}`
				);
			}

			this.commandsRun = 0;
			this.popularCommands = [];
			this.activeUsers = [];
			this.bandwidthUsage = '0';

			if (this.options?.debug) {
				container.logger.debug('[Statcord-Plugin]: Resetting of temporary statistics for the new statistics collection.');
			}

			this.emit(StatcordEvents.POST_STATS, request);
			return request;
		} catch (err: unknown) {
			if (err instanceof QueryError) {
				this.emit(StatcordEvents.POST_STATS_ERROR, err);
			}

			return null;
		}
	}

	/**
	 * Get current client statistics in Statcord.
	 * @since 1.0.0
	 */
	public async clientStats() {
		try {
			return await fetch<ClientStats>(
				`${this.baseUrl}/${container.client.user!.id}`,
				{ method: FetchMethods.Get, headers: this.defaultHeader },
				FetchResultTypes.JSON
			);
		} catch (_: unknown) {
			return null;
		}
	}

	/**
	 * Check everyone who has voted for the bot today.
	 * @param days How many days back votes should be fetched for.
	 * @since 1.0.0
	 */
	public async bucketStats(days = 'all') {
		try {
			return await fetch<BucketStats>(
				`${this.baseUrl}/${container.client.user!.id}/aggregate?days=${days}`,
				{ method: FetchMethods.Get, headers: this.defaultHeader },
				FetchResultTypes.JSON
			);
		} catch (_: unknown) {
			return null;
		}
	}

	/**
	 * Check if someone has voted for the bot today.
	 * @param userId The ID of the user you are checking for.
	 * @param days How many days back votes should be fetched for.
	 * @since 1.0.0
	 */
	public async userVotesStats(userId: string, days = 1) {
		try {
			return await fetch<UserVotesStats>(
				`${this.baseUrl}/${container.client.user!.id}/votes/${userId}?days=${days}`,
				{ method: FetchMethods.Get, headers: this.defaultHeader },
				FetchResultTypes.JSON
			);
		} catch (_: unknown) {
			return null;
		}
	}

	/**
	 * Set the current bot network usage. It is reset at each statistics post.
	 * @param usage Bandwidth usage.
	 * @since 1.0.0
	 */
	public setBandwidthUsage(usage: string) {
		this.bandwidthUsage = usage;
	}

	public postCommand(commandId: string, author: Snowflake) {
		this.commandsRun++;
		if (!this.activeUsers.includes(author)) this.activeUsers.push(author);
		const commandData = this.popularCommands.find((c) => c.name === commandId);
		if (commandData) return commandData.count++;

		this.emit(StatcordEvents.POST_COMMAND, { id: commandId, author });
		return this.popularCommands.push({ name: commandId, count: 1 });
	}

	private async computeMembersGuilds() {
		if (container.client.shard && this.options?.sharding) {
			const total = await container.client.shard.broadcastEval((c) => c.guilds.cache.reduce((prev, guild) => prev + guild.memberCount, 0));
			return total.reduce((prev, memberCount) => prev + memberCount, 0);
		}

		return container.client.guilds.cache.map((g) => g.memberCount).reduce((a, b) => a + b, 0);
	}

	private async computeTotalGuilds() {
		if (container.client.shard && this.options?.sharding) {
			const total = await container.client.shard.broadcastEval((c) => c.guilds.cache.size);
			return total.reduce((prev, memberCount) => prev + memberCount, 0);
		}

		return container.client.guilds.cache.size;
	}

	private getPopularCommands() {
		return this.popularCommands.sort((a, b) => b.count - a.count).slice(0, 5);
	}
}
