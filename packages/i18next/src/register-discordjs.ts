import './register';
export * from './register';
import type { TFunction } from 'i18next';
import type { I18nextHandler, I18nOptions, I18nContext } from './index';
import { Message, MessageAdditions, MessageOptions, SplitOptions, Structures, Channel, Guild, User, Client } from 'discord.js';

declare module './index' {
	export interface I18nGuildContext extends Guild {}
	export interface I18nChannelContext extends Channel {}
	export interface I18nAuthorContext extends Channel {}
}

async function fetchLanguage(client: Client, guild?: Guild | null, channel?: Channel | null, author?: User | null): Promise<string> {
	const lang = await client.fetchLanguage({
		guild,
		channel,
		author
	} as I18nContext);
	return lang ?? guild?.preferredLocale ?? client.i18n?.options?.defaultName ?? 'en-US';
}

class I18nextMessage extends Structures.get('Message') {
	public async fetchLanguage(): Promise<string> {
		return fetchLanguage(this.client, this.guild, this.channel, this.author);
	}

	public async fetchT(): Promise<TFunction> {
		return this.client.i18n.fetchT(await this.fetchLanguage());
	}

	public async resolveKey(key: string, ...values: readonly any[]): Promise<string> {
		return this.client.i18n.fetchLocale(await this.fetchLanguage(), key, ...values);
	}

	public replyTranslated(
		key: string,
		values?: readonly unknown[],
		options?: MessageOptions | (MessageOptions & { split?: false }) | MessageAdditions
	): Promise<Message>;

	public replyTranslated(key: string, values?: readonly unknown[], options?: MessageOptions & { split: true | SplitOptions }): Promise<Message[]>;
	public replyTranslated(key: string, options?: MessageOptions | (MessageOptions & { split?: false }) | MessageAdditions): Promise<Message>;
	public replyTranslated(key: string, options?: MessageOptions & { split: true | SplitOptions }): Promise<Message[]>;
	public async replyTranslated(
		key: string,
		valuesOrOptions?: readonly unknown[] | MessageOptions | MessageAdditions,
		rawOptions?: MessageOptions
	): Promise<Message | Message[]> {
		const [values, options]: [readonly unknown[], MessageOptions] =
			valuesOrOptions === undefined || Array.isArray(valuesOrOptions)
				? [valuesOrOptions ?? [], rawOptions ?? {}]
				: [[], valuesOrOptions as MessageOptions];
		return this.reply(await this.resolveKey(key, ...values), options);
	}

	public editTranslated(
		key: string,
		values?: readonly unknown[],
		options?: MessageOptions | (MessageOptions & { split?: false }) | MessageAdditions
	): Promise<Message>;

	public editTranslated(key: string, values?: readonly unknown[], options?: MessageOptions & { split: true | SplitOptions }): Promise<Message[]>;
	public editTranslated(key: string, options?: MessageOptions | (MessageOptions & { split?: false }) | MessageAdditions): Promise<Message>;
	public editTranslated(key: string, options?: MessageOptions & { split: true | SplitOptions }): Promise<Message[]>;
	public async editTranslated(
		key: string,
		valuesOrOptions?: readonly unknown[] | MessageOptions | MessageAdditions,
		rawOptions?: MessageOptions
	): Promise<Message | Message[]> {
		const [values, options]: [readonly unknown[], MessageOptions] =
			valuesOrOptions === undefined || Array.isArray(valuesOrOptions)
				? [valuesOrOptions ?? [], rawOptions ?? {}]
				: [[], valuesOrOptions as MessageOptions];
		return this.edit(await this.resolveKey(key, ...values), options);
	}
}

class I18nextTextChannel extends Structures.get('TextChannel') {
	public async fetchLanguage(): Promise<string> {
		return fetchLanguage(this.client, this.guild, this, undefined);
	}

	public async fetchT(): Promise<TFunction> {
		return this.client.i18n.fetchT(await this.fetchLanguage());
	}

	public async resolveKey(key: string, ...values: readonly any[]): Promise<string> {
		return this.client.i18n.fetchLocale(await this.fetchLanguage(), key, ...values);
	}

	public sendTranslated(
		key: string,
		values?: readonly unknown[],
		options?: MessageOptions | (MessageOptions & { split?: false }) | MessageAdditions
	): Promise<Message>;

	public sendTranslated(key: string, values?: readonly unknown[], options?: MessageOptions & { split: true | SplitOptions }): Promise<Message[]>;
	public sendTranslated(key: string, options?: MessageOptions | (MessageOptions & { split?: false }) | MessageAdditions): Promise<Message>;
	public sendTranslated(key: string, options?: MessageOptions & { split: true | SplitOptions }): Promise<Message[]>;
	public async sendTranslated(
		key: string,
		valuesOrOptions?: readonly unknown[] | MessageOptions | MessageAdditions,
		rawOptions?: MessageOptions
	): Promise<Message | Message[]> {
		const [values, options]: [readonly unknown[], MessageOptions] =
			valuesOrOptions === undefined || Array.isArray(valuesOrOptions)
				? [valuesOrOptions ?? [], rawOptions ?? {}]
				: [[], valuesOrOptions as MessageOptions];
		return this.send(await this.resolveKey(key, ...values), options);
	}
}

class I18nextDMChannel extends Structures.get('DMChannel') {
	public async fetchLanguage(): Promise<string> {
		return fetchLanguage(this.client, undefined, this, undefined);
	}

	public async fetchT(): Promise<TFunction> {
		return this.client.i18n.fetchT(await this.fetchLanguage());
	}

	public async resolveKey(key: string, ...values: readonly any[]): Promise<string> {
		return this.client.i18n.fetchLocale(await this.fetchLanguage(), key, ...values);
	}

	public sendTranslated(
		key: string,
		values?: readonly unknown[],
		options?: MessageOptions | (MessageOptions & { split?: false }) | MessageAdditions
	): Promise<Message>;

	public sendTranslated(key: string, values?: readonly unknown[], options?: MessageOptions & { split: true | SplitOptions }): Promise<Message[]>;
	public sendTranslated(key: string, options?: MessageOptions | (MessageOptions & { split?: false }) | MessageAdditions): Promise<Message>;
	public sendTranslated(key: string, options?: MessageOptions & { split: true | SplitOptions }): Promise<Message[]>;
	public async sendTranslated(
		key: string,
		valuesOrOptions?: readonly unknown[] | MessageOptions | MessageAdditions,
		rawOptions?: MessageOptions
	): Promise<Message | Message[]> {
		const [values, options]: [readonly unknown[], MessageOptions] =
			valuesOrOptions === undefined || Array.isArray(valuesOrOptions)
				? [valuesOrOptions ?? [], rawOptions ?? {}]
				: [[], valuesOrOptions as MessageOptions];
		return this.send(await this.resolveKey(key, ...values), options);
	}
}

class I18nextNewsChannel extends Structures.get('NewsChannel') {
	public async fetchLanguage(): Promise<string> {
		return fetchLanguage(this.client, this.guild, this, undefined);
	}

	public async fetchT(): Promise<TFunction> {
		return this.client.i18n.fetchT(await this.fetchLanguage());
	}

	public async resolveKey(key: string, ...values: readonly any[]): Promise<string> {
		return this.client.i18n.fetchLocale(await this.fetchLanguage(), key, ...values);
	}

	public sendTranslated(
		key: string,
		values?: readonly unknown[],
		options?: MessageOptions | (MessageOptions & { split?: false }) | MessageAdditions
	): Promise<Message>;

	public sendTranslated(key: string, values?: readonly unknown[], options?: MessageOptions & { split: true | SplitOptions }): Promise<Message[]>;
	public sendTranslated(key: string, options?: MessageOptions | (MessageOptions & { split?: false }) | MessageAdditions): Promise<Message>;
	public sendTranslated(key: string, options?: MessageOptions & { split: true | SplitOptions }): Promise<Message[]>;
	public async sendTranslated(
		key: string,
		valuesOrOptions?: readonly unknown[] | MessageOptions | MessageAdditions,
		rawOptions?: MessageOptions
	): Promise<Message | Message[]> {
		const [values, options]: [readonly unknown[], MessageOptions] =
			valuesOrOptions === undefined || Array.isArray(valuesOrOptions)
				? [valuesOrOptions ?? [], rawOptions ?? {}]
				: [[], valuesOrOptions as MessageOptions];
		return this.send(await this.resolveKey(key, ...values), options);
	}
}

class I18nextGuild extends Structures.get('Guild') {
	public async fetchLanguage(): Promise<string> {
		return fetchLanguage(this.client, this, undefined, undefined);
	}

	public async fetchT(): Promise<TFunction> {
		return this.client.i18n.fetchT(await this.fetchLanguage());
	}

	public async resolveKey(key: string, ...values: readonly any[]): Promise<string> {
		return this.client.i18n.fetchLocale(await this.fetchLanguage(), key, ...values);
	}
}

Structures.extend('Message', () => I18nextMessage);
Structures.extend('TextChannel', () => I18nextTextChannel);
Structures.extend('DMChannel', () => I18nextDMChannel);
Structures.extend('NewsChannel', () => I18nextNewsChannel);
Structures.extend('Guild', () => I18nextGuild);

declare module 'discord.js' {
	export interface Message {
		/**
		 * Accessor for {@link I18nextPlugin#fetchLanguage} that implements an order of preference for locales.
		 * @since 1.0.0
		 * @return In preference order, {@link I18nextPlugin#fetchLanguage} -> the guild's preferredLocale -> {@link I18nextOptions#defaultName} -> 'en-US'.
		 */
		fetchLanguage(): Promise<string>;

		/**
		 * Function that gets a TFunction (translator function) from i18next.
		 * @since 1.0.0
		 * @return An i18next TFunction.
		 */
		fetchT(): Promise<TFunction>;

		/**
		 * Function that resolves a language key from the store.
		 * @since 1.0.0
		 * @return A string, which is the translated result of the key, with templated values.
		 */
		resolveKey(key: string, ...values: readonly any[]): Promise<string>;

		/**
		 * Function that sends a response message for the context channel with the translated key and values.
		 * Functionally equivalent to piping resolveKey through Message#reply.
		 * @since 1.0.0
		 * @return The message object that was sent.
		 */
		replyTranslated(
			key: string,
			values?: readonly unknown[],
			options?: MessageOptions | (MessageOptions & { split?: false }) | MessageAdditions
		): Promise<Message>;
		replyTranslated(key: string, values?: readonly unknown[], options?: MessageOptions & { split: true | SplitOptions }): Promise<Message[]>;
		replyTranslated(key: string, options?: MessageOptions | (MessageOptions & { split?: false }) | MessageAdditions): Promise<Message>;
		replyTranslated(key: string, options?: MessageOptions & { split: true | SplitOptions }): Promise<Message[]>;
		replyTranslated(
			key: string,
			valuesOrOptions?: readonly unknown[] | MessageOptions | MessageAdditions,
			rawOptions?: MessageOptions
		): Promise<Message | Message[]>;

		/**
		 * Function that edits a message with the translated key and values.
		 * Functionally equivalent to piping resolveKey through Message#edit.
		 * @since 1.0.0
		 * @return The message object that was edited.
		 */
		editTranslated(
			key: string,
			values?: readonly unknown[],
			options?: MessageOptions | (MessageOptions & { split?: false }) | MessageAdditions
		): Promise<Message>;
		editTranslated(key: string, values?: readonly unknown[], options?: MessageOptions & { split: true | SplitOptions }): Promise<Message[]>;
		editTranslated(key: string, options?: MessageOptions | (MessageOptions & { split?: false }) | MessageAdditions): Promise<Message>;
		editTranslated(key: string, options?: MessageOptions & { split: true | SplitOptions }): Promise<Message[]>;
		editTranslated(
			key: string,
			valuesOrOptions?: readonly unknown[] | MessageOptions | MessageAdditions,
			rawOptions?: MessageOptions
		): Promise<Message | Message[]>;
	}

	export interface Channel {
		/**
		 * Accessor for {@link I18nextPlugin#fetchLanguage} that implements an order of preference for locales.
		 * @since 1.0.0
		 * @return In preference order, {@link I18nextPlugin#fetchLanguage} -> the guild's preferredLocale -> {@link I18nextOptions#defaultName} -> 'en-US'.
		 */
		fetchLanguage(): Promise<string>;

		/**
		 * Function that gets a TFunction (translator function) from i18next.
		 * @since 1.0.0
		 * @return An i18next TFunction.
		 */
		fetchT(): Promise<TFunction>;

		/**
		 * Function that resolves a language key from the store.
		 * @since 1.0.0
		 * @return A string, which is the translated result of the key, with templated values.
		 */
		resolveKey(key: string, ...values: readonly any[]): Promise<string>;

		/**
		 * Function that sends a message for the channel with the translated key and values.
		 * Functionally equivalent to piping resolveKey through Channel#send.
		 * @since 1.0.0
		 * @return The message object that was sent.
		 */
		sendTranslated(
			key: string,
			values?: readonly unknown[],
			options?: MessageOptions | (MessageOptions & { split?: false }) | MessageAdditions
		): Promise<Message>;
		sendTranslated(key: string, values?: readonly unknown[], options?: MessageOptions & { split: true | SplitOptions }): Promise<Message[]>;
		sendTranslated(key: string, options?: MessageOptions | (MessageOptions & { split?: false }) | MessageAdditions): Promise<Message>;
		sendTranslated(key: string, options?: MessageOptions & { split: true | SplitOptions }): Promise<Message[]>;
		sendTranslated(
			key: string,
			valuesOrOptions?: readonly unknown[] | MessageOptions | MessageAdditions,
			rawOptions?: MessageOptions
		): Promise<Message | Message[]>;
	}

	export interface Guild {
		/**
		 * Accessor for {@link I18nextPlugin#fetchLanguage} that implements an order of preference for locales.
		 * @since 1.0.0
		 * @return In preference order, {@link I18nextPlugin#fetchLanguage} -> the guild's preferredLocale -> {@link I18nextOptions#defaultName} -> 'en-US'.
		 */
		fetchLanguage(): Promise<string>;

		/**
		 * Function that gets a TFunction (translator function) from i18next.
		 * @since 1.0.0
		 * @return An i18next TFunction.
		 */
		fetchT(): Promise<TFunction>;

		/**
		 * Function that resolves a language key from the store.
		 * @since 1.0.0
		 * @return A string, which is the translated result of the key, with templated values.
		 */
		resolveKey(key: string, ...values: readonly any[]): Promise<string>;
	}

	export interface Client {
		/**
		 * See: {@link I18nextHandler}
		 * @since 1.0.0
		 */
		i18n: I18nextHandler;

		/**
		 * The method to be overriden by the developer.
		 * Note: In the event that fetchLanguage is not defined or returns null or undefined
		 * the order of defaulting will be as follows:
		 * client.fetchLanguage -> message.guild.preferredLocale -> this.client.options.i18n.defaultName -> 'en-US'
		 * @since 1.0.0
		 * @return A string for the desired language or null for no match.
		 * @example
		 * ```typescript
		 * // Always use the same language (no per-guild configuration):
		 * client.fetchLanguage = () => 'en-US';
		 * ```
		 * @example
		 * ```typescript
		 * // Retrieving the prefix from an SQL database:
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
		fetchLanguage: (context: I18nContext) => Promise<string | null> | string | null;
	}

	export interface ClientOptions {
		/**
		 * See: {@link I18nOptions}
		 * @since 1.0.0
		 */
		i18n?: I18nOptions;

		/**
		 * Hook that returns the name of a language, or {@link I18nOptions#defaultName} by default.
		 * @since 1.0.0
		 * @default () => client.options.defaultLanguage
		 */
		fetchLanguage?: (context: I18nContext) => Promise<string | null> | string | null;
	}
}
