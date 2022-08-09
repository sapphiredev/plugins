import { Listener, type PreconditionStore } from '@sapphire/framework';
import type { PieceContext } from '@sapphire/pieces';
import { PatternCommandEvents } from '../lib/utils/PaternCommandEvents';
import type { PatternPreCommandRunPayload } from '../lib/utils/PatternCommandInterfaces';

export class PreCommandRunListener extends Listener<typeof PatternCommandEvents.PreCommandRun> {
	public constructor(context: PieceContext) {
		super(context, { event: PatternCommandEvents.PreCommandRun });
	}

	public async run(payload: PatternPreCommandRunPayload) {
		const { message, command } = payload;

		// Run global preconditions:
		const globalResult = await (this.container.stores.get('preconditions') as unknown as PreconditionStore).messageRun(
			message,
			command,
			payload as any
		);

		if (globalResult.isErr()) {
			message.client.emit(PatternCommandEvents.CommandDenied, globalResult.unwrapErr(), payload);
			return;
		}

		// Run command-specific preconditions:
		const localResult = await command.preconditions.messageRun(message, command, payload as any);
		if (localResult.isErr()) {
			message.client.emit(PatternCommandEvents.CommandDenied, localResult.unwrapErr(), payload);
			return;
		}

		message.client.emit(PatternCommandEvents.CommandAccepted, payload);
	}
}
