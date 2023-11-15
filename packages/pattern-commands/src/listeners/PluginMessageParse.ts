import { isDMChannel, type GuildBasedChannelTypes } from '@sapphire/discord.js-utilities';
import { Events, Listener } from '@sapphire/framework';
import type { PieceContext } from '@sapphire/pieces';
import { Message, PermissionFlagsBits, PermissionsBitField } from 'discord.js';
import type { PatternCommandStore } from '../lib/structures/PaternCommandStore';
import { PatternCommandEvents } from '../lib/utils/PaternCommandEvents';
import type { PossiblePatternCommand } from '../lib/utils/PatternCommandInterfaces';

export class PluginListener extends Listener<typeof Events.PreMessageParsed> {
	private readonly requiredPermissions = new PermissionsBitField([PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages]).freeze();
	public constructor(context: PieceContext) {
		super(context, { event: Events.PreMessageParsed });
	}

	public override async run(message: Message) {
		const canRun = await this.canRunInChannel(message);
		if (!canRun) return;

		let { content } = message;
		const { client, stores } = this.container;

		const patternCommandStore = stores.get('pattern-commands') as PatternCommandStore | undefined;

		if (!patternCommandStore) {
			return;
		}

		if (client.options.caseInsensitiveCommands) {
			content = content.toLowerCase();
		}

		const possiblePatternCommands: PossiblePatternCommand[] = [];

		for (const [key, patternCommand] of patternCommandStore) {
			if (content === key) {
				possiblePatternCommands.push({
					command: patternCommand,
					alias: key,
					weight: patternCommand.weight
				});
				continue;
			}

			const aliasMatch = patternCommand.aliases.find((alias) => alias === content);

			if (aliasMatch) {
				possiblePatternCommands.push({
					command: patternCommand,
					alias: aliasMatch,
					weight: patternCommand.weight
				});
				continue;
			}

			if (
				content.match(new RegExp(patternCommand.matchFullName ? `\b${key}\b` : key, client.options.caseInsensitiveCommands ? 'i' : undefined))
			) {
				possiblePatternCommands.push({
					command: patternCommand,
					alias: content,
					weight: patternCommand.weight
				});
				continue;
			}

			const aliasRegexMatch = patternCommand.aliases.find((alias) =>
				content.match(new RegExp(alias, client.options.caseInsensitiveCommands ? 'i' : undefined))
			);

			if (aliasRegexMatch) {
				possiblePatternCommands.push({
					command: patternCommand,
					alias: aliasRegexMatch,
					weight: patternCommand.weight
				});
				continue;
			}
		}

		if (possiblePatternCommands.length > 0) {
			const sortedPossiblePatternCommands = possiblePatternCommands.sort((first, second) => {
				return second.weight - first.weight;
			});

			client.emit(PatternCommandEvents.PreCommandRun, { message, possibleCommands: sortedPossiblePatternCommands });
		}
	}

	private async canRunInChannel(message: Message): Promise<boolean> {
		if (isDMChannel(message.channel)) return true;

		const me = await message.guild?.members.fetchMe();
		if (!me) return false;

		const channel = message.channel as GuildBasedChannelTypes;
		return channel.permissionsFor(me).has(this.requiredPermissions, false);
	}
}
