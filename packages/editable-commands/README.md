<div align="center">

![Sapphire Logo](https://raw.githubusercontent.com/sapphiredev/assets/main/banners/SapphireCommunity.png)

# @sapphire/plugin-editable-commands

**Plugin for <a href="https://github.com/sapphiredev/framework">@sapphire/framework</a> to have editable commands.**

[![GitHub](https://img.shields.io/github/license/sapphiredev/plugins)](https://github.com/sapphiredev/plugins/blob/main/LICENSE.md)
[![npm bundle size](https://img.shields.io/bundlephobia/min/@sapphire/plugin-editable_commands?logo=webpack&style=flat-square)](https://bundlephobia.com/result?p=@sapphire/plugin-editable-commands)
[![npm](https://img.shields.io/npm/v/@sapphire/plugin-editable-commands?color=crimson&logo=npm&style=flat-square)](https://www.npmjs.com/package/@sapphire/plugin-editable-commands)

</div>

## Description

A lightweight wrapper on top of [`@skyra/editable-commands`](https://www.npmjs.com/package/@skyra/editable-commands) that re-exports everything and registers an event to make commands also run on message edit.

## Features

-   Fully ready for TypeScript!
-   Includes ESM ready entrypoint
-   Full editable commands, attachments included!

## Installation

`@sapphire/plugin-editable-commands` depends on the following packages. Be sure to install these along with this package!

-   [`@sapphire/framework`](https://www.npmjs.com/package/@sapphire/framework)

You can use the following command to install this package, or replace `npm install` with your package manager of choice.

```sh
npm install @sapphire/plugin-editable-commands @sapphire/framework
```

---

## Usage

### JavaScript

In your main or setup file, register the plugin:

```javascript
require('@sapphire/plugin-editable-commands/register');
```

Then use `send` or `reply` from the package, as shown below:

```javascript
const { Command } = require('@sapphire/framework');
const { MessageEmbed } = require('discord.js');
const { send } = require('@sapphire/plugin-editable-commands');

module.exports = class UserCommand extends Command {
	constructor(context, options) {
		super(context, {
			...options,
			description: 'A very cool command',
			requiredClientPermissions: ['EMBED_LINKS']
		});
	}

	messageRun(message) {
		const embed = new MessageEmbed()
			.setURL('https://github.com/skyra-project/editable-commands')
			.setColor('#7586D8')
			.setDescription('Example description')
			.setTimestamp();

		return send(message, { embeds: [embed] });
	}
};
```

### TypeScript

In your main or setup file, register the plugin:

```typescript
import '@sapphire/plugin-editable-commands/register';
```

Then use `send` or `reply` from the package, as shown below:

```typescript
import { ApplyOptions } from '@sapphire/decorators';
import { Command } from '@sapphire/framework';
import { Message, MessageEmbed } from 'discord.js';
import { send } from '@sapphire/plugin-editable-commands';

@ApplyOptions<Command.Options>({
	description: 'A very cool command',
	requiredClientPermissions: ['EMBED_LINKS']
})
export class UserCommand extends Command {
	public messageRun(message: Message) {
		const embed = new MessageEmbed()
			.setURL('https://github.com/sapphiredev/plugins')
			.setColor('#7586D8')
			.setDescription('Example description')
			.setTimestamp();

		return send(message, { embeds: [embed] });
	}
}
```

## Buy us some doughnuts

Sapphire Community is and always will be open source, even if we don't get donations. That being said, we know there are amazing people who may still want to donate just to show their appreciation. Thank you very much in advance!

We accept donations through Open Collective, Ko-fi, Paypal, Patreon and GitHub Sponsorships. You can use the buttons below to donate through your method of choice.

|   Donate With   |                       Address                       |
| :-------------: | :-------------------------------------------------: |
| Open Collective | [Click Here](https://sapphirejs.dev/opencollective) |
|      Ko-fi      |      [Click Here](https://sapphirejs.dev/kofi)      |
|     Patreon     |    [Click Here](https://sapphirejs.dev/patreon)     |
|     PayPal      |     [Click Here](https://sapphirejs.dev/paypal)     |

## Contributors

Please make sure to read the [Contributing Guide][contributing] before making a pull request.

Thank you to all the people who already contributed to Sapphire!

<a href="https://github.com/sapphiredev/plugins/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=sapphiredev/plugins" />
</a>

[contributing]: https://github.com/sapphiredev/.github/blob/main/.github/CONTRIBUTING.md
