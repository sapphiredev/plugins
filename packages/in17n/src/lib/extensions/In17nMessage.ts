import { Message, MessageAdditions, MessageOptions, SplitOptions, Structures } from 'discord.js';
import { TFunction } from 'i18next';

export class In17nMessage extends Structures.get('Message') {
	public async fetchLanguage(): Promise<string> {
		const lang = await this.client.fetchLanguage(this);
		return lang ?? this.guild?.preferredLocale ?? this.client.options.in17n?.defaultName ?? 'en-US';
	}

	public async fetchT() {
		const lang = await this.fetchLanguage();
		return this.client.in17n.fetchT(lang);
	}

	public async fetchLanguageKey(key: string, ...values: readonly any[]): Promise<string> {
		return this.client.in17n.fetchLocale(await this.fetchLanguage(), key, ...values);
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
			typeof valuesOrOptions === 'undefined' || Array.isArray(valuesOrOptions)
				? [valuesOrOptions ?? [], rawOptions ?? {}]
				: [[], valuesOrOptions as MessageOptions];
		const content = await this.fetchLanguageKey(key, ...values);
		return this.channel.send(content, options);
	}
}

export default In17nMessage;

declare module 'discord.js' {
	interface Message {
		fetchLanguage(): Promise<string>;
		fetchT(): Promise<TFunction>;
		fetchLanguageKey(key: string, ...values: readonly any[]): Promise<string>;

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
}
