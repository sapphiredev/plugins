import { container } from '@sapphire/pieces';
import { lazy, type NonNullObject } from '@sapphire/utilities';
import { Locale, type LocaleString, type LocalizationMap } from 'discord-api-types/v10';
import { BaseCommandInteraction, Guild, Message, MessageComponentInteraction } from 'discord.js';
import type { StringMap, TFunctionKeys, TFunctionResult, TOptions } from 'i18next';
import type {
	BuilderWithDescription,
	BuilderWithName,
	BuilderWithNameAndDescription,
	InternationalizationContext,
	LocalizedData,
	Target
} from './types';

/**
 * Retrieves the language name for a specific target, using {@link InternationalizationHandler.fetchLanguage}.
 * If {@link InternationalizationHandler.fetchLanguage} is not defined or this function returns a nullish value,
 * then there will be a series of fallback attempts in the following descending order:
 * 1. Returns {@link Guild.preferredLocale}.
 * 2. Returns {@link InternationalizationOptions.defaultName} if no guild was provided.
 * 3. Returns `'en-US'` if nothing else was found.
 * @since 2.0.0
 * @param target The target to fetch the language from.
 * @see {@link resolveLanguage}
 * @returns The name of the language key.
 */
export function fetchLanguage(target: Target): Promise<string> {
	// Handle Interactions:
	if (target instanceof BaseCommandInteraction || target instanceof MessageComponentInteraction) {
		return resolveLanguage({
			user: target.user,
			channel: target.channel,
			guild: target.guild,
			interactionGuildLocale: target.guildLocale,
			interactionLocale: target.locale
		});
	}

	// Handle Message:
	if (target instanceof Message) {
		return resolveLanguage({ user: target.author, channel: target.channel, guild: target.guild });
	}

	// Handle Guild:
	if (target instanceof Guild) {
		return resolveLanguage({ user: null, channel: null, guild: target });
	}

	// Handle DMChannel:
	if (target.type === 'DM') {
		return resolveLanguage({ user: null, channel: target, guild: null });
	}

	// Handle any other channel:
	return resolveLanguage({ user: null, channel: target, guild: target.guild });
}

/**
 * Retrieves the language-assigned function from i18next designated to a target's preferred language code.
 * @since 2.0.0
 * @param target The target to fetch the language from.
 * @returns The language function from i18next.
 */
export async function fetchT(target: Target) {
	return container.i18n.getT(await fetchLanguage(target));
}

/**
 * Resolves a key and its parameters.
 * @since 2.0.0
 * @param target The target to fetch the language key from.
 * @param key The i18next key.
 * @param options The options to be passed to TFunction.
 * @returns The data that `key` held, processed by i18next.
 */
export async function resolveKey<
	TResult extends TFunctionResult = string,
	TKeys extends TFunctionKeys = string,
	TInterpolationMap extends NonNullObject = StringMap
>(target: Target, key: TKeys | TKeys[], options?: TOptions<TInterpolationMap>): Promise<TResult> {
	return container.i18n.format(typeof options?.lng === 'string' ? options.lng : await fetchLanguage(target), key, options);
}

/**
 * @internal
 */
async function resolveLanguage(context: InternationalizationContext): Promise<string> {
	const lang = await container.i18n.fetchLanguage(context);
	return lang ?? context.guild?.preferredLocale ?? container.i18n.options.defaultName ?? 'en-US';
}

const supportedLanguages = new Set(Object.values(Locale)) as ReadonlySet<LocaleString>;
function isSupportedDiscordLocale(language: string): language is LocaleString {
	return supportedLanguages.has(language as LocaleString);
}

const getLocales = lazy(() => {
	const locales = new Map(container.i18n.languages);
	for (const [locale] of locales) {
		if (!isSupportedDiscordLocale(locale)) {
			process.emitWarning('Unsupported Discord locale', {
				code: 'UNSUPPORTED_LOCALE',
				detail: `'${locale}' is not assignable to type LocaleString`
			});
			locales.delete(locale);
		}
		continue;
	}
	return locales;
});
const getDefaultT = lazy(() => {
	const defaultLocale = container.i18n.options.defaultName ?? 'en-US';
	if (!isSupportedDiscordLocale(defaultLocale))
		throw new TypeError(`Unsupported Discord locale\n'${defaultLocale}' is not assignable to type LocaleString`);
	const defaultT = getLocales().get(defaultLocale);
	if (defaultT) return defaultT;
	throw new TypeError(`Could not find ${defaultLocale}`);
});

/**
 * Gets the value and the localizations from a language key.
 * @param key The key to get the localizations from.
 * @returns The retrieved data.
 * @remarks This should be called **strictly** after loading the locales.
 */
export function getLocalizedData(key: TFunctionKeys): LocalizedData {
	const locales = getLocales();
	const defaultT = getDefaultT();

	return {
		value: defaultT(key),
		localizations: Object.fromEntries(Array.from(locales, ([locale, t]) => [locale, t(key)]))
	};
}

/**
 * Applies the localized names on the builder, calling `setName` and `setNameLocalizations`.
 * @param builder The builder to apply the localizations to.
 * @param key The key to get the localizations from.
 * @returns The updated builder.
 */
export function applyNameLocalizedBuilder<T extends BuilderWithName>(builder: T, key: TFunctionKeys) {
	const result = getLocalizedData(key);
	return builder.setName(result.value).setNameLocalizations(result.localizations);
}

/**
 * Applies the localized descriptions on the builder, calling `setDescription` and `setDescriptionLocalizations`.
 * @param builder The builder to apply the localizations to.
 * @param key The key to get the localizations from.
 * @returns The updated builder.
 */
export function applyDescriptionLocalizedBuilder<T extends BuilderWithDescription>(builder: T, key: TFunctionKeys) {
	const result = getLocalizedData(key);
	return builder.setDescription(result.value).setDescriptionLocalizations(result.localizations);
}

/**
 * Applies the localized names and descriptions on the builder, calling {@link applyNameLocalizedBuilder} and
 * {@link applyDescriptionLocalizedBuilder}.
 * @param builder The builder to apply the localizations to.
 * @param params The root key or the key for the name and description keys.
 * @returns The updated builder.
 * @remarks If only 2 parameters were passed, `name` will be defined as `${root}Name` and `description` as
 * `${root}Description`, being `root` the second parameter in the function, after `builder`.
 */
export function applyLocalizedBuilder<T extends BuilderWithNameAndDescription>(
	builder: T,
	...params: [root: string] | [name: TFunctionKeys, description: TFunctionKeys]
): T {
	const [localeName, localeDescription] =
		params.length === 1 ? [`${params[0]}Name` as TFunctionKeys, `${params[0]}Description` as TFunctionKeys] : params;

	applyNameLocalizedBuilder(builder, localeName);
	applyDescriptionLocalizedBuilder(builder, localeDescription);
	return builder;
}

export function createSelectMenuChoiceName<V extends NonNullObject>(key: TFunctionKeys, value?: V): createSelectMenuChoiceName.Result<V> {
	const result = getLocalizedData(key);
	return {
		...value,
		name: result.value,
		name_localizations: result.localizations
	} as createSelectMenuChoiceName.Result<V>;
}

export namespace createSelectMenuChoiceName {
	export type Result<V> = V & {
		name: string;
		name_localizations: LocalizationMap;
	};
}
