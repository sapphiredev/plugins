import { Listener } from '@sapphire/framework';
import { ScheduledTaskEvents } from '../lib/types/ScheduledTaskEvents';

export class PluginListener extends Listener<typeof ScheduledTaskEvents.ScheduledTaskStrategyConnectError> {
	public constructor(context: Listener.LoaderContext) {
		super(context, {
			name: ScheduledTaskEvents.ScheduledTaskStrategyConnectError,
			event: ScheduledTaskEvents.ScheduledTaskStrategyConnectError
		});
	}

	public override run(error: unknown) {
		this.container.logger.error(`[ScheduledTaskPlugin] Encountered an error when trying to connect to the Redis instance`, error);
	}
}
