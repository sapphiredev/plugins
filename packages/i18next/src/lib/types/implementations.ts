import type { TFunction } from 'i18next';

export interface I18nextBaseImplementation {
	/**
	 * @since 1.0.0
	 * @default {@link I18nextClient.fetchLanguage} -> {@link I18nextGuildContext.preferredLocale} -> {@link I18nOptions.defaultName} -> 'en-US'
	 * @see {@link I18nextClient.fetchLanguage}
	 */
	fetchLanguage(): Promise<string>;

	/**
	 * @since 1.0.0
	 * @return An i18next [TFunction](https://www.i18next.com/overview/api#t).
	 */
	fetchT(): Promise<TFunction>;

	/**
	 * Function that resolves a language key from the store.
	 * @since 1.0.0
	 * @return A string, which is the translated result of the key, with templated values.
	 */
	resolveKey(key: string, ...values: readonly any[]): Promise<string>;
}

export interface I18nextGuildImplementation extends I18nextBaseImplementation {}

export interface I18nextChannelImplementation extends I18nextBaseImplementation {
	/**
	 * Function that sends a message for the channel with the translated key and values.
	 * Functionally equivalent to piping {@link I18nextBaseImplementation.resolveKey} through the channel's message send method.
	 * @since 1.0.0
	 * @return The message that was sent.
	 */
	sendTranslated(key: string, values?: readonly unknown[], options?: unknown): Promise<I18nextMessageImplementation>;
}

export interface I18nextMessageImplementation extends I18nextBaseImplementation {
	/**
	 * Function that sends a response message for the context channel with the translated key and values.
	 * Functionally equivalent to piping {@link I18nextBaseImplementation.resolveKey} through the message's reply method.
	 * @since 1.0.0
	 * @return The message that was sent.
	 */
	replyTranslated(key: string, values?: readonly unknown[], options?: unknown): Promise<I18nextMessageImplementation>;

	/**
	 * Function that edits a message with the translated key and values.
	 * Functionally equivalent to piping {@link I18nextBaseImplementation.resolveKey} through the message's edit method.
	 * @since 1.0.0
	 * @return The message that was edited.
	 */
	editTranslated(key: string, values?: readonly unknown[], options?: unknown): Promise<I18nextMessageImplementation>;
}
