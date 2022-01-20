import { CommandAcceptedPayload, Events, Listener } from '@sapphire/framework';

export class PluginListener extends Listener<typeof Events.CommandAccepted> {
	public constructor(context: Listener.Context) {
		super(context, { event: Events.CommandAccepted });
	}

	public run({ command, message }: CommandAcceptedPayload) {
		if (this.container.client.options.statcord?.debug) {
			this.container.logger.debug(`[Statcord-Plugin]: Logging use of the ${command.name} command.`);
		}

		this.container.statcord.postCommand(command.name, message.author.id);
	}
}
