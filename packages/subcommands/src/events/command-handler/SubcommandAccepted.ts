import { Args, CommandAcceptedPayload, Event, PieceContext } from '@sapphire/framework';
import type { Command } from '../../lib/structures/Command';
import { SubCommandsEvents } from '../../lib/utils/SubCommandsHandler';

export interface SubCommandAcceptedPayload extends CommandAcceptedPayload {
	command: Command;
	method: string;
	args: Args;
}

export class PluginEvent extends Event<SubCommandsEvents.SubCommandAccepted> {
	public constructor(context: PieceContext) {
		super(context, { event: SubCommandsEvents.SubCommandAccepted });
	}

	public async run({ message, command, parameters, context, method, args }: SubCommandAcceptedPayload) {
		try {
			message.client.emit(SubCommandsEvents.SubCommandRun, message, command);
			const result = await Reflect.apply(Reflect.get(command, method ?? 'run'), command, [message, args, context]);

			message.client.emit(SubCommandsEvents.SubCommandSuccess, { message, command, result, parameters });
		} catch (error) {
			message.client.emit(SubCommandsEvents.SubCommandError, error, { piece: command, message });
		} finally {
			message.client.emit(SubCommandsEvents.SubCommandFinish, message, command);
		}
	}
}
