import './register';
export * from './register';
import type { TFunction } from 'i18next';
import type { I18nextHandler, I18nOptions } from './index';
import { Message, MessageAdditions, MessageOptions, SplitOptions, Structures } from 'discord.js';

class I18nextMessage extends Structures.get('Message') {
	public async fetchLanguage(): Promise<string> {
		const lang = await this.client.fetchLanguage(this);
		return lang ?? this.guild?.preferredLocale ?? this.client.options.i18n?.defaultName ?? 'en-US';
	}

	public async fetchT(): Promise<TFunction> {
		return this.client.i18n.fetchT(await this.fetchLanguage());
	}

	public async resolveKey(key: string, ...values: readonly any[]): Promise<string> {
		return this.client.i18n.fetchLocale(await this.fetchLanguage(), key, ...values);
	}

	public translated(
		key: string,
		values?: readonly unknown[],
		options?: MessageOptions | (MessageOptions & { split?: false }) | MessageAdditions,
		edit?: Boolean
	): Promise<Message>;

	public translated(key: string, values?: readonly unknown[], options?: MessageOptions & { split: true | SplitOptions }): Promise<Message[]>;
	public translated(key: string, options?: MessageOptions | (MessageOptions & { split?: false }) | MessageAdditions): Promise<Message>;
	public translated(key: string, options?: MessageOptions & { split: true | SplitOptions }): Promise<Message[]>;
	public async translated(
		key: string,
		valuesOrOptions?: readonly unknown[] | MessageOptions | MessageAdditions,
		rawOptions?: MessageOptions,
		edit?: Boolean
	): Promise<Message | Message[]> {
		const [values, options]: [readonly unknown[], MessageOptions] =
			valuesOrOptions === undefined || Array.isArray(valuesOrOptions)
				? [valuesOrOptions ?? [], rawOptions ?? {}]
				: [[], valuesOrOptions as MessageOptions];
		const content = await this.resolveKey(key, ...values);
		if (edit) return this.edit(content, options);
		return this.channel.send(content, options);
	}
}

Structures.extend('Message', () => I18nextMessage);

declare module 'discord.js' {
	interface Message {
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
		 * Function that sends or edits a message for the context channel with the translated key and values.
		 * Functionally equivalent to piping fetchLanguageKey through channel#send or message#edit.
		 * @since 1.0.0
		 * @return The message object that was sent or edited.
		 * @param edit Whether to attempt to edit the message object or send a new one.
		 */
		translated(
			key: string,
			values?: readonly unknown[],
			options?: MessageOptions | (MessageOptions & { split?: false }) | MessageAdditions,
			edit?: Boolean
		): Promise<Message>;
		translated(key: string, values?: readonly unknown[], options?: MessageOptions & { split: true | SplitOptions }): Promise<Message[]>;
		translated(key: string, options?: MessageOptions | (MessageOptions & { split?: false }) | MessageAdditions): Promise<Message>;
		translated(key: string, options?: MessageOptions & { split: true | SplitOptions }): Promise<Message[]>;
		translated(
			key: string,
			valuesOrOptions?: readonly unknown[] | MessageOptions | MessageAdditions,
			rawOptions?: MessageOptions,
			edit?: Boolean
		): Promise<Message | Message[]>;
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
		fetchLanguage: (message: any) => Promise<string | null> | string | null;
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
		fetchLanguage?: (message: any) => Promise<string | null> | string | null;
	}
}
