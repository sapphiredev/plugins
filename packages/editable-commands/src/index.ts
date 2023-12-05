export * from '@skyra/editable-commands';

export { loadListeners } from './listeners/_load';

/**
 * The [@sapphire/plugin-editable-commands](https://github.com/sapphiredev/plugins/blob/main/packages/editable-commands)
 * version that you are currently using.
 * An example use of this is showing it of in a bot information command.
 *
 * Note to Sapphire developers: This needs to explicitly be `string` so it is not typed as the string that gets replaced by esbuild
 */
// eslint-disable-next-line @typescript-eslint/no-inferrable-types
export const version: string = '[VI]{{inject}}[/VI]';
