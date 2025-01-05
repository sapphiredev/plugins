import { Events, Listener } from '@sapphire/framework';
import type { Message, OmitPartialGroupDMChannel, PartialMessage } from 'discord.js';

export class PluginListener extends Listener<typeof Events.MessageUpdate> {
	public constructor(context: Listener.LoaderContext) {
		super(context, { event: Events.MessageUpdate });
	}

	public override run(old: OmitPartialGroupDMChannel<Message<boolean> | PartialMessage>, message: Message) {
		// If the contents of both messages are the same, return:
		if (old.content === message.content) return;

		// If the message was sent by a webhook, return:
		if (message.webhookId !== null) return;

		// If the message was sent by the Discord system, return:
		if (message.system) return;

		// If the message was sent by a bot, return:
		if (message.author.bot) return;

		// Run the message parser.
		this.container.client.emit(Events.PreMessageParsed, message);
	}
}
