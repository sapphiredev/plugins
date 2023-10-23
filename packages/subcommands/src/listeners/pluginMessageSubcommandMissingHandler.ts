import { Listener } from '@sapphire/framework';
import type { Message } from 'discord.js';
import { SubcommandPluginEvents, type MessageSubcommandErrorPayload } from '../lib/types/Events';
import type { SubcommandMappingMethod } from '../lib/types/SubcommandMappings';

export class PluginListener extends Listener<typeof SubcommandPluginEvents.SubcommandMappingIsMissingMessageCommandHandler> {
	public constructor(context: Listener.Context) {
		super(context, { event: SubcommandPluginEvents.SubcommandMappingIsMissingMessageCommandHandler });
	}

	public override run(_: Message, subcommand: SubcommandMappingMethod, context: MessageSubcommandErrorPayload) {
		const { name, location } = context.command;
		this.container.logger.error(`Encountered a missing mapping on message subcommand "${name}" at "${location.full}"`, subcommand);
	}
}
