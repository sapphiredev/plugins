import type { Command } from '@sapphire/framework';

export type SubcommandMapping = SubcommandMappingMethod | SubcommandMappingGroup;

export type SubcommandMappingArray = SubcommandMapping[];

/**
 * Describes the mapping of all the subcommands to their respective implementations for this command.
 */
interface SubcommandMappingBase {
	/**
	 * The name of this subcommand, or subcommand group
	 */
	name: string;
	/**
	 * Whether this subcommand mapping describes a `'method'` or `'group'`
	 * @default 'method'
	 */
	type?: 'group' | 'method';
}

/**
 * Describes how a subcommand method maps to the actual implementation of that subcommand.
 */
export interface SubcommandMappingMethod extends SubcommandMappingBase {
	/**
	 * This subcommand mapping describes a subcommand method and can therefore only ever be `'method'`
	 */
	type?: 'method';
	/**
	 * Whether this is the default subcommand when none is provided.
	 *
	 * Note that this is effectively only used for Message based subcommand
	 * (those implementing {@link SubcommandMappingMethod.messageRun})
	 * because the subcommand is always provided for chat input commands.
	 */
	default?: boolean;
	/**
	 * The class method to call when invoking this subcommand through a **message command**,
	 * or a callback implementation of the subcommand.
	 *
	 * Note that when providing a string you have to first define the method that will be called within your function
	 * before this will allow any values. This is to ensure that the property is strictly typed to the context of the
	 * class.
	 *
	 * @example
	 * ```typescript
	 * chatInputRun: 'runAdminConfig'
	 * ```
	 *
	 * @example
	 * ```typescript
	 * chatInputRun(interaction: Subcommand.Interaction) {
	 *    return interaction.reply(`${interaction.user} has been granted admin`);
	 * }
	 * ```
	 */
	messageRun?: string | Command['messageRun'];
	/**
	 * The class method to call when invoking this subcommand through a **chat input command**,
	 * or a callback implementation of the subcommand.
	 *
	 * Note that when providing a string you have to first define the method that will be called within your function
	 * before this will allow any values. This is to ensure that the property is strictly typed to the context of the
	 * class.
	 *
	 * @example
	 * ```typescript
	 * chatInputRun: 'runModeratorConfig'
	 * ```
	 *
	 * @example
	 * ```typescript
	 * chatInputRun(interaction: Subcommand.Interaction) {
	 *    return interaction.reply(`${interaction.user} has been granted moderator`);
	 * }
	 * ```
	 */
	chatInputRun?: string | Command['chatInputRun'];
}

export interface SubcommandMappingGroup extends SubcommandMappingBase {
	/**
	 * This subcommand mapping describes a subcommand group and can therefore only ever be `'group'`
	 */
	type: 'group';
	/**
	 * The {@link SubcommandMappingMethod}s that are contained within this subcommand group.
	 */
	entries: SubcommandMappingMethod[];
}

// Type aliases
export type MessageSubcommandMappingMethod = Omit<SubcommandMappingMethod, 'messageRun'> & Required<Pick<SubcommandMappingMethod, 'messageRun'>>;

export type ChatInputCommandSubcommandMappingMethod = Omit<SubcommandMappingMethod, 'chatInputRun'> &
	Required<Pick<SubcommandMappingMethod, 'chatInputRun'>>;
