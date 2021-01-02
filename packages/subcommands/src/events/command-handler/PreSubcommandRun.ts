import { CommandStore, Event, Events, isErr, PreCommandRunPayload, UserError } from '@sapphire/framework';
import type { PieceContext } from '@sapphire/pieces';
import { SubCommandsEvents } from '../../lib/utils/SubCommandsHandler';

export interface PreSubCommandPayload extends PreCommandRunPayload {}

export class PluginEvent extends Event<SubCommandsEvents.PreSubCommandRun> {
	public constructor(context: PieceContext) {
		super(context, { event: SubCommandsEvents.PreSubCommandRun });
	}

	public async run({ message, command: baseCommand, parameters, context }: PreSubCommandPayload) {
		try {
			const { command, args, method, parentName } = await CommandStore.injectedContext.subCommandsHandler.resolveSubCommand({
				command: baseCommand,
				message,
				parameters
			});

			if (command || (method && baseCommand && Reflect.has(baseCommand, method))) {
				const resolvedCommand = command ?? baseCommand;

				if (!resolvedCommand.enabled) {
					message.client.emit(SubCommandsEvents.SubCommandDenied, new UserError('SubCommandDisabled', 'This sub command is disabled.'), {
						message,
						command: resolvedCommand,
						parameters,
						context: { ...context, parentName }
					});

					return;
				}

				const result = await resolvedCommand.preconditions.run(message, resolvedCommand);

				if (isErr(result)) {
					message.client.emit(SubCommandsEvents.SubCommandDenied, result.error, {
						message,
						command: resolvedCommand,
						parameters,
						context: { ...context, parentName }
					});
				} else {
					message.client.emit(SubCommandsEvents.SubCommandAccepted, {
						message,
						command: resolvedCommand,
						method,
						args,
						parameters,
						context: { ...context, parentName }
					});
				}

				return;
			}
		} catch (error) {
			message.client.emit(SubCommandsEvents.SubCommandError, error, { piece: baseCommand, message });
			return;
		}

		// Checking that is command is not a sub command for others
		if (!baseCommand.isSubCommand) {
			message.client.emit(Events.PreCommandRun, { message, command: baseCommand, parameters, context });
		}
	}
}
