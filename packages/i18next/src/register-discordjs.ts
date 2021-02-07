import './register';
export * from './register';
import {
	I18nextClient,
	I18nextClientOptions,
	I18nextImplemented,
	I18nextGuildImplementation,
	I18nextChannelImplementation,
	I18nextMessageImplementation
} from './index';
import { Message, MessageAdditions, MessageOptions, SplitOptions, Structures, Channel, Guild, User } from 'discord.js';

declare module './index' {
	export interface I18nGuildContext extends Guild {}
	export interface I18nChannelContext extends Channel {}
	export interface I18nAuthorContext extends User {}
}

class I18nextMessage extends I18nextImplemented(Structures.get('Message')) implements I18nextMessageImplementation {
	public async fetchLanguage(): Promise<string> {
		return this._fetchLanguage(this.guild, this.channel, this.author);
	}

	public replyTranslated(
		key: string,
		values?: readonly unknown[],
		options?: MessageOptions | (MessageOptions & { split?: false }) | MessageAdditions
	): Promise<Message>;

	public replyTranslated(key: string, values?: readonly unknown[], options?: MessageOptions & { split: true | SplitOptions }): Promise<Message[]>;
	public replyTranslated(key: string, options?: MessageOptions | (MessageOptions & { split?: false }) | MessageAdditions): Promise<Message>;
	public replyTranslated(key: string, options?: MessageOptions & { split: true | SplitOptions }): Promise<Message[]>;
	public async replyTranslated(
		key: string,
		valuesOrOptions?: readonly unknown[] | MessageOptions | MessageAdditions,
		rawOptions?: MessageOptions
	): Promise<Message | Message[]> {
		const [values, options]: [readonly unknown[], MessageOptions] =
			valuesOrOptions === undefined || Array.isArray(valuesOrOptions)
				? [valuesOrOptions ?? [], rawOptions ?? {}]
				: [[], valuesOrOptions as MessageOptions];
		return this.reply(await this.resolveKey(key, ...values), options);
	}

	public editTranslated(
		key: string,
		values?: readonly unknown[],
		options?: MessageOptions | (MessageOptions & { split?: false }) | MessageAdditions
	): Promise<Message>;

	public editTranslated(key: string, values?: readonly unknown[], options?: MessageOptions & { split: true | SplitOptions }): Promise<Message[]>;
	public editTranslated(key: string, options?: MessageOptions | (MessageOptions & { split?: false }) | MessageAdditions): Promise<Message>;
	public editTranslated(key: string, options?: MessageOptions & { split: true | SplitOptions }): Promise<Message[]>;
	public async editTranslated(
		key: string,
		valuesOrOptions?: readonly unknown[] | MessageOptions | MessageAdditions,
		rawOptions?: MessageOptions
	): Promise<Message | Message[]> {
		const [values, options]: [readonly unknown[], MessageOptions] =
			valuesOrOptions === undefined || Array.isArray(valuesOrOptions)
				? [valuesOrOptions ?? [], rawOptions ?? {}]
				: [[], valuesOrOptions as MessageOptions];
		return this.edit(await this.resolveKey(key, ...values), options);
	}
}

class I18nextTextChannel extends I18nextImplemented(Structures.get('TextChannel')) implements I18nextChannelImplementation {
	public async fetchLanguage(): Promise<string> {
		return this._fetchLanguage(this.guild, this, undefined);
	}

	public sendTranslated(
		key: string,
		values?: readonly unknown[],
		options?: MessageOptions | (MessageOptions & { split?: false }) | MessageAdditions
	): Promise<Message>;

	public sendTranslated(key: string, values?: readonly unknown[], options?: MessageOptions & { split: true | SplitOptions }): Promise<Message[]>;
	public sendTranslated(key: string, options?: MessageOptions | (MessageOptions & { split?: false }) | MessageAdditions): Promise<Message>;
	public sendTranslated(key: string, options?: MessageOptions & { split: true | SplitOptions }): Promise<Message[]>;
	public async sendTranslated(
		key: string,
		valuesOrOptions?: readonly unknown[] | MessageOptions | MessageAdditions,
		rawOptions?: MessageOptions
	): Promise<Message | Message[]> {
		const [values, options]: [readonly unknown[], MessageOptions] =
			valuesOrOptions === undefined || Array.isArray(valuesOrOptions)
				? [valuesOrOptions ?? [], rawOptions ?? {}]
				: [[], valuesOrOptions as MessageOptions];
		return this.send(await this.resolveKey(key, ...values), options);
	}
}

class I18nextDMChannel extends I18nextImplemented(Structures.get('DMChannel')) implements I18nextChannelImplementation {
	public async fetchLanguage(): Promise<string> {
		return this._fetchLanguage(undefined, this, undefined);
	}

	public sendTranslated(
		key: string,
		values?: readonly unknown[],
		options?: MessageOptions | (MessageOptions & { split?: false }) | MessageAdditions
	): Promise<Message>;

	public sendTranslated(key: string, values?: readonly unknown[], options?: MessageOptions & { split: true | SplitOptions }): Promise<Message[]>;
	public sendTranslated(key: string, options?: MessageOptions | (MessageOptions & { split?: false }) | MessageAdditions): Promise<Message>;
	public sendTranslated(key: string, options?: MessageOptions & { split: true | SplitOptions }): Promise<Message[]>;
	public async sendTranslated(
		key: string,
		valuesOrOptions?: readonly unknown[] | MessageOptions | MessageAdditions,
		rawOptions?: MessageOptions
	): Promise<Message | Message[]> {
		const [values, options]: [readonly unknown[], MessageOptions] =
			valuesOrOptions === undefined || Array.isArray(valuesOrOptions)
				? [valuesOrOptions ?? [], rawOptions ?? {}]
				: [[], valuesOrOptions as MessageOptions];
		return this.send(await this.resolveKey(key, ...values), options);
	}
}

class I18nextNewsChannel extends I18nextImplemented(Structures.get('NewsChannel')) implements I18nextChannelImplementation {
	public async fetchLanguage(): Promise<string> {
		return this._fetchLanguage(this.guild, this, undefined);
	}

	public sendTranslated(
		key: string,
		values?: readonly unknown[],
		options?: MessageOptions | (MessageOptions & { split?: false }) | MessageAdditions
	): Promise<Message>;

	public sendTranslated(key: string, values?: readonly unknown[], options?: MessageOptions & { split: true | SplitOptions }): Promise<Message[]>;
	public sendTranslated(key: string, options?: MessageOptions | (MessageOptions & { split?: false }) | MessageAdditions): Promise<Message>;
	public sendTranslated(key: string, options?: MessageOptions & { split: true | SplitOptions }): Promise<Message[]>;
	public async sendTranslated(
		key: string,
		valuesOrOptions?: readonly unknown[] | MessageOptions | MessageAdditions,
		rawOptions?: MessageOptions
	): Promise<Message | Message[]> {
		const [values, options]: [readonly unknown[], MessageOptions] =
			valuesOrOptions === undefined || Array.isArray(valuesOrOptions)
				? [valuesOrOptions ?? [], rawOptions ?? {}]
				: [[], valuesOrOptions as MessageOptions];
		return this.send(await this.resolveKey(key, ...values), options);
	}
}

class I18nextGuild extends I18nextImplemented(Structures.get('Guild')) implements I18nextGuildImplementation {
	public async fetchLanguage(): Promise<string> {
		return this._fetchLanguage(this, undefined, undefined);
	}
}

Structures.extend('Message', () => I18nextMessage);
Structures.extend('TextChannel', () => I18nextTextChannel);
Structures.extend('DMChannel', () => I18nextDMChannel);
Structures.extend('NewsChannel', () => I18nextNewsChannel);
Structures.extend('Guild', () => I18nextGuild);

declare module 'discord.js' {
	export interface Message extends I18nextMessageImplementation {
		/**
		 * @see {@link I18nextMessageImplementation.replyTranslated}
		 */
		replyTranslated(
			key: string,
			values?: readonly unknown[],
			options?: MessageOptions | (MessageOptions & { split?: false }) | MessageAdditions
		): Promise<Message>;
		replyTranslated(key: string, values?: readonly unknown[], options?: MessageOptions & { split: true | SplitOptions }): Promise<Message[]>;
		replyTranslated(key: string, options?: MessageOptions | (MessageOptions & { split?: false }) | MessageAdditions): Promise<Message>;
		replyTranslated(key: string, options?: MessageOptions & { split: true | SplitOptions }): Promise<Message[]>;
		replyTranslated(
			key: string,
			valuesOrOptions?: readonly unknown[] | MessageOptions | MessageAdditions,
			rawOptions?: MessageOptions
		): Promise<Message | Message[]>;
	}

	export interface Channel extends I18nextChannelImplementation {
		/**
		 * @see {@link I18nextChannelImplementation.sendTranslated}
		 */
		sendTranslated(
			key: string,
			values?: readonly unknown[],
			options?: MessageOptions | (MessageOptions & { split?: false }) | MessageAdditions
		): Promise<Message>;
		sendTranslated(key: string, values?: readonly unknown[], options?: MessageOptions & { split: true | SplitOptions }): Promise<Message[]>;
		sendTranslated(key: string, options?: MessageOptions | (MessageOptions & { split?: false }) | MessageAdditions): Promise<Message>;
		sendTranslated(key: string, options?: MessageOptions & { split: true | SplitOptions }): Promise<Message[]>;
		sendTranslated(
			key: string,
			valuesOrOptions?: readonly unknown[] | MessageOptions | MessageAdditions,
			rawOptions?: MessageOptions
		): Promise<Message | Message[]>;
	}

	export interface Guild extends I18nextGuildImplementation {}

	export interface Client extends I18nextClient {}

	export interface ClientOptions extends I18nextClientOptions {}
}
