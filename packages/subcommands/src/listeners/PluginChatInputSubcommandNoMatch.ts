import { Listener, type ChatInputCommand } from '@sapphire/framework';
import { SubcommandPluginEvents, type ChatInputSubcommandNoMatchContext } from '../lib/types/Events';

export class PluginListener extends Listener<typeof SubcommandPluginEvents.ChatInputSubcommandNoMatch> {
	public constructor(context: Listener.LoaderContext) {
		super(context, { event: SubcommandPluginEvents.ChatInputSubcommandNoMatch });
	}

	public override run(_interaction: ChatInputCommand.Interaction, context: ChatInputSubcommandNoMatchContext) {
		this.container.logger.error(context.message);
	}
}
