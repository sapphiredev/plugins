import { CommandPreConditions, type PreconditionContainerArray } from '@sapphire/framework';
import { PermissionsBitField } from 'discord.js';
import type { SubcommandMappingMethod } from '../types/SubcommandMappings';

/**
 * Appends the `UserPermissions` precondition when {@link Command.Options.requiredUserPermissions} resolves to a
 * non-zero bitfield.
 * @param subcommand The subcommand mapping from what is parsed in the subcommand constructor.
 * @param preconditionContainerArray The precondition container array to append the precondition to.
 */
export function parseConstructorPreConditionsRequiredUserPermissions(
	subcommand: SubcommandMappingMethod,
	preconditionContainerArray: PreconditionContainerArray
) {
	const permissions = new PermissionsBitField(subcommand.requiredUserPermissions);
	if (permissions.bitfield !== 0n) {
		preconditionContainerArray.append({ name: CommandPreConditions.UserPermissions, context: { permissions } });
	}
}
