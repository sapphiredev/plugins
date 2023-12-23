import { Listener } from '@sapphire/framework';
import { ScheduledTaskEvents } from '../lib/types/ScheduledTaskEvents';

export class PluginListener extends Listener<typeof ScheduledTaskEvents.ScheduledTaskStrategyWorkerError> {
	public constructor(context: Listener.LoaderContext) {
		super(context, {
			name: ScheduledTaskEvents.ScheduledTaskStrategyWorkerError,
			event: ScheduledTaskEvents.ScheduledTaskStrategyWorkerError
		});
	}

	public override run(error: unknown) {
		this.container.logger.error(`[ScheduledTaskPlugin] The BullMQ worker encountered an error`, error);
	}
}
