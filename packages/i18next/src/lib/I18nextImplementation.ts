/* eslint-disable @typescript-eslint/naming-convention */
import type { Ctor } from '@sapphire/utilities';
import type { TFunction } from 'i18next';
import type { I18nAuthorContext, I18nChannelContext, I18nContext, I18nextBaseImplementation, I18nextClient, I18nGuildContext } from './types/index';

/**
 * @since 1.0.0
 * @returns An I18nextImplementation mixin which extends the Base parameter and fully implements {@link I18nextBaseImplementation}.
 * @param Base The class to use as the base for the implementation (e.g. a Discord library's Message object)
 */
export function I18nextImplemented<BaseClass extends Ctor<any[], { client: I18nextClient }>>(Base: BaseClass) {
	/**
	 * The class that defines the base / default implementations of the plugin.
	 * This class is used to extend the {@link I18nContext} objects for registers.
	 * @since 1.0.0
	 **/
	return class I18nextImplementation extends Base implements I18nextBaseImplementation {
		/**
		 * Accessor for {@link I18nextClient.fetchLanguage} with context applied.
		 * To use this in an implementation, create a new function called `fetchLanguage` and execute this with context applied.
		 * This can be overwritten if you want to specify a different order of defaulting.
		 * @since 1.0.0
		 * @see {@link I18nextBaseImplementation.fetchLanguage}
		 **/
		public async _fetchLanguage(
			guild?: I18nGuildContext | null,
			channel?: I18nChannelContext | null,
			author?: I18nAuthorContext | null
		): Promise<string> {
			const lang = await this.client.fetchLanguage({
				guild,
				channel,
				author
			} as I18nContext);
			return lang ?? guild?.preferredLocale ?? this.client.i18n?.options?.defaultName ?? 'en-US';
		}

		/**
		 * Method to be overwritten to apply context to {@link I18nextImplementation._fetchLanguage}
		 * @since 1.0.0
		 */
		public async fetchLanguage(): Promise<string> {
			return this._fetchLanguage();
		}

		/**
		 * @since 1.0.0
		 * @see {@link I18nextBaseImplementation.resolveKey}
		 */
		public async fetchT(): Promise<TFunction> {
			return this.client.i18n.fetchT(await this.fetchLanguage());
		}

		/**
		 * @since 1.0.0
		 * @see {@link I18nextBaseImplementation.resolveKey}
		 */
		public async resolveKey(key: string, ...values: readonly any[]): Promise<string> {
			return this.client.i18n.fetchLocale(await this.fetchLanguage(), key, ...values);
		}
	};
}
