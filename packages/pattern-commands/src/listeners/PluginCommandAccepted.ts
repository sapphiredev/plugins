import { Result, Listener } from '@sapphire/framework';
import type { PieceContext } from '@sapphire/pieces';
import { Stopwatch } from '@sapphire/stopwatch';
import { PatternCommandEvents } from '../lib/utils/PaternCommandEvents';
import type { PatternCommandAcceptedPayload } from '../lib/utils/PatternCommandInterfaces';

export class CommandAcceptedListener extends Listener<typeof PatternCommandEvents.CommandAccepted> {
	public constructor(context: PieceContext) {
		super(context, { event: PatternCommandEvents.CommandAccepted });
	}

	public async run(payload: PatternCommandAcceptedPayload) {
		const { message, command } = payload;

		const result = await Result.fromAsync(async () => {
			message.client.emit(PatternCommandEvents.CommandRun, message, command, payload);

			const stopwatch = new Stopwatch();
			const result = await command.messageRun(message);
			const { duration } = stopwatch.stop();

			message.client.emit(PatternCommandEvents.CommandSuccess, { ...payload, result, duration });

			return duration;
		});

		result.inspectErr((error) => message.client.emit(PatternCommandEvents.CommandError, error, { ...payload, error, duration: -1 }));

		message.client.emit(PatternCommandEvents.CommandFinished, message, command, {
			...payload,
			success: result.isOk(),
			duration: result.unwrapOr(-1)
		});
	}
}
