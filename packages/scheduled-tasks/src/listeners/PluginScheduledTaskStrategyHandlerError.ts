import { Listener } from '@sapphire/framework';
import { ScheduledTaskEvents } from '../lib/types/ScheduledTaskEvents';

export class PluginListener extends Listener<typeof ScheduledTaskEvents.ScheduledTaskStrategyHandlerError> {
	public constructor(context: Listener.LoaderContext) {
		super(context, {
			name: ScheduledTaskEvents.ScheduledTaskStrategyHandlerError,
			event: ScheduledTaskEvents.ScheduledTaskStrategyHandlerError
		});
	}

	public override run(error: unknown) {
		this.container.logger.error(`[ScheduledTaskPlugin] Scheduled Task handler encountered an error`, error);
	}
}
