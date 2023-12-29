import type { CooldownOptions } from '@sapphire/framework';
import {
	PluginPrecondition as PluginSubcommandCooldown,
	type PluginSubcommandCooldownPreconditionContext
} from './preconditions/PluginSubcommandCooldown';

export * from './lib/Subcommand';
export * as SubcommandPreconditionResolvers from './lib/precondition-resolvers/subcommandCooldown';
export * from './lib/types/Enums';
export * from './lib/types/Events';
export * from './lib/types/SubcommandMappings';

export { loadListeners } from './listeners/_load';
export { loadPreconditions } from './preconditions/_load';

declare module 'discord.js' {
	interface ClientOptions {
		/**
		 * If Plugin-subcommand to load pre-included subcommand error event listeners that log any encountered errors to the {@link SapphireClient.logger} instance
		 * @since 3.1.2
		 * @default true
		 */
		loadSubcommandErrorListeners?: boolean;
		/**
		 * Sets the default cooldown time for all subcommands.
		 * @remark This is separate from {@link ClientOptions.defaultCooldown} as it is only used for subcommands
		 * @remark Note that for the `filteredCommands` option you have to provide it as
		 * - For a subcommand without a group: `commandName.subcommandName` (e.g. `config.show`).
		 * - For a subcommand with a group: `commandName.groupName.subcommandName` (e.g. `config.set.prefix`).
		 * @since 5.1.0
		 * @default "No cooldown options"
		 */
		subcommandDefaultCooldown?: CooldownOptions;
	}
}

declare module '@sapphire/framework' {
	interface Preconditions {
		PluginSubcommandCooldown: SubcommandPreconditions.PluginSubcommandCooldownContext;
	}
}

/**
 * The preconditions specific to subcommands
 * @since 5.1.0
 */
export const SubcommandPreconditions = {
	PluginSubcommandCooldown
};

/**
 * The preconditions specific to subcommands
 * @since 5.1.0
 */
export namespace SubcommandPreconditions {
	/** The context for the subcommand cooldown precondition */
	export type PluginSubcommandCooldownContext = PluginSubcommandCooldownPreconditionContext;
}

/**
 * The [@sapphire/plugin-subcommands](https://github.com/sapphiredev/plugins/blob/main/packages/subcommands) version that you are currently using.
 * An example use of this is showing it of in a bot information command.
 *
 * Note to Sapphire developers: This needs to explicitly be `string` so it is not typed as the string that gets replaced by esbuild
 */
// eslint-disable-next-line @typescript-eslint/no-inferrable-types
export const version: string = '[VI]{{inject}}[/VI]';
