import { AllFlowsPrecondition, BucketScope, Command, CorePreconditions } from '@sapphire/framework';
import { RateLimitManager } from '@sapphire/ratelimits';
import {
	TimestampStyles,
	time,
	type ChatInputCommandInteraction,
	type CommandInteraction,
	type ContextMenuCommandInteraction,
	type Message
} from 'discord.js';
import { Subcommand } from '../lib/Subcommand';
import { SubcommandIdentifiers } from '../lib/types/Enums';

/**
 * The context for the subcommand cooldown precondition
 * @since 5.1.0
 */
export interface SubcommandCooldownPreconditionContext extends CorePreconditions.CooldownContext {
	/** The name of the subcommand */
	subcommandMethodName: string;
	/** The name of the subcommand group, if any */
	subcommandGroupName?: string;
}

/**
 * The subcommand cooldown precondition. This differs from the cooldown precondition in framework by using a separate
 * bucket as well as resolving the id differently to ensure it is specific to a subcommand.
 * @since 5.1.0
 */
export class PluginPrecondition extends AllFlowsPrecondition {
	public subcommandBuckets = new WeakMap<Subcommand, RateLimitManager<string>>();

	public override messageRun(
		message: Message,
		subcommand: Subcommand,
		context: SubcommandCooldownPreconditionContext
	): AllFlowsPrecondition.Result {
		const cooldownId = this.getIdFromMessage(message, context);

		return this.sharedRun(message.author.id, subcommand, context, cooldownId, 'message');
	}

	public override chatInputRun(
		interaction: ChatInputCommandInteraction,
		subcommand: Subcommand,
		context: SubcommandCooldownPreconditionContext
	): AllFlowsPrecondition.Result {
		const cooldownId = this.getIdFromInteraction(interaction, context);

		return this.sharedRun(interaction.user.id, subcommand, context, cooldownId, 'chat input');
	}

	public override contextMenuRun(
		interaction: ContextMenuCommandInteraction,
		subcommand: Command,
		context: SubcommandCooldownPreconditionContext
	): AllFlowsPrecondition.Result {
		const cooldownId = this.getIdFromInteraction(interaction, context);

		return this.sharedRun(interaction.user.id, subcommand as Subcommand, context, cooldownId, 'context menu');
	}

	private sharedRun(
		authorId: string,
		subcommand: Subcommand,
		context: SubcommandCooldownPreconditionContext,
		cooldownId: string,
		commandType: string
	): AllFlowsPrecondition.Result {
		// If the subcommand it is testing for is not this one, return ok:
		if (context.external) return this.ok();

		// If there is no delay (undefined, null, 0), return ok:
		if (!context.delay) return this.ok();

		// If the user has provided any filtered users and the authorId is in that array, return ok:
		if (context.filteredUsers?.includes(authorId)) return this.ok();

		const rateLimit = this.getManager(subcommand, context).acquire(cooldownId);

		if (rateLimit.limited) {
			const remaining = rateLimit.remainingTime;

			const nextAvailable = time(Math.floor(rateLimit.expires / 1000), TimestampStyles.RelativeTime);
			return this.error({
				identifier: SubcommandIdentifiers.SubcommandPreconditionCooldown,
				message: `There is a cooldown in effect for this ${commandType} subcommand. It'll be available ${nextAvailable}.`,
				context: { remaining }
			});
		}

		rateLimit.consume();
		return this.ok();
	}

	private getIdFromMessage(message: Message, context: SubcommandCooldownPreconditionContext) {
		const subcommandIdentifier = this.getSubcommandMappingName(context);
		switch (context.scope) {
			case BucketScope.Global:
				return `global.${subcommandIdentifier}`;
			case BucketScope.Channel:
				return `${message.channelId}.${subcommandIdentifier}`;
			case BucketScope.Guild:
				return `${message.guildId}.${subcommandIdentifier}` ?? `${message.channelId}.${subcommandIdentifier}`;
			default:
				return `${message.author.id}.${subcommandIdentifier}`;
		}
	}

	private getIdFromInteraction(interaction: CommandInteraction, context: SubcommandCooldownPreconditionContext) {
		const subcommandIdentifier = this.getSubcommandMappingName(context);
		switch (context.scope) {
			case BucketScope.Global:
				return `global.${subcommandIdentifier}`;
			case BucketScope.Channel:
				return `${interaction.channelId}.${subcommandIdentifier}`;
			case BucketScope.Guild:
				return `${interaction.guildId}.${subcommandIdentifier}` ?? `${interaction.channelId}.${subcommandIdentifier}`;
			default:
				return `${interaction.user.id}.${subcommandIdentifier}`;
		}
	}

	private getSubcommandMappingName(context: SubcommandCooldownPreconditionContext) {
		return context.subcommandGroupName ? `${context.subcommandGroupName}.${context.subcommandMethodName}` : context.subcommandMethodName;
	}

	private getManager(subcommand: Subcommand, context: SubcommandCooldownPreconditionContext) {
		let manager = this.subcommandBuckets.get(subcommand);
		if (!manager) {
			manager = new RateLimitManager(context.delay, context.limit);
			this.subcommandBuckets.set(subcommand, manager);
		}
		return manager;
	}
}
