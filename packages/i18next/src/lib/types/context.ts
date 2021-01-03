export interface I18nGuildContext {}
export interface I18nChannelContext {}
export interface I18nAuthorContext {}

/**
 * Context for fetchLanguage functions.
 * This context enables implementation of per-guild, per-channel, and per-user localisation.
 */
export interface I18nContext {
	guild?: I18nGuildContext;
	channel?: I18nChannelContext;
	author?: I18nAuthorContext;
}
