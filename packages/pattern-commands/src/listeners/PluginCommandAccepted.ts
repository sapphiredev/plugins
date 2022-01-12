import { fromAsync, isErr, Listener } from '@sapphire/framework';
import type { PieceContext } from '@sapphire/pieces';
import { Stopwatch } from '@sapphire/stopwatch';
import { PatternCommandEvents } from '../lib/utils/PaternCommandEvents';
import type { PatternCommandAcceptedPayload } from '../lib/utils/PatternCommandInterfaces';

export class CommandAcceptedListener extends Listener<typeof PatternCommandEvents.CommandAccepted> {
	public constructor(context: PieceContext) {
		super(context, { event: PatternCommandEvents.CommandAccepted });
	}

	public async run(payload: PatternCommandAcceptedPayload) {
		const { message, command, alias } = payload;

		if (command.chance > Math.round(Math.random() * 99) + 1) {
			await this.runPatternCommand(payload);
		} else {
			message.client.emit(PatternCommandEvents.CommandNoLuck, message, command, alias);
		}
	}

	public async runPatternCommand(payload: PatternCommandAcceptedPayload) {
		const { message, command, alias } = payload;

		const result = await fromAsync(async () => {
			message.client.emit(PatternCommandEvents.CommandRun, message, command, alias);
			const stopwatch = new Stopwatch();
			const result = await command.messageRun(message);
			const { duration } = stopwatch.stop();
			message.client.emit(PatternCommandEvents.CommandSuccess, result, command, alias, duration);

			return { result, duration };
		});

		const { duration } = result.value!;

		if (isErr(result)) {
			message.client.emit(PatternCommandEvents.CommandError, result.error, command, duration, payload);
		}

		message.client.emit(PatternCommandEvents.CommandFinished, command, duration, payload);
	}
}
