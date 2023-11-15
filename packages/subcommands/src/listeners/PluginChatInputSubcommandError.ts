import { Listener } from '@sapphire/framework';
import { SubcommandPluginEvents, type ChatInputSubcommandErrorPayload } from '../lib/types/Events';

export class PluginListener extends Listener<typeof SubcommandPluginEvents.ChatInputSubcommandError> {
	public constructor(context: Listener.Context) {
		super(context, { event: SubcommandPluginEvents.ChatInputSubcommandError });
	}

	public override run(error: unknown, context: ChatInputSubcommandErrorPayload) {
		const { name, location } = context.command;
		this.container.logger.error(`Encountered error on chat input subcommand "${name}" at path "${location.full}"`, error);
	}
}
