import { Awaited, Plugin, preGenericsInitialization, preLogin, SapphireClient } from '@sapphire/framework';
import { ClientOptions, Structures } from 'discord.js';
import { In17nHandler, In17nOptions } from './index';
import { In17nMessage } from './lib/extensions';

Structures.extend('Message', () => In17nMessage);

export class In17nPlugin extends Plugin {
	public static [preGenericsInitialization](this: SapphireClient, options: ClientOptions): void {
		this.in17n = new In17nHandler(options.in17n);

		this.fetchLanguage = options.fetchLanguage ?? (() => options.in17n?.defaultName ?? null) ?? (() => 'en-US');
	}

	public static async [preLogin](this: SapphireClient): Promise<void> {
		await this.in17n.init();
	}
}

declare module 'discord.js' {
	export interface Client {
		in17n: In17nHandler;

		/**
		 * The method to be overriden by the developer.
		 * Note: In the event that fetchLanguage is not defined or returns null or undefined
		 * the order of defaulting will be as follows:
		 * client.fetchLanguage -> message.guild.preferredLocale -> this.client.options.i18n.defaultName -> 'en-US'
		 * @since 1.0.0
		 * @return A string for the desired language or null for no match.
		 * @example
		 * ```typescript
		 * // Return always the same language (unconfigurable):
		 * client.fetchLanguage = () => 'en-US';
		 * ```
		 * @example
		 * ```typescript
		 * // Retrieving the prefix from a SQL database:
		 * client.fetchLanguage = async (message) => {
		 *   const guild = await driver.getOne('SELECT language FROM public.guild WHERE id = $1', [message.guild.id]);
		 *   return guild?.language ?? 'en-US';
		 * };
		 * ```
		 * @example
		 * ```typescript
		 * // Retrieving the language from an ORM:
		 * client.fetchLanguage = async (message) => {
		 *   const guild = await driver.getRepository(GuildEntity).findOne({ id: message.guild.id });
		 *   return guild?.language ?? 'en-US';
		 * };
		 * ```
		 */
		fetchLanguage: (message: Message) => Awaited<string | null>;
	}

	export interface ClientOptions {
		in17n?: In17nOptions;

		/**
		 * The lanuage hook, by default it is a callback function that returns {@link In17nOptions#defaultName}.
		 * @since 1.0.0
		 * @default () => client.options.defaultLanguage
		 */
		fetchLanguage?: (message: Message) => Awaited<string | null>;
	}
}

SapphireClient.plugins.registerPostInitializationHook(In17nPlugin[preGenericsInitialization], 'In17n-PreGenericsInitialization');
SapphireClient.plugins.registerPreLoginHook(In17nPlugin[preLogin], 'In17n-PreLogin');
