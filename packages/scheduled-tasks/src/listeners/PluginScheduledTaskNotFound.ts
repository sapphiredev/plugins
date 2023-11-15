import { Listener } from '@sapphire/framework';
import { ScheduledTaskEvents } from '../lib/types/ScheduledTaskEvents';

export class PluginListener extends Listener<typeof ScheduledTaskEvents.ScheduledTaskNotFound> {
	public constructor(context: Listener.Context) {
		super(context, {
			name: ScheduledTaskEvents.ScheduledTaskNotFound,
			event: ScheduledTaskEvents.ScheduledTaskNotFound
		});
	}

	public override run(task: string) {
		this.container.logger.error(`[ScheduledTaskPlugin] There was no task found for "${task}"`);
	}
}
