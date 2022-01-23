<div align="center">

![Sapphire Logo](https://cdn.skyra.pw/gh-assets/sapphire-banner.png)

# @sapphire/plugin-i18next

**Plugin for <a href="https://github.com/sapphiredev/framework">@sapphire/framework</a> to support i18next based internationalization.**

[![GitHub](https://img.shields.io/github/license/sapphiredev/plugins)](https://github.com/sapphiredev/plugins/blob/main/LICENSE.md)
[![codecov](https://codecov.io/gh/sapphiredev/plugins/branch/main/graph/badge.svg?token=QWL8FB16BR)](https://codecov.io/gh/sapphiredev/plugins)
[![npm bundle size](https://img.shields.io/bundlephobia/min/@sapphire/plugin-in17n?logo=webpack&style=flat-square)](https://bundlephobia.com/result?p=@sapphire/plugin-in17n)
[![npm](https://img.shields.io/npm/v/@sapphire/plugin-in17n?color=crimson&logo=npm&style=flat-square)](https://www.npmjs.com/package/@sapphire/plugin-in17n)

</div>

## Description

An implementation of i18next's [filesystem backend] for Sapphire. It allows you to use a JSON-based `languages` directory to add internationalization for your bot using `SapphireClient`'s `fetchLanguage` hook and a custom message extension, adding features such as `sendTranslated` and `resolveKey`.

[filesystem backend]: https://github.com/i18next/i18next-fs-backend

## Features

-   Fully ready for TypeScript!
-   Includes ESM ready entrypoint
-   Framework agnostic
-   Includes convenience register for discord.js

## Installation

`@sapphire/plugin-i18next` depends on the following packages. Be sure to install these along with this package!

-   [`@sapphire/framework`](https://www.npmjs.com/package/@sapphire/framework)
-   [`discord.js`](https://www.npmjs.com/package/discord.js)

You can use the following command to install this package, or replace `npm install` with your package manager of choice.

```sh
npm install @sapphire/plugin-i18next @sapphire/framework discord.js
```

---

## Usage

This registers the methods and options necessary for message translations in the Sapphire client.

```typescript
// Main bot file
// Be sure to register the plugin before instantiating the client.
import '@sapphire/plugin-i18next/register';
```

The basic structure of a translation file is as follows:

```jsonc
// languages/en-US/commands/ping.json
{
	"success": "Pong!",
	"success_with_args": "Pong! Took me {{latency}}ms to reply"
}
```

The `resolveKey` function can be used anywhere to get translated text by its key. In this example, it is used in a method to send a message.

```typescript
import { resolveKey } from '@sapphire/plugin-i18next';
import { Command } from '@sapphire/framework';
import type { Message } from 'discord.js';

export class PingCommand extends Command {
	public constructor(context: Command.Context, options: Command.Options) {
		super(context, {
			...options,
			description: 'ping pong'
		});
	}

	public async messageRun(message: Message) {
		await message.channel.send(await resolveKey('commands/ping:success'));
	}
}
```

`sendLocalized` will send translated text resolved from a key to a specified channel.

```typescript
import { sendLocalized } from '@sapphire/plugin-i18next';
import { Command } from '@sapphire/framework';

import type { Message } from 'discord.js';

export class PingCommand extends Command {
	public constructor(context: Command.Context, options: Command.Options) {
		super(context, {
			...options,
			description: 'ping pong'
		});
	}

	public async messageRun(message: Message) {
		await sendLocalized(message, 'commands/ping:success');
	}
}
```

`editLocalized` edits a message, replacing its content with translated text resolved from its key.

```typescript
import { editLocalized } from '@sapphire/plugin-i18next';
import { Command } from '@sapphire/framework';

import type { Message } from 'discord.js';

export class PingCommand extends Command {
	public constructor(context: Command.Context, options: Command.Options) {
		super(context, {
			...options,
			description: 'ping pong'
		});
	}

	public async messageRun(message: Message) {
		await editLocalized(message, 'commands/ping:success_args', { latency: ws.ping });
	}
}
```

`fetchLanguage` returns the guild-specific language that the client is using.

```typescript
import { fetchLanguage } from '@sapphire/plugin-i18next';
import { Command } from '@sapphire/framework';

import type { Message } from 'discord.js';

export class PingCommand extends Command {
	public constructor(context: Command.Context, options: Command.Options) {
		super(context, {
			...options,
			description: 'ping pong'
		});
	}

	public async messageRun(message: Message) {
		return message.channel.send(await fetchLanguage(message));
		// ===> en-US
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
    <td align="center"><a href="https://favware.tech/"><img src="https://avatars3.githubusercontent.com/u/4019718?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Jeroen Claassens</b></sub></a><br /><a href="https://github.com/sapphiredev/plugins/commits?author=favna" title="Code">💻</a> <a href="#infra-favna" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#projectManagement-favna" title="Project Management">📆</a></td>
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
  <tr>
    <td align="center"><a href="https://github.com/feralheart"><img src="https://avatars.githubusercontent.com/u/3487559?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Feralheart</b></sub></a><br /><a href="https://github.com/sapphiredev/plugins/commits?author=feralheart" title="Code">💻</a></td>
    <td align="center"><a href="https://jurien.dev/"><img src="https://avatars.githubusercontent.com/u/5418114?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Jurien Hamaker</b></sub></a><br /><a href="https://github.com/sapphiredev/plugins/commits?author=jurienhamaker" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/apps/renovate"><img src="https://avatars.githubusercontent.com/in/2740?v=4?s=100" width="100px;" alt=""/><br /><sub><b>renovate[bot]</b></sub></a><br /><a href="#maintenance-renovate[bot]" title="Maintenance">🚧</a></td>
    <td align="center"><a href="https://renovate.whitesourcesoftware.com/"><img src="https://avatars.githubusercontent.com/u/25180681?v=4?s=100" width="100px;" alt=""/><br /><sub><b>WhiteSource Renovate</b></sub></a><br /><a href="#maintenance-renovate-bot" title="Maintenance">🚧</a></td>
    <td align="center"><a href="https://c43721.github.io/"><img src="https://avatars.githubusercontent.com/u/55610086?v=4?s=100" width="100px;" alt=""/><br /><sub><b>c43721</b></sub></a><br /><a href="https://github.com/sapphiredev/plugins/commits?author=c43721" title="Code">💻</a></td>
    <td align="center"><a href="https://megatank58.me/"><img src="https://avatars.githubusercontent.com/u/51410502?v=4?s=100" width="100px;" alt=""/><br /><sub><b>megatank58</b></sub></a><br /><a href="https://github.com/sapphiredev/plugins/commits?author=megatank58" title="Code">💻</a></td>
    <td align="center"><a href="https://fc5570.me/"><img src="https://avatars.githubusercontent.com/u/68158483?v=4?s=100" width="100px;" alt=""/><br /><sub><b>FC</b></sub></a><br /><a href="https://github.com/sapphiredev/plugins/commits?author=FC5570" title="Code">💻</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/Suyashtnt"><img src="https://avatars.githubusercontent.com/u/45307955?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Just a Badly Drawn TABS Dude</b></sub></a><br /><a href="https://github.com/sapphiredev/plugins/commits?author=Suyashtnt" title="Code">💻</a></td>
    <td align="center"><a href="https://newtt.me/"><img src="https://avatars.githubusercontent.com/u/19301186?v=4?s=100" width="100px;" alt=""/><br /><sub><b>newt :D</b></sub></a><br /><a href="https://github.com/sapphiredev/plugins/commits?author=newtykins" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
