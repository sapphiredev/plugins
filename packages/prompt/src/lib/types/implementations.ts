import type {
	StringResolvable,
	APIMessage,
	MessageOptions,
	MessageAdditions,
	EmojiIdentifierResolvable,
	CollectorFilter,
	Message,
	User
} from 'discord.js';
import type { PromptOptions } from './options';

export interface PromptBaseImplementation {
	/**
	 * @since 1.0.0
	 * @return The options for the prompt
	 */
	createPromptOptions(options?: PromptOptions): PromptOptions;

	/**
	 * @since 1.0.0
	 * @return The filter for awaitReactions function
	 */
	createPromptFilter(confirm?: string | EmojiIdentifierResolvable, cancel?: string | EmojiIdentifierResolvable, userId?: string): CollectorFilter;

	/**
	 * Function that attaches a prompt to a message
	 * @since 1.0.0
	 * @return A boolean of the prompt result
	 */
	attachPrompt(message: Message, options?: PromptOptions, author?: User): Promise<boolean>;
}

export interface PromptMessageImplementation {
	/**
	 * Function that sends a prompt message with the specified content.
	 * @since 1.0.0
	 * @return A boolean true for "confirm" and false for "cancel"
	 */
	replyPrompt(
		content: StringResolvable | APIMessage,
		options?: PromptOptions,
		messageOptions?: (MessageOptions & { split?: false }) | MessageAdditions
	): Promise<boolean>;
}

export interface PromptChannelImplementation {
	/**
	 * Function that sends a message for the channel with the translated key and values.
	 * @since 1.0.0
	 * @return A boolean true for "confirm" and false for "cancel"
	 */
	sendPrompt(
		content: StringResolvable | APIMessage,
		options?: PromptOptions,
		messageOptions?: (MessageOptions & { split?: false }) | MessageAdditions
	): Promise<boolean>;
}
