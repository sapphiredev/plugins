import { Args, BucketScope, PreconditionContainerArray } from '@sapphire/framework';
import { container } from '@sapphire/pieces';
import { Subcommand } from '../Subcommand';
import { SubcommandCommandPreConditions } from '../types/Enums';

/** The options for adding this subcommand cooldown precondition */
export interface ParseSubcommandConstructorPreConditionsCooldownParameters<
	PreParseReturn extends Args = Args,
	Options extends Subcommand.Options = Subcommand.Options
> {
	/** The command to parse cooldowns for. */
	subcommand: Subcommand<PreParseReturn, Options>;
	/** The cooldown limit to use. */
	cooldownLimit: number | undefined;
	/** The cooldown delay to use. */
	cooldownDelay: number | undefined;
	/** The cooldown scope to use. */
	cooldownScope: BucketScope | undefined;
	/** The cooldown filtered users to use. */
	cooldownFilteredUsers: string[] | undefined;
	/** The name this precondition is for. */
	subcommandMethodName: string;
	/** The group this precondition is for, if any. */
	subcommandGroupName?: string;
	/** The precondition container array to append the precondition to. */
	preconditionContainerArray: PreconditionContainerArray;
}

/**
 * Appends the `SubcommandCooldown` precondition when {@link Subcommand.Options.cooldownLimit} and
 * {@link Subcommand.Options.cooldownDelay} are both non-zero.
 *
 * @param options The {@link ParseSubcommandConstructorPreConditionsCooldownParameters} for adding this subcommand cooldown precondition
 */
export function parseSubcommandConstructorPreConditionsCooldown<
	PreParseReturn extends Args = Args,
	Options extends Subcommand.Options = Subcommand.Options
>({
	subcommand: command,
	cooldownLimit,
	cooldownDelay,
	cooldownScope,
	cooldownFilteredUsers,
	subcommandMethodName,
	subcommandGroupName,
	preconditionContainerArray
}: ParseSubcommandConstructorPreConditionsCooldownParameters<PreParseReturn, Options>) {
	const { subcommandDefaultCooldown } = container.client.options;

	// We will check for whether the subcommand is filtered from the defaults, but we will allow overridden values to
	// be set. If an overridden value is passed, it will have priority. Otherwise, it will default to 0 if filtered
	// (causing the precondition to not be registered) or the default value with a fallback to a single-use cooldown.
	const filtered =
		subcommandDefaultCooldown?.filteredCommands?.includes(
			subcommandGroupName ? `${command.name}.${subcommandGroupName}.${subcommandMethodName}` : `${command.name}.${subcommandMethodName}`
		) ?? false;
	const limit = cooldownLimit ?? (filtered ? 0 : subcommandDefaultCooldown?.limit ?? 1);
	const delay = cooldownDelay ?? (filtered ? 0 : subcommandDefaultCooldown?.delay ?? 0);

	if (limit && delay) {
		const scope = cooldownScope ?? subcommandDefaultCooldown?.scope ?? BucketScope.User;
		const filteredUsers = cooldownFilteredUsers ?? subcommandDefaultCooldown?.filteredUsers;

		preconditionContainerArray.append({
			name: SubcommandCommandPreConditions.SubcommandCooldown,
			context: { scope, limit, delay, filteredUsers, subcommandGroupName, subcommandMethodName }
		});
	}
}
