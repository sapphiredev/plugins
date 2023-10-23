import { CommandPreConditions, type PreconditionContainerArray } from '@sapphire/framework';
import type { SubcommandMappingMethod } from '../types/SubcommandMappings';

/**
 * Appends the `NSFW` precondition if {@link SubcommandMappingMethod.nsfw} is set to true.
 * @param subcommand The subcommand mapping from what is parsed in the subcommand constructor.
 * @param preconditionContainerArray The precondition container array to append the precondition to.
 */
export function parseConstructorPreConditionsNsfw(subcommand: SubcommandMappingMethod, preconditionContainerArray: PreconditionContainerArray) {
	if (subcommand.nsfw) preconditionContainerArray.append(CommandPreConditions.NotSafeForWork);
}
