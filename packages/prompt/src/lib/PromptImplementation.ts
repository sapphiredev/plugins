/* eslint-disable @typescript-eslint/naming-convention */
import type { Client, Message, EmojiIdentifierResolvable, MessageReaction, User, CollectorFilter } from 'discord.js';
import type { PromptBaseImplementation, PromptOptions, ResolvedPromptOptions } from './types/index';

type Ctor = new (...args: any[]) => { client: Client };

/**
 * @since 1.0.0
 * @returns An PromptBaseImplementation mixin which extends the Base parameter and fully implements {@link PromptBaseImplementation}.
 * @param Base The class to use as the base for the implementation (e.g. a Discord library's Message object)
 */
export function PromptImplemented<BaseClass extends Ctor>(Base: BaseClass) {
	/**
	 * The class that defines the base / default implementations of the plugin.
	 * This class is used to extend functions for Message & Channel
	 * @since 1.0.0
	 **/
	return class PromptImplementation extends Base implements PromptBaseImplementation {
		/**
		 * @since 1.0.0
		 * @see {@link PromptImplementation.createPromptOptions}
		 */
		public createPromptOptions(promptOptions?: PromptOptions): ResolvedPromptOptions {
			const defaultOptions = {
				confirm: '🇾',
				cancel: '🇳',
				timeout: 10000
			};

			return {
				...defaultOptions,
				...(this.client.options.prompt ?? {}),
				...(promptOptions ?? {})
			};
		}

		/**
		 * @since 1.0.0
		 * @see {@link PromptImplementation.createPromptFilter}
		 */
		public createPromptFilter(
			confirm?: string | EmojiIdentifierResolvable,
			cancel?: string | EmojiIdentifierResolvable,
			userId?: string
		): CollectorFilter {
			return (reaction: MessageReaction, user: User) =>
				[confirm, cancel].includes(reaction.emoji.name) && (!userId || user.id === userId) && !user.bot;
		}

		/**
		 * @since 1.0.0
		 * @see {@link PromptImplementation.attachPrompt}
		 */
		public async attachPrompt(message: Message, options?: PromptOptions, author?: User): Promise<boolean> {
			const { confirm, cancel, timeout } = this.createPromptOptions(options);

			await message.react(confirm);
			await message.react(cancel);

			const reactions = await message.awaitReactions(this.createPromptFilter(confirm, cancel, author?.id), {
				max: 1,
				time: timeout,
				errors: ['time']
			});

			if (!reactions?.size) {
				return false;
			}

			const reaction = reactions.first();
			return reaction?.emoji?.name === confirm;
		}
	};
}
