import type { Awaitable } from '@sapphire/utilities';
import type { ScheduledTaskCreateRepeatedTask } from './ScheduledTaskCreateRepeatedTask';
import type { ScheduledTasksTaskOptions } from './ScheduledTasksTaskOptions';

export interface ScheduledTaskBaseStrategy {
	client: unknown;
	connect(): void;
	create(task: keyof ScheduledTasks, payload: unknown, options?: ScheduledTasksTaskOptions): Awaitable<unknown>;
	createRepeated(tasks: ScheduledTaskCreateRepeatedTask[]): void;
	delete(id: unknown): unknown;
	list(options?: unknown): unknown;
	listRepeated(options?: unknown): unknown;
	get(id: unknown): unknown;
	run(task: string, payload: unknown): Awaitable<unknown>;
}

export interface ScheduledTasks {}
