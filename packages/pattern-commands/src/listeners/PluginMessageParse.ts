import { GuildBasedChannelTypes, isDMChannel } from '@sapphire/discord.js-utilities';
import { Events, Listener } from '@sapphire/framework';
import type { PieceContext } from '@sapphire/pieces';
import { Message, Permissions } from 'discord.js';
import type { PatternCommandStore } from '../lib/structures/PaternCommandStore';
import { PatternCommandEvents } from '../lib/utils/PaternCommandEvents';

export class MessageParseListener extends Listener<typeof Events.PreMessageParsed> {
	private readonly requiredPermissions = new Permissions(['VIEW_CHANNEL', 'SEND_MESSAGES']).freeze();
	public constructor(context: PieceContext) {
		super(context, { event: Events.PreMessageParsed });
	}

	public async run(message: Message) {
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

		let usedAlias: string | undefined;

		const command = patternCommandStore.find((patternCommand, key) => {
			if (content === key) {
				usedAlias = key;
				return true;
			}

			const aliasMatch = patternCommand.aliases.find((alias) => alias === content);

			if (aliasMatch) {
				usedAlias = aliasMatch;
				return true;
			}

			if (
				content.match(new RegExp(patternCommand.matchFullName ? `\b${key}\b` : key, client.options.caseInsensitiveCommands ? 'i' : undefined))
			) {
				usedAlias = content;
				return true;
			}

			const aliasRegexMatch = patternCommand.aliases.find((alias) =>
				content.match(new RegExp(alias, client.options.caseInsensitiveCommands ? 'i' : undefined))
			);

			if (aliasRegexMatch) {
				usedAlias = aliasRegexMatch;
				return true;
			}

			return false;
		});

		if (command && usedAlias !== undefined) {
			client.emit(PatternCommandEvents.PreCommandRun, { message, command, alias: usedAlias });
		}
	}

	private async canRunInChannel(message: Message): Promise<boolean> {
		if (isDMChannel(message.channel)) return true;

		const me = message.guild!.me ?? (message.client.id ? await message.guild!.members.fetch(message.client.id) : null);
		if (!me) return false;

		const channel = message.channel as GuildBasedChannelTypes;
		return channel.permissionsFor(me).has(this.requiredPermissions, false);
	}
}
