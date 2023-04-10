import 'tslib';

export * from './lib/Subcommand';
export * from './lib/SubcommandMappings';
export * from './lib/types/Events';

declare module 'discord.js' {
	interface ClientOptions {
		/**
		 * If Plugin-subcommand to load pre-included subcommand error event listeners that log any encountered errors to the {@link SapphireClient.logger} instance
		 * @since 3.1.2
		 * @default true
		 */
		loadSubcommandErrorListeners?: boolean;
	}
}
