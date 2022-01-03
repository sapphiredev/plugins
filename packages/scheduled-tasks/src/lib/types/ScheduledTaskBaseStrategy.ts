import type { Awaitable } from '@sapphire/utilities';
import type { ScheduledTaskCreateRepeatedTask } from './ScheduledTaskCreateRepeatedTask';
import type { ScheduledTasksTaskOptions } from './ScheduledTasksTaskOptions';

export interface ScheduledTaskBaseStrategy {
	connect(): void;
	create(task: string, payload: unknown, options?: ScheduledTasksTaskOptions): void;
	createRepeated(tasks: ScheduledTaskCreateRepeatedTask[]): void;
	delete(id: unknown): void;
	list(options?: unknown): void;
	listRepeated(options?: unknown): void;
	get(id: unknown): void;
	run(task: string, payload: unknown): Awaitable<unknown>;
}
