import type { PromptClientOptions } from './lib';
import '@sapphire/framework';

declare module '@sapphire/framework' {
	export interface SapphireClientOptions extends PromptClientOptions {}
}
