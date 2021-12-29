import type { Awaitable } from '@sapphire/utilities';
import type { ScheduledTaskCreateRepeatedTask } from './ScheduledTaskCreateRepeatedTask';
import type { ScheduledTasksTaskOptions } from './ScheduledTasksTaskOptions';

export interface ScheduledTaskBaseStrategy {
	connect(): void;
	create(task: string, payload: unknown, options?: ScheduledTasksTaskOptions): void;
	createRepeated(tasks: ScheduledTaskCreateRepeatedTask[]): void;
	run(task: string, payload: unknown): Awaitable<unknown>;
}
