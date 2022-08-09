import { container } from '@sapphire/pieces';
import type { NonNullObject } from '@sapphire/utilities';
import { BaseCommandInteraction, Guild, Message, MessageComponentInteraction } from 'discord.js';
import type { StringMap, TFunctionKeys, TFunctionResult, TOptions } from 'i18next';
import type { InternationalizationContext, Target } from './types';

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
