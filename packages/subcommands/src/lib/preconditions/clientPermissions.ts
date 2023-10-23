import { CommandPreConditions, type PreconditionContainerArray } from '@sapphire/framework';
import { PermissionsBitField } from 'discord.js';
import type { SubcommandMappingMethod } from '../types/SubcommandMappings';

/**
 * Appends the `ClientPermissions` precondition when {@link Command.Options.requiredClientPermissions} resolves to a
 * non-zero bitfield.
 * @param subcommand The subcommand mapping from what is parsed in the subcommand constructor.
 * @param preconditionContainerArray The precondition container array to append the precondition to.
 */
export function parseConstructorPreConditionsRequiredClientPermissions(
	subcommand: SubcommandMappingMethod,
	preconditionContainerArray: PreconditionContainerArray
) {
	const permissions = new PermissionsBitField(subcommand.requiredClientPermissions);
	if (permissions.bitfield !== 0n) {
		preconditionContainerArray.append({ name: CommandPreConditions.ClientPermissions, context: { permissions } });
	}
}
