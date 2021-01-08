import './register';
import { PromptClientOptions, PromptOptions, PromptMessageImplementation, PromptChannelImplementation, PromptImplemented } from './index';
import { MessageAdditions, MessageOptions, Structures, StringResolvable, APIMessage } from 'discord.js';

export * from './register';

class PromptMessage extends PromptImplemented(Structures.get('Message')) implements PromptMessageImplementation {
	public async replyPrompt(
		content: StringResolvable | APIMessage,
		options?: PromptOptions,
		messageOptions?: (MessageOptions & { split?: false }) | MessageAdditions
	): Promise<boolean> {
		const msg = await this.reply(content, messageOptions ?? {});
		return this.attachPrompt(msg, options, this.author);
	}
}

class PromptTextChannel extends PromptImplemented(Structures.get('TextChannel')) implements PromptChannelImplementation {
	public async sendPrompt(
		content: StringResolvable | APIMessage,
		options?: PromptOptions,
		messageOptions?: (MessageOptions & { split?: false }) | MessageAdditions
	): Promise<boolean> {
		const msg = await this.send(content, messageOptions ?? {});
		return this.attachPrompt(msg, options);
	}
}

class PromptDMChannel extends PromptImplemented(Structures.get('DMChannel')) implements PromptChannelImplementation {
	public async sendPrompt(
		content: StringResolvable | APIMessage,
		options?: PromptOptions,
		messageOptions?: (MessageOptions & { split?: false }) | MessageAdditions
	): Promise<boolean> {
		const msg = await this.send(content, messageOptions ?? {});
		return this.attachPrompt(msg, options);
	}
}

class PromptNewsChannel extends PromptImplemented(Structures.get('NewsChannel')) implements PromptChannelImplementation {
	public async sendPrompt(
		content: StringResolvable | APIMessage,
		options?: PromptOptions,
		messageOptions?: (MessageOptions & { split?: false }) | MessageAdditions
	): Promise<boolean> {
		const msg = await this.send(content, messageOptions ?? {});
		return this.attachPrompt(msg, options);
	}
}

Structures.extend('Message', () => PromptMessage);
Structures.extend('TextChannel', () => PromptTextChannel);
Structures.extend('DMChannel', () => PromptDMChannel);
Structures.extend('NewsChannel', () => PromptNewsChannel);

declare module 'discord.js' {
	export interface Message extends PromptMessageImplementation {
		/**
		 * @see {@link PromptMessageImplementation.replyPrompt}
		 */
		replyPrompt(
			content: StringResolvable | APIMessage,
			options?: PromptOptions,
			messageOptions?: (MessageOptions & { split?: false }) | MessageAdditions
		): Promise<boolean>;
	}

	export interface Channel extends PromptChannelImplementation {
		/**
		 * @see {@link PromptChannelImplementation.sendPrompt}
		 */
		sendPrompt(
			content: StringResolvable | APIMessage,
			options?: PromptOptions,
			messageOptions?: (MessageOptions & { split?: false }) | MessageAdditions
		): Promise<boolean>;
	}

	export interface ClientOptions extends PromptClientOptions {}
}
