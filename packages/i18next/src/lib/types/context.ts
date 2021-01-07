/**
 * Context for the guild, used in fetchLanguage functions.
 * Should be an extension of your framework's Guild object, or the corresponding I18n extension.
 */
export interface I18nGuildContext {
	/**
	 * The preferred language for the guild context. Used as part of the default chain for {@link I18nextBaseImplementation.fetchLanguage}.
	 * @since 1.0.0
	 */
	preferredLocale: string;
}

/**
 * Context for the channel, used in {@link I18nextBaseImplementation.fetchLanguage} functions.
 * Should be an extension of your framework's Channel object, or the corresponding I18n extension.
 */
export interface I18nChannelContext {}

/**
 * Context for the user sending a message, used in {@link I18nextBaseImplementation.fetchLanguage} functions.
 * Should be an extension of your framework's User object, or the corresponding I18n extension.
 */
export interface I18nAuthorContext {}

/**
 * Context for {@link I18nextBaseImplementation.fetchLanguage} functions.
 * This context enables implementation of per-guild, per-channel, and per-user localisation.
 */
export interface I18nContext {
	guild?: I18nGuildContext;
	channel?: I18nChannelContext;
	author?: I18nAuthorContext;
}
