import type { LoggerOptions } from './lib/Logger';

export * from './lib/Logger';
export * from './lib/LoggerLevel';
export * from './lib/LoggerStyle';
export * from './lib/LoggerTimestamp';

declare module '@sapphire/framework' {
	export interface ClientLoggerOptions extends LoggerOptions {}
}

/**
 * The [@sapphire/plugin-logger](https://github.com/sapphiredev/plugins/blob/main/packages/logger) version that you are currently using.
 * An example use of this is showing it of in a bot information command.
 *
 * Note to Sapphire developers: This needs to explicitly be `string` so it is not typed as the string that gets replaced by esbuild
 */
// eslint-disable-next-line @typescript-eslint/no-inferrable-types
export const version: string = '[VI]{{inject}}[/VI]';
