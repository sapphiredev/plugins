import type { EmojiIdentifierResolvable } from 'discord.js';

/**
 * The options used for the plugin
 * @since 1.0.0
 */
export interface PromptOptions {
	/**
	 * Default emoji used for confirm
	 * @since 1.0.0
	 */
	confirm?: string | EmojiIdentifierResolvable;

	/**
	 * Default emoji used for cancel
	 * @since 1.0.0
	 */
	cancel?: string | EmojiIdentifierResolvable;

	/**
	 * Default timeout in milliseconds
	 * @since 1.0.0
	 */
	timeout?: number;
}

/**
 * The options used for the attachPrompt function
 * @since 1.0.0
 */
export interface ResolvedPromptOptions {
	/**
	 * Default emoji used for confirm
	 * @since 1.0.0
	 */
	confirm: string | EmojiIdentifierResolvable;

	/**
	 * Default emoji used for cancel
	 * @since 1.0.0
	 */
	cancel: string | EmojiIdentifierResolvable;

	/**
	 * Default timeout in milliseconds
	 * @since 1.0.0
	 */
	timeout: number;
}
