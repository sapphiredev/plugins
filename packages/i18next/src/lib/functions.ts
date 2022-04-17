import { container } from '@sapphire/pieces';
import { isObject, NonNullObject } from '@sapphire/utilities';
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
		return resolveLanguage({ channel: target.channel, guild: target.guild, user: target.user });
	}

	// Handle Message:
	if (target instanceof Message) {
		return resolveLanguage({ channel: target.channel, guild: target.guild, user: target.author });
	}

	// Handle Guild:
	if (target instanceof Guild) {
		return resolveLanguage({ channel: null, guild: target, user: null });
	}

	// Handle DMChannel:
	if (target.type === 'DM') {
		return resolveLanguage({ channel: target, guild: null, user: null });
	}

	// Handle any other channel:
	return resolveLanguage({ channel: target, guild: target.guild, user: null });
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
 * Send a localized message using an object of {@link LocalizedMessageOptions}.
 * @since 2.0.0
 * @param target The target to send the message to.
 * @param options The options to be sent, requiring at least `keys` to be passed.
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
 * Replies to another message using the language `keys` from your i18next language setup.
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
 * Replies to another message using an object of {@link LocalizedMessageOptions}.
 * @since 2.0.0
 * @param target The message to reply to.
 * @param options The options to be sent, requiring at least `keys` to be passed.
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
 * Replies to the interaction using an object of {@link LocalizedInteractionReplyOptions}.
 * @since 2.4.0
 * @param target The interaction to reply to.
 * @param options The options to be sent, requiring at least `keys` to be passed.
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
): Promise<ReturnType<(BaseCommandInteraction | MessageComponentInteraction)['reply']> | Message> {
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
 * Edits a message using an objects option.
 * @since 2.0.0
 * @param target The message to edit.
 * @param options The options to be sent, requiring at least `keys` to be passed.
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
 * Edits a deferred/replied interaction using the language `keys` from your i18next language setup.
 * @since 2.4.0
 * @param target The interaction to editReply.
 * @param options The language keys to be sent.
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
 * Edits a deferred/replied interaction using an objects option.
 * @since 2.4.0
 * @param target The interaction to editReply.
 * @param options The options to be sent, requiring at least `keys` to be passed.
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
): Promise<ReturnType<(BaseCommandInteraction | MessageComponentInteraction)['editReply']> | Message> {
	// Handle Interactions:
	if (target instanceof BaseCommandInteraction || target instanceof MessageComponentInteraction) {
		return target.editReply(await resolveOverloads(target, options));
	}

	// Handle Message:
	return target.edit(await resolveOverloads(target, options));
}

/**
 * @internal
 */
async function resolveLanguage(context: InternationalizationContext): Promise<string> {
	Object.defineProperty(context, 'author', {
		get: () => {
			process.emitWarning(
				"InternationalizationContext's `author` property is deprecated and will be removed in the next major version. Please use `InternationalizationContext.user` instead.",
				'DeprecationWarning'
			);
			return context.user;
		}
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
		const casted = options as LocalizedMessageOptions<TKeys, TInterpolationMap> | LocalizedInteractionReplyOptions<TKeys, TInterpolationMap>;
		return { ...options, content: await resolveKey(target, casted.keys, casted.formatOptions) };
	}

	return { content: await resolveKey(target, options) };
}
