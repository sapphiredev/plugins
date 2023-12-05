import type { PatternCommandStore } from './lib/structures/PatternCommandStore';

export * from './lib/structures/PatternCommandStore';
export * from './lib/structures/PatternCommand';
export * from './lib/utils/PatternCommandEvents';
export * from './lib/utils/PatternCommandInterfaces';
export { PluginListener as PluginPatternCommandsCommandAcceptedListener } from './listeners/PluginCommandAccepted';
export { PluginListener as PluginPatternCommandsMessageParseListener } from './listeners/PluginMessageParse';
export { PluginListener as PluginPatternCommandsPreCommandRunListener } from './listeners/PluginPreCommandRun';

declare module '@sapphire/pieces' {
	interface StoreRegistryEntries {
		'pattern-commands': PatternCommandStore;
	}
}

/**
 * The [@sapphire/plugin-pattern-commands](https://github.com/sapphiredev/plugins/blob/main/packages/pattern-commands) version that you are currently using.
 * An example use of this is showing it of in a bot information command.
 *
 * Note to Sapphire developers: This needs to explicitly be `string` so it is not typed as the string that gets replaced by esbuild
 */
// eslint-disable-next-line @typescript-eslint/no-inferrable-types
export const version: string = '[VI]{{inject}}[/VI]';
