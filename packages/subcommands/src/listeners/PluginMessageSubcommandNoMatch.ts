import { Args, Listener } from '@sapphire/framework';
import type { Message } from 'discord.js';
import { SubcommandPluginEvents, type MessageSubcommandNoMatchContext } from '../lib/types/Events';

export class PluginListener extends Listener<typeof SubcommandPluginEvents.MessageSubcommandNoMatch> {
	public constructor(context: Listener.LoaderContext) {
		super(context, { event: SubcommandPluginEvents.MessageSubcommandNoMatch });
	}

	public override run(_message: Message, _args: Args, context: MessageSubcommandNoMatchContext) {
		this.container.logger.error(context.message);
	}
}
