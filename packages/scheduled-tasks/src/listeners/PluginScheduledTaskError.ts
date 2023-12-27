import { Listener } from '@sapphire/framework';
import { ScheduledTaskEvents } from '../lib/types/ScheduledTaskEvents';
import { ScheduledTask } from '../lib/structures/ScheduledTask';

export class PluginListener extends Listener<typeof ScheduledTaskEvents.ScheduledTaskError> {
	public constructor(context: Listener.LoaderContext) {
		super(context, {
			name: ScheduledTaskEvents.ScheduledTaskError,
			event: ScheduledTaskEvents.ScheduledTaskError
		});
	}

	public override run(error: unknown, task: ScheduledTask) {
		const { name, location } = task;
		this.container.logger.error(`Encountered error on scheduled task "${name}" at path "${location.full}"`, error);
	}
}
