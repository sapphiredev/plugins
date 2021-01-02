import { CommandStore, Plugin, postInitialization, postLogin, SapphireClient } from '@sapphire/framework';
import { SubCommandsPluginOptions, SubCommandsHandler, SubCommandOptionsResolvable } from './lib/utils/SubCommandsHandler';
import { join } from 'path';
import type { ClientOptions } from 'discord.js';

export class SubCommands extends Plugin {
	public static [postInitialization](this: SapphireClient, options: ClientOptions): void {
		CommandStore.injectedContext.subCommandsHandler = new SubCommandsHandler(options.subCommands);
		this.events.registerPath(join(__dirname, 'events'));
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	public static [postLogin](this: SapphireClient, _options: ClientOptions): void {
		CommandStore.injectedContext.subCommandsHandler.inspectSubCommands(this.commands);
	}
}

declare module '@sapphire/framework' {
	export interface CommandOptions {
		subCommands?: SubCommandOptionsResolvable[] | SubCommandOptionsResolvable;
	}

	export interface Command {
		subCommands: SubCommandOptionsResolvable[];
		isSubCommand: boolean;
	}

	export interface CommandContext {
		parentName?: string;
	}

	export interface SapphireClientOptions {
		subCommands?: SubCommandsPluginOptions;
	}
}

declare module '@sapphire/pieces' {
	export interface PieceContextExtras {
		subCommandsHandler: SubCommandsHandler;
	}
}

SapphireClient.plugins.registerPostInitializationHook(SubCommands[postInitialization], 'SubCommandsPostInitialization');
SapphireClient.plugins.registerPostLoginHook(SubCommands[postLogin], 'SubCommandsPostLogin');
