import { Command, CommandPreConditions, type CommandRunInUnion, type PreconditionContainerArray } from '@sapphire/framework';
import type { ChannelType } from 'discord.js';
import type { SubcommandMappingMethod } from '../types/SubcommandMappings';

/**
 * Appends the `RunIn` precondition based on the values passed, defaulting to `null`, which doesn't add a
 * precondition.
 * @param subcommand The subcommand mapping from what is parsed in the subcommand constructor.
 * @param resolveConstructorPreConditionsRunType The function to resolve the run type from the constructor.
 * @param preconditionContainerArray The precondition container array to append the precondition to.
 */
export function parseSubcommandMappingPreconditionsRunIn(
	subcommand: SubcommandMappingMethod,
	resolveConstructorPreConditionsRunType: (types: CommandRunInUnion) => readonly ChannelType[] | null,
	preconditionContainerArray: PreconditionContainerArray
) {
	if (Command.runInTypeIsSpecificsObject(subcommand.runIn)) {
		const messageRunTypes = resolveConstructorPreConditionsRunType(subcommand.runIn.messageRun);
		const chatInputRunTypes = resolveConstructorPreConditionsRunType(subcommand.runIn.chatInputRun);
		const contextMenuRunTypes = resolveConstructorPreConditionsRunType(subcommand.runIn.contextMenuRun);
		if (messageRunTypes !== null || chatInputRunTypes !== null || contextMenuRunTypes !== null) {
			preconditionContainerArray.append({
				name: CommandPreConditions.RunIn,
				context: {
					types: {
						messageRun: messageRunTypes ?? [],
						chatInputRun: chatInputRunTypes ?? [],
						contextMenuRun: contextMenuRunTypes ?? []
					}
				}
			});
		}
	} else {
		const preconditionRunInTypes = resolveConstructorPreConditionsRunType(subcommand.runIn);
		if (preconditionRunInTypes !== null) {
			preconditionContainerArray.append({ name: CommandPreConditions.RunIn, context: { types: preconditionRunInTypes } });
		}
	}
}
