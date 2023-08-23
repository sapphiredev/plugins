import { Listener, type PreconditionStore } from '@sapphire/framework';
import type { PieceContext } from '@sapphire/pieces';
import { PatternCommandEvents } from '../lib/utils/PaternCommandEvents';
import type { PatternCommandPayload, PatternCommandPrePayload } from '../lib/utils/PatternCommandInterfaces';

export class PreCommandRunListener extends Listener<typeof PatternCommandEvents.PreCommandRun> {
	public constructor(context: PieceContext) {
		super(context, { event: PatternCommandEvents.PreCommandRun });
	}

	public override async run(payload: PatternCommandPrePayload) {
		const { message, possibleCommands } = payload;

		for (const possibleCommand of possibleCommands) {
			const { command } = possibleCommand;
			const commandPayload: PatternCommandPayload = {
				message,
				command,
				alias: possibleCommand.alias
			};

			// Run global preconditions:
			const globalResult = await (this.container.stores.get('preconditions') as unknown as PreconditionStore).messageRun(
				message,
				command,
				commandPayload as any
			);

			if (globalResult.isErr()) {
				message.client.emit(PatternCommandEvents.CommandDenied, globalResult.unwrapErr(), commandPayload);
				continue;
			}

			// Run command-specific preconditions:
			const localResult = await command.preconditions.messageRun(message, command, payload as any);
			if (localResult.isErr()) {
				message.client.emit(PatternCommandEvents.CommandDenied, localResult.unwrapErr(), commandPayload);
				continue;
			}

			if (command.chance >= Math.round(Math.random() * 99) + 1) {
				message.client.emit(PatternCommandEvents.CommandAccepted, commandPayload);
				break;
			} else {
				message.client.emit(PatternCommandEvents.CommandNoLuck, commandPayload);
			}
		}
	}
}
