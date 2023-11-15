import { Listener, type ChatInputCommand } from '@sapphire/framework';
import { SubcommandPluginEvents, type ChatInputSubcommandErrorPayload } from '../lib/types/Events';
import type { SubcommandMappingMethod } from '../lib/types/SubcommandMappings';

export class PluginListener extends Listener<typeof SubcommandPluginEvents.SubcommandMappingIsMissingChatInputCommandHandler> {
	public constructor(context: Listener.Context) {
		super(context, { event: SubcommandPluginEvents.SubcommandMappingIsMissingChatInputCommandHandler });
	}

	public override run(_: ChatInputCommand.Interaction, subcommand: SubcommandMappingMethod, context: ChatInputSubcommandErrorPayload) {
		const { name, location } = context.command;
		this.container.logger.error(`Encountered a missing mapping on chat input subcommand "${name}" at "${location.full}"`, subcommand);
	}
}
