import { getRootData } from '@sapphire/pieces';
import { Awaited, isFunction, mergeDefault } from '@sapphire/utilities';
import { opendir } from 'fs/promises';
import i18next, { InitOptions, StringMap, TFunction, TOptions } from 'i18next';
import Backend, { i18nextFsBackend } from 'i18next-fs-backend';
import { join } from 'path';
import type { I18nOptions } from './types/options';

/**
 * A generalised class for handling `i18next` JSON files and their discovery.
 * @since 1.0.0
 */
export class I18nextHandler {
	/**
	 * Describes whether `I18nextHandler#init` has been run and languages are loaded in `I18nextHandler.languages`.
	 * @since 1.0.0
	 */
	public languagesLoaded = false;

	/**
	 * A `Map` of `i18next` language functions keyed by their language code.
	 * @since 1.0.0
	 */
	public readonly languages = new Map<string, TFunction>();

	/**
	 * The options I18nextHandler was initialized with in the client.
	 * @since 1.0.0
	 */
	public readonly options?: I18nOptions;

	/**
	 * The director passed to `i18next-fs-backend`.
	 * Also used in {@link I18nextHandler#walkLanguageDirectory}.
	 * @since 1.2.0
	 */
	public readonly languagesDir: string;

	/**
	 * The backend options for `i18next-fs-backend` used by `i18next`.
	 * @since 1.0.0
	 * @protected
	 */
	protected readonly backendOptions: i18nextFsBackend.i18nextFsBackendOptions;

	/**
	 * @param options The options that `i18next`, `i18next-fs-backend`, and {@link I18nextHandler} should use.
	 * @since 1.0.0
	 * @constructor
	 */
	public constructor(options?: I18nOptions) {
		this.options = options;
		this.languagesDir = this.options?.defaultLanguageDirectory ?? join(getRootData().root, 'languages');

		this.backendOptions = mergeDefault(
			{
				loadPath: join(this.languagesDir, '{{lng}}', '{{ns}}.json'),
				addPath: this.languagesDir
			} as i18nextFsBackend.i18nextFsBackendOptions,
			this.options?.backend
		);
	}

	/**
	 * Intitialises the handler by loading in the namespaces, passing the data to i18next, and filling in the {@link I18nextHandler#languages}.
	 * @since 1.0.0
	 */
	public async init() {
		const { namespaces, languages } = await this.walkLanguageDirectory(this.languagesDir);

		i18next.use(Backend);
		await i18next.init(
			mergeDefault(
				{
					backend: this.backendOptions,
					fallbackLng: this.options?.defaultName ?? 'en-US',
					initImmediate: false,
					interpolation: {
						escapeValue: false
					},
					load: 'all',
					defaultNS: this.options?.defaultNS ?? 'default',
					ns: namespaces,
					preload: languages
				} as InitOptions,
				isFunction(this.options?.i18next) ? this.options?.i18next(namespaces, languages) : this.options?.i18next
			)
		);

		for (const item of languages) {
			this.languages.set(item, i18next.getFixedT(item));
		}
		this.languagesLoaded = true;
	}

	/**
	 * Retrieve a raw TFunction from the passed locale.
	 * @param locale The language to be used.
	 * @since 1.0.0
	 */
	public fetchT(locale: string) {
		if (!this.languagesLoaded) throw new Error('Cannot call this method until I18nextHandler#init has been called');

		const t = this.languages.get(locale);
		if (t) return t;
		throw new ReferenceError('Invalid language provided');
	}

	/**
	 * Resolves a localised string from a language code, key, optional replaceables, and optional i18next options.
	 * @param locale The language to be used.
	 * @param key The key that should be translated.
	 * @param replace The replaceable keys in translation string.
	 * @param options i18next language options.
	 * @since 1.0.0
	 */
	public fetchLocale(locale: string, key: string, replace?: Record<string, unknown>, options?: TOptions<StringMap>): Awaited<string> {
		if (!this.languagesLoaded) throw new Error('Cannot call this method until I18nextHandler#init has been called');

		const language = this.languages.get(locale);
		if (!language) throw new ReferenceError('Invalid language provided');

		return language(
			key,
			mergeDefault(
				{
					defaultValue: language(this.options?.defaultMissingKey ?? 'default:default', { replace: { key } }),
					replace
				},
				options
			)
		);
	}

	/**
	 * @description Skips any files that don't end with `.json`.
	 * @param dir The directory that should be walked.
	 * @param namespaces The currently known namespaces.
	 * @param current The directory currently being traversed.
	 * @since 1.0.0
	 */
	public async walkLanguageDirectory(dir: string, namespaces: string[] = [], current = '') {
		const directory = await opendir(dir);

		const languages: string[] = [];
		for await (const entry of directory) {
			const fn = entry.name;
			if (entry.isDirectory()) {
				// This structure may very well be changed in future.
				// See i18next/i18next-fs-backend#13
				const isLanguage = fn.includes('-');
				if (isLanguage) languages.push(fn);

				({ namespaces } = await this.walkLanguageDirectory(join(dir, fn), namespaces, isLanguage ? '' : `${fn}/`));
			} else if (entry.name.endsWith('.json')) {
				namespaces.push(`${current}${fn.substr(0, fn.length - 5)}`);
			}
		}

		return { namespaces: [...new Set(namespaces)], languages };
	}
}
