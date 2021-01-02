/**
 * Context for fetchLanguage functions.
 * This context enables implementation of per-guild, per-channel, and per-user localisation.
 */
export interface I18nContext {
	guild: Record<string, unknown> | undefined;
	channel: Record<string, unknown> | undefined;
	author: Record<string, unknown> | undefined;
}
