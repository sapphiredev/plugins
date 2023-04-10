import { container, Result } from '@sapphire/framework';
import type { SendMessageBatchResultEntryList } from 'aws-sdk/clients/sqs';
import { randomBytes } from 'crypto';
import { Consumer, type ConsumerOptions } from 'sqs-consumer';
import { Producer } from 'sqs-producer';
import type { ScheduledTaskBaseStrategy } from '../types/ScheduledTaskBaseStrategy';
import type { ScheduledTaskCreateRepeatedTask } from '../types/ScheduledTaskCreateRepeatedTask';
import { ScheduledTaskEvents } from '../types/ScheduledTaskEvents';
import type { ScheduledTasksTaskOptions } from '../types/ScheduledTasksTaskOptions';

export interface ScheduledTaskSQSStrategyMessageBody {
	task: string;
	payload?: unknown;
	options: ScheduledTasksTaskOptions;
}

export type SQSClient = Producer;

export class ScheduledTaskSQSStrategy implements ScheduledTaskBaseStrategy {
	public readonly options: ConsumerOptions;

	private producer: SQSClient;

	public constructor(options: ConsumerOptions) {
		this.options = options;
		this.producer = Producer.create(this.options);
	}

	public get client(): SQSClient {
		return this.producer;
	}

	public connect() {
		const connectResult = Result.from(() => {
			const consumer = Consumer.create({
				...this.options,
				handleMessage: this.handleMessage.bind(this),
				handleMessageBatch: this.handleBatch.bind(this)
			});

			consumer.start();
		});

		connectResult.inspectErr((error) => container.client.emit(ScheduledTaskEvents.ScheduledTaskStrategyConnectError, error));
	}

	public create(task: string, payload?: unknown, options?: ScheduledTasksTaskOptions): Promise<SendMessageBatchResultEntryList> {
		if (options?.pattern) {
			throw new Error('SQS does not support pattern notation.');
		}

		let delay = (options?.delay ?? 0) / 1000;
		if (options?.repeated) {
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

	public async createRepeated(tasks: ScheduledTaskCreateRepeatedTask[]): Promise<void> {
		for (const task of tasks) {
			await this.create(task.name, null, task.options);
		}
	}

	public delete(): void {
		throw new Error('SQS does not support deleting tasks.');
	}

	public list(): void {
		throw new Error('SQS does not support listing tasks.');
	}

	public listRepeated(): void {
		throw new Error('SQS does not support listing tasks.');
	}

	public get(): void {
		throw new Error('SQS does not support getting tasks.');
	}

	public run(task: string, payload: unknown): Promise<unknown> {
		return container.tasks.run(task, payload);
	}

	private async handleMessage(
		message: Parameters<Required<ConsumerOptions>['handleMessage']>[0]
	): ReturnType<Required<ConsumerOptions>['handleMessage']> {
		const data = JSON.parse(message.Body!) as ScheduledTaskSQSStrategyMessageBody;
		await this.run(data.task, data.payload);

		if (data.options.repeated) {
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
