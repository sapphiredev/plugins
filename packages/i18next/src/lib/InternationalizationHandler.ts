import { Result } from '@sapphire/framework';
import { container, getRootData } from '@sapphire/pieces';
import { Awaitable, isFunction, NonNullObject } from '@sapphire/utilities';
import { Backend, PathResolvable } from '@skyra/i18next-backend';
import i18next, { TFunction, TOptions } from 'i18next';
import type { PathLike } from 'node:fs';
import { opendir } from 'node:fs/promises';
import { join } from 'node:path';
import type { InternationalizationContext, InternationalizationOptions, StringMap, TFunctionKeys, TFunctionResult } from './types';

/**
 * A generalized class for handling `i18next` JSON files and their discovery.
 * @since 1.0.0
 */
export class InternationalizationHandler {
	/**
	 * Describes whether {@link InternationalizationHandler.init} has been run and languages are loaded in {@link InternationalizationHandler.languages}.
	 * @since 1.0.0
	 */
	public languagesLoaded = false;

	/**
	 * A `Set` of initially loaded namespaces.
	 * @since 1.2.0
	 */
	public namespaces = new Set<string>();

	/**
	 * A `Map` of `i18next` language functions keyed by their language code.
	 * @since 1.0.0
	 */
	public readonly languages = new Map<string, TFunction>();

	/**
	 * The options InternationalizationHandler was initialized with in the client.
	 * @since 1.0.0
	 */
	public readonly options: InternationalizationOptions;

	/**
	 * The director passed to `@skyra/i18next-backend`.
	 * Also used in {@link InternationalizationHandler.walkLanguageDirectory}.
	 * @since 1.2.0
	 */
	public readonly languagesDirectory: string;

	/**
	 * The backend options for `@skyra/i18next-backend` used by `i18next`.
	 * @since 1.0.0
	 */
	protected readonly backendOptions: Backend.Options;

	/**
	 * @param options The options that `i18next`, `@skyra/i18next-backend`, and {@link InternationalizationHandler} should use.
	 * @since 1.0.0
	 * @constructor
	 */
	public constructor(options?: InternationalizationOptions) {
		this.options = options ?? { i18next: { ignoreJSONStructure: false } };
		this.languagesDirectory =
			this.options.defaultLanguageDirectory ??
			// FIXME: This is a bypass until this plugin is updated for Sapphire v3 because during building docs it already considers `baseUserDirectory` as potentially an `URL`
			join((container.client?.options?.baseUserDirectory as string | null | undefined) ?? (getRootData().root as string), 'languages');

		const languagePaths = new Set<PathResolvable>([
			join(this.languagesDirectory, '{{lng}}', '{{ns}}.json'), //
			...(options?.backend?.paths ?? [])
		]);

		this.backendOptions = {
			paths: [...languagePaths],
			...this.options.backend
		};

		if (isFunction(this.options.fetchLanguage)) {
			this.fetchLanguage = this.options.fetchLanguage;
		}
	}

	/**
	 * The method to be overridden by the developer.
	 *
	 * @note In the event that fetchLanguage is not defined or returns null / undefined, the defaulting from {@link fetchLanguage} will be used.
	 * @since 2.0.0
	 * @return A string for the desired language or null for no match.
	 * @see {@link fetchLanguage}
	 * @example
	 * ```typescript
	 * // Always use the same language (no per-guild configuration):
	 * container.i18n.fetchLanguage = () => 'en-US';
	 * ```
	 * @example
	 * ```typescript
	 * // Retrieving the language from an SQL database:
	 * container.i18n.fetchLanguage = async (context) => {
	 *   const guild = await driver.getOne('SELECT language FROM public.guild WHERE id = $1', [context.guild.id]);
	 *   return guild?.language ?? 'en-US';
	 * };
	 * ```
	 * @example
	 * ```typescript
	 * // Retrieving the language from an ORM:
	 * container.i18n.fetchLanguage = async (context) => {
	 *   const guild = await driver.getRepository(GuildEntity).findOne({ id: context.guild.id });
	 *   return guild?.language ?? 'en-US';
	 * };
	 * ```
	 * @example
	 * ```typescript
	 * // Retrieving the language on a per channel basis, e.g. per user or guild channel (ORM example but same principles apply):
	 * container.i18n.fetchLanguage = async (context) => {
	 *   const channel = await driver.getRepository(ChannelEntity).findOne({ id: context.channel.id });
	 *   return channel?.language ?? 'en-US';
	 * };
	 * ```
	 */
	public fetchLanguage: (context: InternationalizationContext) => Awaitable<string | null> = () => null;

	/**
	 * Initializes the handler by loading in the namespaces, passing the data to i18next, and filling in the {@link InternationalizationHandler#languages}.
	 * @since 1.0.0
	 */
	public async init() {
		const { namespaces, languages } = await this.walkRootDirectory(this.languagesDirectory);
		const userOptions = isFunction(this.options.i18next) ? this.options.i18next(namespaces, languages) : this.options.i18next;
		const ignoreJSONStructure = userOptions?.ignoreJSONStructure ?? false;
		const skipOnVariables = userOptions?.interpolation?.skipOnVariables ?? false;

		i18next.use(Backend);
		await i18next.init({
			backend: this.backendOptions,
			fallbackLng: this.options.defaultName ?? 'en-US',
			initImmediate: false,
			interpolation: {
				escapeValue: false,
				...userOptions?.interpolation,
				skipOnVariables
			},
			load: 'all',
			defaultNS: 'default',
			ns: namespaces,
			preload: languages,
			...userOptions,
			ignoreJSONStructure
		});

		this.namespaces = new Set(namespaces);
		for (const item of languages) {
			this.languages.set(item, i18next.getFixedT(item));
		}
		this.languagesLoaded = true;

		const formatters = this.options.formatters ?? [];
		for (const { name, format } of formatters) {
			i18next.services.formatter!.add(name, format);
		}
	}

	/**
	 * Retrieve a raw TFunction from the passed locale.
	 * @param locale The language to be used.
	 * @since 1.0.0
	 */
	public getT(locale: string) {
		if (!this.languagesLoaded) throw new Error('Cannot call this method until InternationalizationHandler#init has been called');

		const t = this.languages.get(locale);
		if (t) return t;
		throw new ReferenceError('Invalid language provided');
	}

	/**
	 * Localizes a content given one or more keys and i18next options.
	 * @since 2.0.0
	 * @param locale The language to be used.
	 * @param key The key or keys to retrieve the content from.
	 * @param options The interpolation options.
	 * @see {@link https://www.i18next.com/overview/api#t}
	 * @returns The localized content.
	 */
	public format<
		TResult extends TFunctionResult = string,
		TKeys extends TFunctionKeys = string,
		TInterpolationMap extends NonNullObject = StringMap
	>(locale: string, key: TKeys | TKeys[], options?: TOptions<TInterpolationMap>): TResult {
		if (!this.languagesLoaded) throw new Error('Cannot call this method until InternationalizationHandler#init has been called');

		const language = this.languages.get(locale);
		if (!language) throw new ReferenceError('Invalid language provided');

		const missingHandlers = this.options.defaultMissingKey
			? { defaultValue: language(this.options.defaultMissingKey, { replace: { key } }) }
			: undefined;

		return language(key, { ...missingHandlers, ...options }) as TResult;
	}

	/**
	 * @param directory The directory that should be walked.
	 * @since 3.0.0
	 */
	public async walkRootDirectory(directory: PathLike) {
		const languages = new Set<string>();
		const namespaces = new Set<string>();

		const dir = await opendir(directory);
		for await (const entry of dir) {
			// If the entry is not a directory, skip:
			if (!entry.isDirectory()) continue;

			// Load the directory:
			languages.add(entry.name);

			for await (const namespace of this.walkLocaleDirectory(join(dir.path, entry.name), '')) {
				namespaces.add(namespace);
			}
		}

		return { namespaces: [...namespaces], languages: [...languages] };
	}

	public async reloadResources() {
		const result = await Result.fromAsync(async () => {
			let languages = this.options.hmr?.languages;
			let namespaces = this.options.hmr?.namespaces;
			if (!languages || !namespaces) {
				const languageDirectoryResult = await this.walkRootDirectory(this.languagesDirectory);
				languages ??= languageDirectoryResult.languages;
				namespaces ??= languageDirectoryResult.namespaces;
			}

			await i18next.reloadResources(languages, namespaces);
			container.logger.info('[i18next-Plugin] Reloaded language resources.');
		});

		result.inspectErr((error) => container.logger.error('[i18next-Plugin]: Failed to reload language resources.', error));
	}

	/**
	 * @description Skips any files that don't end with `.json`.
	 * @param directory The directory that should be walked.
	 * @param ns The current namespace.
	 * @since 3.0.0
	 */
	private async *walkLocaleDirectory(directory: string, ns: string): AsyncGenerator<string> {
		const dir = await opendir(directory);
		for await (const entry of dir) {
			if (entry.isDirectory()) {
				yield* this.walkLocaleDirectory(join(dir.path, entry.name), `${ns}${entry.name}/`);
			} else if (entry.isFile() && entry.name.endsWith('.json')) {
				yield `${ns}${entry.name.slice(0, -5)}`;
			}
		}
	}
}
