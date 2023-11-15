import { Store } from '@sapphire/pieces';
import { ScheduledTask } from './ScheduledTask';

/**
 * A store for managing scheduled tasks.
 */
export class ScheduledTaskStore extends Store<ScheduledTask, 'scheduled-tasks'> {
	public readonly repeatedTasks: ScheduledTask[] = [];

	public constructor() {
		super(ScheduledTask, { name: 'scheduled-tasks' });
	}

	public override set(key: string, value: ScheduledTask): this {
		if (value.interval !== null || value.pattern !== null) {
			this.repeatedTasks.push(value);
		}

		return super.set(key, value);
	}

	public override delete(key: string): boolean {
		const index = this.repeatedTasks.findIndex((task) => task.name === key);

		// If the scheduled task was found, remove it
		if (index !== -1) this.repeatedTasks.splice(index, 1);

		return super.delete(key);
	}

	public override clear(): void {
		this.repeatedTasks.length = 0;
		return super.clear();
	}
}
