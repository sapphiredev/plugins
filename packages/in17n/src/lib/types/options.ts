import type { InitOptions } from 'i18next';
import type { i18nextFsBackend } from 'i18next-fs-backend';

/**
 * The options used in {@link In17nHandler}.
 * @since 1.0.0
 */
export interface In17nOptions {
	/**
	 * Used as the default 2nd to last fallback locale if no other is found.
	 * It's only followed by "en-US".
	 * @since 1.0.0
	 */
	defaultName?: string;
	/**
	 * The options passed to `backend` in `i18next.init`.
	 * @since 1.0.0
	 */
	backend?: i18nextFsBackend.i18nextFsBackendOptions;
	/**
	 * The options passed to `i18next.init`.
	 * @since 1.0.0
	 */
	i18next?: InitOptions;
	/**
	 * The directory in which "i18next-fs-backend" should search for files.
	 * Defaulted to "<rootDirectory>/languages".
	 * @since 1.0.0
	 */
	defaultLanguageDirectory?: string;
	/**
	 * The default value to be used if a specific language key isnt found.
	 * Defaulted to "default:default".
	 * @since 1.0.0
	 */
	defaultMissingKey?: string;
	/**
	 * The default NS that is prefixed to all keys that dont specify it.
	 * Defaulted to "default".
	 * @since 1.0.0
	 */
	defaultNS?: string;
}
