import { Listener } from '@sapphire/framework';
import { ScheduledTaskEvents } from '../lib/types/ScheduledTaskEvents';

export class PluginListener extends Listener<typeof ScheduledTaskEvents.ScheduledTaskError> {
	public constructor(context: Listener.LoaderContext) {
		super(context, {
			name: ScheduledTaskEvents.ScheduledTaskError,
			event: ScheduledTaskEvents.ScheduledTaskError
		});
	}

	public override run(error: unknown, task: string) {
		let message = `Encountered error on scheduled task "${task}"`;

		const piece = this.container.stores.get('scheduled-tasks').get(task);
		if (piece) message = message.concat(` at path "${piece.location.full}"`);

		this.container.logger.error(message, error);
	}
}
