import { container, from, isErr } from '@sapphire/framework';
import { randomBytes } from 'crypto';
import { Consumer, ConsumerOptions } from 'sqs-consumer';
import { Producer } from 'sqs-producer';
import type { ScheduledTaskCreateRepeatedTask, ScheduledTasksTaskOptions } from '../types';
import type { ScheduledTaskBaseStrategy } from '../types/ScheduledTaskBaseStrategy';
import { ScheduledTaskEvents } from '../types/ScheduledTaskEvents';

export interface ScheduledTaskSQSStrategyMessageBody {
	task: string;
	payload?: unknown;
	options: ScheduledTasksTaskOptions;
}

export class ScheduledTaskSQSStrategy implements ScheduledTaskBaseStrategy {
	public readonly options: ConsumerOptions;

	private producer: Producer;

	public constructor(options: ConsumerOptions) {
		this.options = options;
		this.producer = Producer.create(this.options);
	}

	public connect() {
		const connectResult = from(() => {
			const consumer = Consumer.create({
				...this.options,
				handleMessage: this.handleMessage.bind(this),
				handleMessageBatch: this.handleBatch.bind(this)
			});

			consumer.start();
		});

		if (isErr(connectResult)) {
			container.client.emit(ScheduledTaskEvents.ScheduledTaskStrategyConnectError, connectResult.error);
		}
	}

	public create(task: string, payload?: unknown, options?: ScheduledTasksTaskOptions) {
		if (options?.cron) {
			throw new Error('SQS does not support cron notation.');
		}

		let delay = (options?.delay ?? 0) / 1000;
		if (options?.type === 'repeated') {
			delay = options.interval! / 1000;
		}

		return this.producer.send({
			id: `${task}-${randomBytes(6)}`, // need it to be a unique ID'ish
			body: JSON.stringify({
				task,
				payload,
				options
			}),
			delaySeconds: delay
		});
	}

	public async createRepeated(tasks: ScheduledTaskCreateRepeatedTask[]) {
		for (const task of tasks) {
			await this.create(task.name, null, task.options);
		}
	}

	public run(task: string, payload: unknown) {
		return container.tasks.run(task, payload);
	}

	private async handleMessage(
		message: Parameters<Required<ConsumerOptions>['handleMessage']>[0]
	): ReturnType<Required<ConsumerOptions>['handleMessage']> {
		const data = JSON.parse(message.Body!) as ScheduledTaskSQSStrategyMessageBody;
		await this.run(data.task, data.payload);

		if (data.options.type === 'repeated') {
			await this.create(data.task, data.payload, data.options);
		}
	}

	private async handleBatch(
		messages: Parameters<Required<ConsumerOptions>['handleMessageBatch']>[0]
	): ReturnType<Required<ConsumerOptions>['handleMessageBatch']> {
		for (const message of messages) {
			await this.handleMessage(message);
		}
	}
}
