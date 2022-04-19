import { container } from '@sapphire/pieces';
import { cast, isObject, NonNullObject } from '@sapphire/utilities';
import {
	BaseCommandInteraction,
	Guild,
	InteractionReplyOptions,
	Message,
	MessageComponentInteraction,
	MessagePayload,
	ReplyMessageOptions
} from 'discord.js';
import type { StringMap, TFunctionKeys, TFunctionResult, TOptions } from 'i18next';
import { deprecate } from 'node:util';
import type {
	ChannelTarget,
	InternationalizationContext,
	LocalizedInteractionReplyOptions,
	LocalizedMessageOptions,
	Target,
	TextBasedDiscordChannel
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
 * @param values The values to be passed to TFunction.
 * @returns The data that `key` held, processed by i18next.
 */
export async function resolveKey<
	TResult extends TFunctionResult = string,
	TKeys extends TFunctionKeys = string,
	TInterpolationMap extends NonNullObject = StringMap
>(target: Target, key: TKeys | TKeys[], options?: TOptions<TInterpolationMap>): Promise<TResult> {
	return container.i18n.format(await fetchLanguage(target), key, options);
}

/**
 * Send a localized message using the language `keys` from your i18next language setup.
 * @since 2.0.0
 * @param target The target to send the message to.
 * @param keys The language keys to be sent.
 * @example
 * ```typescript
 * // Using a string to specify the key to send
 * await sendLocalized(message, 'commands/ping:loading');
 * // ➡ "Pinging..."
 * ```
 */
export async function sendLocalized<TKeys extends TFunctionKeys = string>(target: ChannelTarget, keys: TKeys | TKeys[]): Promise<Message>;
/**
 * Send a localized message using {@link LocalizedMessageOptions}.
 * @since 2.0.0
 * @param target The target to send the message to.
 * @param options A {@link LocalizedMessageOptions} object, requiring at least a `keys` field.
 * @example
 * ```typescript
 * // Using an object to specify the key to send
 * await sendLocalized(message, { keys: 'commands/ping:loading' });
 * // ➡ "Pinging..."
 * ```
 * @example
 * ```typescript
 * // Passing interpolation options into i18next
 * const latency = 42;
 *
 * await sendLocalized(message, {
 * 	keys: 'commands/ping:loading',
 * 	formatOptions: { latency }
 * });
 * // ➡ "Pinging... current latency is 42ms."
 * ```
 */
export async function sendLocalized<TKeys extends TFunctionKeys = string, TInterpolationMap extends NonNullObject = StringMap>(
	target: ChannelTarget,
	options: LocalizedMessageOptions<TKeys, TInterpolationMap>
): Promise<Message>;
export async function sendLocalized<TKeys extends TFunctionKeys = string, TInterpolationMap extends NonNullObject = StringMap>(
	target: ChannelTarget,
	options: TKeys | TKeys[] | LocalizedMessageOptions<TKeys, TInterpolationMap>
): Promise<Message> {
	const channel = resolveTextChannel(target);
	return channel.send(await resolveOverloads(target, options));
}

/**
 * Replies to a message using the language `keys` from your i18next language setup.
 * @since 2.0.0
 * @param target The message to reply to.
 * @param keys The language keys to be sent.
 * @example
 * ```typescript
 * // Using an object to specify the key to send
 * await replyLocalized(message, 'commands/ping:loading');
 * // ➡ "Pinging..."
 * ```
 */
export async function replyLocalized<TKeys extends TFunctionKeys = string>(target: Message, keys: TKeys | TKeys[]): Promise<Message>;
/**
 * Replies to a message using {@link LocalizedMessageOptions}.
 * @since 2.0.0
 * @param target The message to reply to.
 * @param options A {@link LocalizedMessageOptions} object, requiring at least a `keys` field.
 * @example
 * ```typescript
 * // Using an object to specify the key to send
 * await replyLocalized(message, { keys: 'commands/ping:loading' });
 * // ➡ "Pinging..."
 * ```
 * @example
 * ```typescript
 * // Passing interpolation options into i18next
 * const latency = 42;
 *
 * await replyLocalized(message, {
 * 	keys: 'commands/ping:loading',
 * 	formatOptions: { latency }
 * });
 * // ➡ "Pinging... current latency is 42ms."
 * ```
 */
export async function replyLocalized<TKeys extends TFunctionKeys = string, TInterpolationMap extends NonNullObject = StringMap>(
	target: Message,
	options: LocalizedMessageOptions<TKeys, TInterpolationMap>
): Promise<Message>;
/**
 * Replies to the interaction using the language `keys` from your i18next language setup.
 * @since 2.4.0
 * @param target The interaction to reply to.
 * @param keys The language keys to be sent.
 * @example
 * ```typescript
 * // Using an object to specify the key to send
 * await replyLocalized(interaction, 'commands/ping:loading');
 * // ➡ "Pinging..."
 * ```
 */
export async function replyLocalized<TKeys extends TFunctionKeys = string>(
	target: (BaseCommandInteraction | MessageComponentInteraction) & {
		reply: (
			options: InteractionReplyOptions | MessagePayload | string
		) => Promise<ReturnType<(BaseCommandInteraction | MessageComponentInteraction)['reply']>>;
	},
	keys: TKeys | TKeys[]
): Promise<ReturnType<(BaseCommandInteraction | MessageComponentInteraction)['reply']>>;
/**
 * Replies to the interaction using {@link LocalizedInteractionReplyOptions}.
 * @since 2.4.0
 * @param target The interaction to reply to.
 * @param options A {@link LocalizedInteractionReplyOptions} object, requiring at least a `keys` field.
 * @example
 * ```typescript
 * // Using an object to specify the key to send
 * await replyLocalized(interaction, { keys: 'commands/ping:loading' });
 * // ➡ "Pinging..."
 * ```
 * @example
 * ```typescript
 * // Passing interpolation options into i18next
 * const latency = 42;
 *
 * await replyLocalized(interaction, {
 * 	keys: 'commands/ping:loading',
 * 	formatOptions: { latency }
 * });
 * // ➡ "Pinging... current latency is 42ms."
 * ```
 */
export async function replyLocalized<TKeys extends TFunctionKeys = string, TInterpolationMap extends NonNullObject = StringMap>(
	target: (BaseCommandInteraction | MessageComponentInteraction) & {
		reply: (
			options: InteractionReplyOptions | MessagePayload | string
		) => Promise<ReturnType<(BaseCommandInteraction | MessageComponentInteraction)['reply']>>;
	},
	options: LocalizedInteractionReplyOptions<TKeys, TInterpolationMap>
): Promise<ReturnType<(BaseCommandInteraction | MessageComponentInteraction)['reply']>>;
export async function replyLocalized<TKeys extends TFunctionKeys = string, TInterpolationMap extends NonNullObject = StringMap>(
	target: (BaseCommandInteraction | Message | MessageComponentInteraction) & {
		reply: (
			options: InteractionReplyOptions | MessagePayload | ReplyMessageOptions | string
		) => Promise<ReturnType<(BaseCommandInteraction | MessageComponentInteraction)['reply']> | Message>;
	},
	options: TKeys | TKeys[] | LocalizedMessageOptions<TKeys, TInterpolationMap> | LocalizedInteractionReplyOptions<TKeys, TInterpolationMap>
): Promise<
	ReturnType<(BaseCommandInteraction | MessageComponentInteraction)['reply']> | ReturnType<MessageComponentInteraction['update']> | Message
> {
	if (target instanceof BaseCommandInteraction || target instanceof MessageComponentInteraction) {
		if (target.deferred || target.replied) {
			return target.editReply(await resolveOverloads(target, options)) as Promise<Message<boolean>>;
		}
	}

	return target.reply(await resolveOverloads(target, options));
}

/**
 * Edits a message using the language `keys` from your i18next language setup.
 * @since 2.0.0
 * @param target The message to edit.
 * @param keys The language keys to be sent.
 * @example
 * ```typescript
 * // Using a string to specify the key to send
 * await editLocalized(message, 'commands/ping:fail');
 * // ➡ "Pong!"
 * ```
 */
export async function editLocalized<TKeys extends TFunctionKeys = string>(target: Message, keys: TKeys | TKeys[]): Promise<Message>;
/**
 * Edits a message using {@link LocalizedMessageOptions}.
 * @since 2.0.0
 * @param target The message to edit.
 * @param options A {@link LocalizedMessageOptions} object, requiring at least a `keys` field.
 * @example
 * ```typescript
 * // Using an object to specify the key to send
 * await editLocalized(message, { keys: 'commands/ping:fail' });
 * // ➡ "Pong!"
 * ```
 * @example
 * ```typescript
 * // Passing interpolation options into i18next
 * const latency = 42;
 * const took = 96;
 *
 * await editLocalized(message, {
 * 	keys: 'commands/ping:success',
 * 	formatOptions: { latency, took }
 * });
 * // ➡ "Pong! Took me 96ms to reply, and my heart took 42ms to beat!"
 * ```
 */
export async function editLocalized<TKeys extends TFunctionKeys = string, TInterpolationMap extends NonNullObject = StringMap>(
	target: Message,
	options: LocalizedMessageOptions<TKeys, TInterpolationMap>
): Promise<Message>;
/**
 * Edits a reply to an interaction, optionally deferred, using the given language.
 * @since 2.4.0
 * @param target The interaction to editReply.
 * @param options The language keys that will resolve to the new interaction content.
 * @example
 * ```typescript
 * // Using a string to specify the key to send
 * await editLocalized(interaction, 'commands/ping:fail');
 * // ➡ "Pong!"
 * ```
 */
export async function editLocalized<TKeys extends TFunctionKeys = string>(
	target: BaseCommandInteraction | MessageComponentInteraction,
	keys: TKeys | TKeys[]
): Promise<ReturnType<(BaseCommandInteraction | MessageComponentInteraction)['editReply']>>;
/**
 * Edits a reply to an interaction, optionally deferred, using {@link LocalizedInteractionReplyOptions}.
 * @since 2.4.0
 * @param target The interaction to editReply.
 * @param options A {@link LocalizedInteractionReplyOptions} object, requiring at least a `keys` field.
 * @example
 * ```typescript
 * // Using an object to specify the key to send
 * await editLocalized(interaction, { keys: 'commands/ping:fail' });
 * // ➡ "Pong!"
 * ```
 * @example
 * ```typescript
 * // Passing interpolation options into i18next
 * const latency = 42;
 * const took = 96;
 *
 * await editLocalized(interaction, {
 * 	keys: 'commands/ping:success',
 * 	formatOptions: { latency, took }
 * });
 * // ➡ "Pong! Took me 96ms to reply, and my heart took 42ms to beat!"
 * ```
 */
export async function editLocalized<TKeys extends TFunctionKeys = string, TInterpolationMap extends NonNullObject = StringMap>(
	target: BaseCommandInteraction | MessageComponentInteraction,
	options: LocalizedInteractionReplyOptions<TKeys, TInterpolationMap>
): Promise<ReturnType<(BaseCommandInteraction | MessageComponentInteraction)['editReply']>>;
export async function editLocalized<TKeys extends TFunctionKeys = string, TInterpolationMap extends NonNullObject = StringMap>(
	target: BaseCommandInteraction | Message | MessageComponentInteraction,
	options: TKeys | TKeys[] | LocalizedMessageOptions<TKeys, TInterpolationMap> | LocalizedInteractionReplyOptions<TKeys, TInterpolationMap>
): Promise<
	| ReturnType<(BaseCommandInteraction | MessageComponentInteraction)['editReply']>
	| ReturnType<(BaseCommandInteraction | MessageComponentInteraction)['reply']>
	| Message
> {
	if (target instanceof BaseCommandInteraction || target instanceof MessageComponentInteraction) {
		if (target.deferred || target.replied) {
			return target.editReply(await resolveOverloads(target, options));
		}

		return target.reply(await resolveOverloads(target, options));
	}

	return target.edit(await resolveOverloads(target, options));
}

/**
 * @internal
 */
async function resolveLanguage(context: InternationalizationContext): Promise<string> {
	Object.defineProperty(context, 'author', {
		get: deprecate(
			() => {
				return context.user;
			},
			"InternationalizationContext's `author` property is deprecated and will be removed in the next major version. Please use `InternationalizationContext.user` instead.",
			'DeprecationWarning'
		),
		set: deprecate(
			(val: InternationalizationContext['user']) => {
				context.user = val;
			},
			"InternationalizationContext's `author` property is deprecated and will be removed in the next major version. Please use `InternationalizationContext.user` instead.",
			'DeprecationWarning'
		)
	});

	const lang = await container.i18n.fetchLanguage(context);
	return lang ?? context.guild?.preferredLocale ?? container.i18n.options.defaultName ?? 'en-US';
}

/**
 * @internal
 */
function resolveTextChannel(target: ChannelTarget): TextBasedDiscordChannel {
	if (target instanceof Message) return target.channel;
	if (target.isText()) return target;
	throw new TypeError(`Cannot resolve ${target.name} to a text-based channel.`);
}

/**
 * @internal
 */
async function resolveOverloads<TKeys extends TFunctionKeys = string, TInterpolationMap extends NonNullObject = StringMap>(
	target: Target,
	options: TKeys | TKeys[] | LocalizedMessageOptions<TKeys, TInterpolationMap> | LocalizedInteractionReplyOptions<TKeys, TInterpolationMap>
) {
	if (isObject(options)) {
		const casted = cast<LocalizedMessageOptions<TKeys, TInterpolationMap> | LocalizedInteractionReplyOptions<TKeys, TInterpolationMap>>(options);
		return { ...options, content: await resolveKey(target, casted.keys, casted.formatOptions) };
	}

	return { content: await resolveKey(target, options) };
}
