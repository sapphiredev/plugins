import { BucketScope, CommandPreConditions, container, type PreconditionContainerArray } from '@sapphire/framework';
import { Subcommand } from '../Subcommand';
import { SubcommandMappingMethod } from '../types/SubcommandMappings';

/**
 * Appends the `Cooldown` precondition when {@link Command.Options.cooldownLimit} and
 * {@link Command.Options.cooldownDelay} are both non-zero.
 * @param subcommand The subcommand mapping from what is parsed in the subcommand constructor.
 * @param preconditionContainerArray The precondition container array to append the precondition to.
 */
export function parseConstructorPreConditionsCooldown(
	baseCommand: Subcommand,
	subcommand: SubcommandMappingMethod,
	preconditionContainerArray: PreconditionContainerArray
) {
	const { defaultCooldown } = container.client.options;

	// We will check for whether the command is filtered from the defaults, but we will allow overridden values to
	// be set. If an overridden value is passed, it will have priority. Otherwise, it will default to 0 if filtered
	// (causing the precondition to not be registered) or the default value with a fallback to a single-use cooldown.
	const filtered = defaultCooldown?.filteredCommands?.includes(baseCommand.name) ?? false;
	const limit = subcommand.cooldownLimit ?? (filtered ? 0 : defaultCooldown?.limit ?? 1);
	const delay = subcommand.cooldownDelay ?? (filtered ? 0 : defaultCooldown?.delay ?? 0);

	if (limit && delay) {
		const scope = subcommand.cooldownScope ?? defaultCooldown?.scope ?? BucketScope.User;
		const filteredUsers = subcommand.cooldownFilteredUsers ?? defaultCooldown?.filteredUsers;
		preconditionContainerArray.append({
			name: CommandPreConditions.Cooldown,
			context: { scope, limit, delay, filteredUsers }
		});
	}
}
