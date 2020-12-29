import { getRootData } from '@sapphire/pieces';
import { Awaited, mergeDefault } from '@sapphire/utilities';
import { readdir, stat as pStat } from 'fs/promises';
import i18next, { InitOptions, StringMap, TFunction, TOptions } from 'i18next';
import Backend, { i18nextFsBackend } from 'i18next-fs-backend';
import { join } from 'path';
import type { In17nOptions } from './types/options';

/**
 * A generalised class for handling `i18next` JSON files and their discovery.
 * @since 1.0.0
 */
export class In17nHandler {
	/**
	 * Describes whether `In17nHandler#init` has been run and languages are loaded in `In17nHandler.languages`.
	 * @since 1.0.0
	 */
	public languagesLoaded = false;

	/**
	 * A `Map` of `i18next` language functions keyed by their language code.
	 * @since 1.0.0
	 */
	public languages!: Map<string, TFunction>;

	private readonly options?: In17nOptions;

	private readonly languagesDir: string;
	private readonly backendOptions: i18nextFsBackend.i18nextFsBackendOptions;

	/**
	 * @param options The options that `i18next`, `i18next-fs-backend`, and {@link In17nHandler} should use.
	 * @since 1.0.0
	 * @constructor
	 */
	public constructor(options?: In17nOptions) {
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
	 * Intitialises the handler by loading in the namespaces, passing the data to i18next, and filling in the {@link In17nHandler#languages}.
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
				this.options?.i18next
			)
		);

		this.languages = new Map(languages.map((item) => [item, i18next.getFixedT(item)]));
		this.languagesLoaded = true;
	}

	/**
	 * Retrieve a raw TFunction from the passed locale.
	 * @param locale The language to be used.
	 * @since 1.0.0
	 */
	public fetchT(locale: string) {
		if (!this.languagesLoaded) throw new Error('Cannot call this method until In17nHandler#init has been called');

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
		if (!this.languagesLoaded) throw new Error('Cannot call this method until In17nHandler#init has been called');

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
	 * @param folderName The currently walked folder.
	 * @since 1.0.0
	 * @protected
	 */
	protected async walkLanguageDirectory(dir: string, namespaces: string[] = [], folderName = '') {
		const files = await readdir(dir);

		const languages: string[] = [];
		for (const file of files) {
			const stat = await pStat(join(dir, file));
			if (stat.isDirectory()) {
				const isLanguage = file.includes('-');
				if (isLanguage) languages.push(file);

				({ namespaces } = await this.walkLanguageDirectory(join(dir, file), namespaces, isLanguage ? '' : `${file}/`));
			} else if (file.endsWith('.json')) {
				namespaces.push(`${folderName}${file.substr(0, file.length - 5)}`);
			}
		}

		return { namespaces: [...new Set(namespaces)], languages };
	}
}
