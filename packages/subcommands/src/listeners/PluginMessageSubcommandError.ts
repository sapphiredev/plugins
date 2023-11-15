import { Listener } from '@sapphire/framework';
import { SubcommandPluginEvents, type MessageSubcommandErrorPayload } from '../lib/types/Events';

export class PluginListener extends Listener<typeof SubcommandPluginEvents.MessageSubcommandError> {
	public constructor(context: Listener.Context) {
		super(context, { event: SubcommandPluginEvents.MessageSubcommandError });
	}

	public override run(error: unknown, context: MessageSubcommandErrorPayload) {
		const { name, location } = context.command;
		this.container.logger.error(`Encountered error on message subcommand "${name}" at path "${location.full}"`, error);
	}
}
