import { Listener } from '@sapphire/framework';
import type { PieceContext } from '@sapphire/pieces';
import { PatternCommandEvents } from '../lib/utils/PaternCommandEvents';
import type { PatternCommandAcceptedPayload } from '../lib/utils/PatternCommandInterfaces';

export class CommandAcceptedListener extends Listener<typeof PatternCommandEvents.CommandAccepted> {
	public constructor(context: PieceContext) {
		super(context, { event: PatternCommandEvents.CommandAccepted });
	}

	public async run(payload: PatternCommandAcceptedPayload) {
		const { message, command, alias } = payload;

		if (command.chance > Math.round(Math.random() * 99) + 1) {
			message.client.emit(PatternCommandEvents.CommandRun, message, command, alias);
			const result = await command.messageRun(message);
			message.client.emit(PatternCommandEvents.CommandSuccess, result, command, alias);
		} else {
			message.client.emit(PatternCommandEvents.CommandNoLuck, message, command, alias);
		}
	}
}
