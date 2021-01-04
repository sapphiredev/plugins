import type { I18nextHandler, I18nContext, I18nOptions } from '../../index';

export interface I18nextClient {
	i18n: I18nextHandler;

	/**
	 * The method to be overriden by the developer.
	 * Note: In the event that fetchLanguage is not defined or returns
	 * null / undefined, the defaulting from {@link I18nextBaseImplementation.fetchLanguage} will be used.
	 * @since 1.0.0
	 * @return A string for the desired language or null for no match.
	 * @see {@link I18nextBaseImplementation.fetchLanguage}
	 * @example
	 * ```typescript
	 * // Always use the same language (no per-guild configuration):
	 * client.fetchLanguage = () => 'en-US';
	 * ```
	 * @example
	 * ```typescript
	 * // Retrieving the language from an SQL database:
	 * client.fetchLanguage = async (context) => {
	 *   const guild = await driver.getOne('SELECT language FROM public.guild WHERE id = $1', [context.guild.id]);
	 *   return guild?.language ?? 'en-US';
	 * };
	 * ```
	 * @example
	 * ```typescript
	 * // Retrieving the language from an ORM:
	 * client.fetchLanguage = async (context) => {
	 *   const guild = await driver.getRepository(GuildEntity).findOne({ id: context.guild.id });
	 *   return guild?.language ?? 'en-US';
	 * };
	 * ```
	 * @example
	 * ```typescript
	 * // Retrieving the language on a per channel basis, e.g. per user or guild channel (ORM example but same principles apply):
	 * client.fetchLanguage = async (context) => {
	 *   const channel = await driver.getRepository(ChannelEntity).findOne({ id: context.channel.id });
	 *   return channel?.language ?? 'en-US';
	 * };
	 * ```
	 */
	fetchLanguage: (context: I18nContext) => Promise<string | null> | string | null;
}

export interface I18nextClientOptions {
	i18n?: I18nOptions;

	/**
	 * Hook that returns the name of a language. Should correspond to {@link I18nextClient.fetchLanguage}.
	 * @since 1.0.0
	 * @default () => {@link I18nOptions.defaultName}
	 */
	fetchLanguage?: (context: I18nContext) => Promise<string | null> | string | null;
}
