import type { Args, ChatInputCommand, ChatInputCommandContext, MessageCommand, MessageCommandDeniedPayload, UserError } from '@sapphire/framework';
import type { Message } from 'discord.js';
import type { Subcommand } from '../Subcommand';
import type { ChatInputCommandSubcommandMappingMethod, MessageSubcommandMappingMethod, SubcommandMappingMethod } from './SubcommandMappings';

export const SubcommandPluginEvents = {
	ChatInputSubcommandDenied: 'chatInputSubcommandDenied' as const,
	ChatInputSubcommandRun: 'chatInputSubcommandRun' as const,
	ChatInputSubcommandSuccess: 'chatInputSubcommandSuccess' as const,
	ChatInputSubcommandError: 'chatInputSubcommandError' as const,
	ChatInputSubcommandNoMatch: 'chatInputSubcommandNoMatch' as const,

	MessageSubcommandDenied: 'messageSubcommandDenied' as const,
	MessageSubcommandRun: 'messageSubcommandRun' as const,
	MessageSubcommandSuccess: 'messageSubcommandSuccess' as const,
	MessageSubcommandError: 'messageSubcommandError' as const,
	MessageSubcommandNoMatch: 'messageSubcommandNoMatch' as const,

	SubcommandMappingIsMissingMessageCommandHandler: 'subcommandMappingIsMissingMessageCommandHandler' as const,
	SubcommandMappingIsMissingChatInputCommandHandler: 'subcommandMappingIsMissingChatInputCommandHandler' as const
};

export enum SubcommandPluginIdentifiers {
	MessageSubcommandNoMatch = 'messageSubcommandNoMatch',
	ChatInputSubcommandNoMatch = 'chatInputSubcommandNoMatch',
	SubcommandNotFound = 'subcommandNotFound'
}

export interface MessageSubcommandNoMatchContext extends MessageCommand.RunContext {
	command: Subcommand;
	identifier: SubcommandPluginIdentifiers.MessageSubcommandNoMatch;
	message: string;
	possibleSubcommandName: string | null;
	possibleSubcommandGroupOrName: string | null;
}

export interface ChatInputSubcommandNoMatchContext extends ChatInputCommandContext {
	command: Subcommand;
	identifier: SubcommandPluginIdentifiers.ChatInputSubcommandNoMatch;
	message: string;
}

export interface IMessageSubcommandPayload {
	message: Message;
	command: Subcommand;
}

export interface MessageSubcommandDeniedPayload
	extends Omit<MessageCommandDeniedPayload, 'parameters' | 'command'>, MessageSubcommandAcceptedPayload {
	parameters?: string;
}

export interface MessageSubcommandAcceptedPayload extends IMessageSubcommandPayload {
	context: MessageCommand.RunContext;
	matchedSubcommandMapping: SubcommandMappingMethod;
}

export interface MessageSubcommandRunPayload extends MessageSubcommandAcceptedPayload {}

export interface MessageSubcommandErrorPayload extends MessageSubcommandRunPayload {}

export interface MessageSubcommandSuccessPayload extends MessageSubcommandRunPayload {
	result: unknown;
}

export interface IChatInputSubcommandPayload {
	interaction: ChatInputCommand.Interaction;
	command: Subcommand;
}

export interface ChatInputSubcommandAcceptedPayload extends IChatInputSubcommandPayload {
	context: ChatInputCommand.RunContext;
	matchedSubcommandMapping: SubcommandMappingMethod;
}

export interface ChatInputSubcommandDeniedPayload extends ChatInputSubcommandAcceptedPayload {}

export interface ChatInputSubcommandRunPayload extends ChatInputSubcommandAcceptedPayload {}

export interface ChatInputSubcommandErrorPayload extends ChatInputSubcommandRunPayload {}

export interface ChatInputSubcommandSuccessPayload extends ChatInputSubcommandRunPayload {
	result: unknown;
}

declare module 'discord.js' {
	interface ClientEvents {
		[SubcommandPluginEvents.ChatInputSubcommandDenied]: [error: UserError, payload: ChatInputSubcommandDeniedPayload];
		[SubcommandPluginEvents.ChatInputSubcommandRun]: [
			interaction: ChatInputCommand.Interaction,
			subcommand: ChatInputCommandSubcommandMappingMethod,
			payload: ChatInputSubcommandRunPayload
		];
		[SubcommandPluginEvents.ChatInputSubcommandSuccess]: [
			interaction: ChatInputCommand.Interaction,
			subcommand: ChatInputCommandSubcommandMappingMethod,
			payload: ChatInputSubcommandSuccessPayload
		];
		[SubcommandPluginEvents.ChatInputSubcommandError]: [error: unknown, payload: ChatInputSubcommandErrorPayload];
		[SubcommandPluginEvents.ChatInputSubcommandNoMatch]: [interaction: ChatInputCommand.Interaction, context: ChatInputSubcommandNoMatchContext];

		[SubcommandPluginEvents.MessageSubcommandDenied]: [error: UserError, payload: MessageSubcommandDeniedPayload];
		[SubcommandPluginEvents.MessageSubcommandRun]: [
			message: Message,
			subcommand: MessageSubcommandMappingMethod,
			payload: MessageSubcommandRunPayload
		];
		[SubcommandPluginEvents.MessageSubcommandSuccess]: [
			message: Message,
			subcommand: MessageSubcommandMappingMethod,
			payload: MessageSubcommandSuccessPayload
		];
		[SubcommandPluginEvents.MessageSubcommandError]: [error: unknown, payload: MessageSubcommandErrorPayload];
		[SubcommandPluginEvents.MessageSubcommandNoMatch]: [message: Message, args: Args, context: MessageSubcommandNoMatchContext];

		[SubcommandPluginEvents.SubcommandMappingIsMissingMessageCommandHandler]: [
			message: Message,
			subcommand: SubcommandMappingMethod,
			payload: MessageSubcommandAcceptedPayload
		];
		[SubcommandPluginEvents.SubcommandMappingIsMissingChatInputCommandHandler]: [
			message: ChatInputCommand.Interaction,
			subcommand: SubcommandMappingMethod,
			payload: ChatInputSubcommandAcceptedPayload
		];
	}
}
