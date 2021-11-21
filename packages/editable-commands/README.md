<div align="center">

![Sapphire Logo](https://cdn.skyra.pw/gh-assets/sapphire-banner.png)

# @sapphire/plugin-editable-commands

**Plugin for <a href="https://github.com/sapphiredev/framework">@sapphire/framework</a> to have editable commands.**

[![GitHub](https://img.shields.io/github/license/sapphiredev/plugins)](https://github.com/sapphiredev/plugins/blob/main/LICENSE.md)
[![codecov](https://codecov.io/gh/sapphiredev/plugins/branch/main/graph/badge.svg?token=QWL8FB16BR)](https://codecov.io/gh/sapphiredev/plugins)
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

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://favware.tech/"><img src="https://avatars3.githubusercontent.com/u/4019718?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Jeroen Claassens</b></sub></a><br /><a href="https://github.com/sapphiredev/plugins/commits?author=Favna" title="Code">💻</a> <a href="#infra-Favna" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#projectManagement-Favna" title="Project Management">📆</a></td>
    <td align="center"><a href="https://Quantumlyy.com"><img src="https://avatars1.githubusercontent.com/u/7919610?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Nejc Drobnic</b></sub></a><br /><a href="https://github.com/sapphiredev/plugins/commits?author=Quantumlyy" title="Code">💻</a> <a href="https://github.com/sapphiredev/plugins/commits?author=Quantumlyy" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/kyranet"><img src="https://avatars0.githubusercontent.com/u/24852502?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Antonio Román</b></sub></a><br /><a href="https://github.com/sapphiredev/plugins/commits?author=kyranet" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/vladfrangu"><img src="https://avatars3.githubusercontent.com/u/17960496?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Vlad Frangu</b></sub></a><br /><a href="https://github.com/sapphiredev/plugins/pulls?q=is%3Apr+reviewed-by%3Avladfrangu" title="Reviewed Pull Requests">👀</a></td>
    <td align="center"><a href="https://github.com/apps/depfu"><img src="https://avatars3.githubusercontent.com/in/715?v=4?s=100" width="100px;" alt=""/><br /><sub><b>depfu[bot]</b></sub></a><br /><a href="#maintenance-depfu[bot]" title="Maintenance">🚧</a></td>
    <td align="center"><a href="https://github.com/apps/dependabot"><img src="https://avatars0.githubusercontent.com/in/29110?v=4?s=100" width="100px;" alt=""/><br /><sub><b>dependabot[bot]</b></sub></a><br /><a href="#maintenance-dependabot[bot]" title="Maintenance">🚧</a></td>
    <td align="center"><a href="https://github.com/apps/allcontributors"><img src="https://avatars0.githubusercontent.com/in/23186?v=4?s=100" width="100px;" alt=""/><br /><sub><b>allcontributors[bot]</b></sub></a><br /><a href="https://github.com/sapphiredev/plugins/commits?author=allcontributors[bot]" title="Documentation">📖</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/Nytelife26"><img src="https://avatars1.githubusercontent.com/u/22531310?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Tyler J Russell</b></sub></a><br /><a href="https://github.com/sapphiredev/plugins/commits?author=Nytelife26" title="Code">💻</a> <a href="https://github.com/sapphiredev/plugins/commits?author=Nytelife26" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/Stitch07"><img src="https://avatars.githubusercontent.com/u/29275227?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Stitch07</b></sub></a><br /><a href="https://github.com/sapphiredev/plugins/commits?author=Stitch07" title="Code">💻</a> <a href="https://github.com/sapphiredev/plugins/issues?q=author%3AStitch07" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://github.com/PlatinBae"><img src="https://avatars.githubusercontent.com/u/50950966?v=4?s=100" width="100px;" alt=""/><br /><sub><b>PlatinBae</b></sub></a><br /><a href="https://github.com/sapphiredev/plugins/commits?author=PlatinBae" title="Documentation">📖</a></td>
    <td align="center"><a href="https://kaname.netlify.app"><img src="https://avatars.githubusercontent.com/u/56084970?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Kaname</b></sub></a><br /><a href="https://github.com/sapphiredev/plugins/commits?author=kaname-png" title="Code">💻</a> <a href="https://github.com/sapphiredev/plugins/commits?author=kaname-png" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/noftaly"><img src="https://avatars.githubusercontent.com/u/34779161?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Elliot</b></sub></a><br /><a href="https://github.com/sapphiredev/plugins/commits?author=noftaly" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/Lioness100"><img src="https://avatars.githubusercontent.com/u/65814829?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Lioness100</b></sub></a><br /><a href="https://github.com/sapphiredev/plugins/commits?author=Lioness100" title="Code">💻</a> <a href="https://github.com/sapphiredev/plugins/commits?author=Lioness100" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/UndiedGamer"><img src="https://avatars.githubusercontent.com/u/84702365?v=4?s=100" width="100px;" alt=""/><br /><sub><b>UndiedGamer</b></sub></a><br /><a href="https://github.com/sapphiredev/plugins/commits?author=UndiedGamer" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
