import { container } from '@sapphire/pieces';
import { lazy } from '@sapphire/utilities';
import { BaseInteraction, ChannelType, Guild, Locale, Message, type APIApplicationCommandOptionChoice, type LocaleString } from 'discord.js';
import type {
	AppendKeyPrefix,
	DefaultNamespace,
	InterpolationMap,
	Namespace,
	ParseKeys,
	TFunctionReturn,
	TFunctionReturnOptionalDetails,
	TOptions
} from 'i18next';
import type {
	$Dictionary,
	$SpecialObject,
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
	if (target instanceof BaseInteraction) {
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

	// Handle DMChannel and GroupDMChannel:
	if (target.type === ChannelType.DM || target.type === ChannelType.GroupDM) {
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
	const Key extends ParseKeys<Ns, TOpt, undefined>,
	const TOpt extends TOptions = TOptions,
	Ret extends TFunctionReturn<Ns, AppendKeyPrefix<Key, undefined>, TOpt> = TOpt['returnObjects'] extends true ? $SpecialObject : string,
	Ns extends Namespace = DefaultNamespace,
	const ActualOptions extends TOpt & InterpolationMap<Ret> = TOpt & InterpolationMap<Ret>
>(target: Target, key: Key | Key[], options?: ActualOptions): Promise<TFunctionReturnOptionalDetails<Ret, TOpt>>;

/**
 * Resolves a key and its parameters.
 * @since 2.0.0
 * @param target The target to fetch the language key from.
 * @param key The i18next key.
 * @param options The interpolation options as well as a `defaultValue` for the key and any key/value pairs.
 * @returns The data that `key` held, processed by i18next.
 */
export async function resolveKey<
	const Key extends ParseKeys<Ns, TOpt, undefined>,
	const TOpt extends TOptions = TOptions,
	Ret extends TFunctionReturn<Ns, AppendKeyPrefix<Key, undefined>, TOpt> = TOpt['returnObjects'] extends true ? $SpecialObject : string,
	Ns extends Namespace = DefaultNamespace,
	const ActualOptions extends TOpt & InterpolationMap<Ret> = TOpt & InterpolationMap<Ret>
>(target: Target, key: string | string[], options: TOpt & $Dictionary & { defaultValue: string }): Promise<TFunctionReturnOptionalDetails<Ret, TOpt>>;

/**
 * Resolves a key and its parameters.
 * @since 2.0.0
 * @param target The target to fetch the language key from.
 * @param key The i18next key.
 * @param defaultValue The default value to use if the key is not found.
 * @param options The interpolation options.
 * @returns The data that `key` held, processed by i18next.
 */
export async function resolveKey<
	const Key extends ParseKeys<Ns, TOpt, undefined>,
	const TOpt extends TOptions = TOptions,
	Ret extends TFunctionReturn<Ns, AppendKeyPrefix<Key, undefined>, TOpt> = TOpt['returnObjects'] extends true ? $SpecialObject : string,
	Ns extends Namespace = DefaultNamespace,
	const ActualOptions extends TOpt & InterpolationMap<Ret> = TOpt & InterpolationMap<Ret>
>(target: Target, key: string | string[], defaultValue: string, options?: TOpt & $Dictionary): Promise<TFunctionReturnOptionalDetails<Ret, TOpt>>;

/**
 * Resolves a key and its parameters.
 * @since 2.0.0
 * @param target The target to fetch the language key from.
 *
 * @remark This function also has additional parameters for `key`, `defaultValue`, and `options`, however
 * TSDoc does not let us document those while matching proper implementation. See the overloads for this method
 * for the documentation on those parameters.
 *
 * @returns The data that `key` held, processed by i18next.
 */
export async function resolveKey<
	const Key extends ParseKeys<Ns, TOpt, undefined>,
	const TOpt extends TOptions = TOptions,
	Ret extends TFunctionReturn<Ns, AppendKeyPrefix<Key, undefined>, TOpt> = TOpt['returnObjects'] extends true ? $SpecialObject : string,
	Ns extends Namespace = DefaultNamespace,
	const ActualOptions extends TOpt & InterpolationMap<Ret> = TOpt & InterpolationMap<Ret>
>(
	target: Target,
	...[key, defaultValueOrOptions, optionsOrUndefined]:
		| [key: Key | Key[], options?: ActualOptions]
		| [key: string | string[], options: TOpt & $Dictionary & { defaultValue: string }]
		| [key: string | string[], defaultValue: string, options?: TOpt & $Dictionary]
): Promise<TFunctionReturnOptionalDetails<Ret, TOpt>> {
	const parsedOptions = typeof defaultValueOrOptions === 'string' ? optionsOrUndefined : defaultValueOrOptions;
	const language = typeof parsedOptions?.lng === 'string' ? parsedOptions.lng : await fetchLanguage(target);

	if (typeof defaultValueOrOptions === 'string') {
		return container.i18n.format<Key, TOpt, Ns, Ret, ActualOptions>(language, key, defaultValueOrOptions, optionsOrUndefined);
	}

	return container.i18n.format<Key, TOpt, Ns, Ret, ActualOptions>(language, key, undefined, defaultValueOrOptions);
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
				detail: `'${locale}' needs to be one of: ${[...locales.keys()]}`
			});

			locales.delete(locale);
		}

		continue;
	}

	return locales;
});

const getDefaultT = lazy(() => {
	const defaultLocale = container.i18n.options.defaultName ?? 'en-US';

	if (!isSupportedDiscordLocale(defaultLocale)) {
		throw new TypeError(`Unsupported Discord locale found:\n'${defaultLocale}' is not within the list of ${[...supportedLanguages]}`);
	}

	const defaultT = getLocales().get(defaultLocale);

	if (defaultT) {
		return defaultT;
	}

	throw new TypeError(`Could not find ${defaultLocale}`);
});

/**
 * Gets the value and the localizations from a language key.
 * @param key The key to get the localizations from.
 * @returns The retrieved data.
 * @remarks This should be called **strictly** after loading the locales.
 */
export function getLocalizedData<const TOpt extends TOptions = TOptions, Ns extends Namespace = DefaultNamespace, KPrefix = undefined>(
	key: ParseKeys<Ns, TOpt, KPrefix>
): LocalizedData {
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
export function applyNameLocalizedBuilder<
	T extends BuilderWithName,
	const TOpt extends TOptions = TOptions,
	Ns extends Namespace = DefaultNamespace,
	KPrefix = undefined
>(builder: T, key: ParseKeys<Ns, TOpt, KPrefix>) {
	const result = getLocalizedData(key);
	return builder.setName(result.value).setNameLocalizations(result.localizations);
}

/**
 * Applies the localized descriptions on the builder, calling `setDescription` and `setDescriptionLocalizations`.
 * @param builder The builder to apply the localizations to.
 * @param key The key to get the localizations from.
 * @returns The updated builder.
 */
export function applyDescriptionLocalizedBuilder<
	T extends BuilderWithDescription,
	const TOpt extends TOptions = TOptions,
	Ns extends Namespace = DefaultNamespace,
	KPrefix = undefined
>(builder: T, key: ParseKeys<Ns, TOpt, KPrefix>) {
	const result = getLocalizedData(key);
	return builder.setDescription(result.value).setDescriptionLocalizations(result.localizations);
}

/**
 * Applies the localized names and descriptions on the builder, calling {@link applyNameLocalizedBuilder} and
 * {@link applyDescriptionLocalizedBuilder}.
 *
 * @param builder The builder to apply the localizations to.
 *
 * @param params The root key or the key for the name and description keys.
 * This needs to be either 1 or 2 parameters.
 * See examples below for more information.
 *
 * @returns The updated builder. You can chain subsequent builder methods on this.
 *
 * @remarks If only 2 parameters were passed, then this function will automatically append `Name` and `Description`
 *  to the root-key (wherein `root-key` is second parameter in the function, after `builder`)
 * passed through the second parameter.
 *
 * For example given `applyLocalizedBuilder(builder, 'userinfo')` the localized options will use the i18next keys
 * `userinfoName` and `userinfoDescription`.
 *
 * In the following example we provide all parameters and add a User Option
 * `applyLocalizedBuilder` needs either
 * @example
 * ```typescript
 * class UserInfoCommand extends Command {
 *   public registerApplicationCommands(registry: ChatInputCommand.Registry) {
 *     registry.registerChatInputCommand(
 *       (builder) =>
 *         applyLocalizedBuilder(builder, 'commands/names:userinfo', 'commands/descriptions:userinfo')
 *           .addUserOption(
 *             (input) => applyLocalizedBuilder(input, 'commands/options:userinfo-name', 'commands/options:userinfo-description').setRequired(true)
 *           )
 *     );
 *   }
 * }
 * ```
 *
 * In the following example we provide single root keys which means `Name` and `Description` get appended as mentioned above.
 * @example
 * ```typescript
 * class UserInfoCommand extends Command {
 *   public registerApplicationCommands(registry: ChatInputCommand.Registry) {
 *     registry.registerChatInputCommand(
 *       (builder) =>
 *         applyLocalizedBuilder(builder, 'commands:userinfo')
 *           .addUserOption(
 *             (input) => applyLocalizedBuilder(input, 'options:userinfo').setRequired(true)
 *           )
 *     );
 *   }
 * }
 * ```
 */
export function applyLocalizedBuilder<
	T extends BuilderWithNameAndDescription,
	const TOpt extends TOptions = TOptions,
	Ns extends Namespace = DefaultNamespace,
	KPrefix = undefined
>(builder: T, ...params: [root: string] | [name: ParseKeys<Ns, TOpt, KPrefix>, description: ParseKeys<Ns, TOpt, KPrefix>]): T {
	type LocalKeysType = ParseKeys<Ns, TOpt, KPrefix>;

	const [localeName, localeDescription] =
		params.length === 1 ? [`${params[0]}Name` as LocalKeysType, `${params[0]}Description` as LocalKeysType] : params;

	applyNameLocalizedBuilder(builder, localeName);
	applyDescriptionLocalizedBuilder(builder, localeDescription);

	return builder;
}

/**
 * Constructs an object that can be passed into `setChoices` for String or Number option with localized names.
 *
 * @param key The i18next key for the name of the select option name.
 * @param options The additional Select Menu options. This should _at least_ include the `value` key.
 * @returns An object with anything provided through {@link createLocalizedChoice.options} with `name` and `name_localizations` added.
 *
 * @example
 * ```typescript
 * export class TypeCommand extends Command {
 *   public override registerApplicationCommands(registry: ChatInputCommand.Registry) {
 *     registry.registerChatInputCommand((builder) =>
 *       applyLocalizedBuilder(builder, 'commands/names:type').addStringOption((option) =>
 *         applyLocalizedBuilder(option, 'commands/options:type')
 *           .setRequired(true)
 *           .setChoices(
 *             createLocalizedChoice('selects/pokemon:type-grass', { value: 'grass' }),
 *             createLocalizedChoice('selects/pokemon:type-water', { value: 'water' }),
 *             createLocalizedChoice('selects/pokemon:type-fire', { value: 'fire' }),
 *             createLocalizedChoice('selects/pokemon:type-electric', { value: 'electric' })
 *           )
 *       )
 *     );
 *   }
 * }
 * ```
 */
export function createLocalizedChoice<
	ValueType = string | number,
	const TOpt extends TOptions = TOptions,
	Ns extends Namespace = DefaultNamespace,
	KPrefix = undefined
>(
	key: ParseKeys<Ns, TOpt, KPrefix>,
	options: Omit<APIApplicationCommandOptionChoice<ValueType>, 'name' | 'name_localizations'>
): APIApplicationCommandOptionChoice<ValueType> {
	const result = getLocalizedData(key);

	return {
		...options,
		name: result.value,
		name_localizations: result.localizations
	};
}
