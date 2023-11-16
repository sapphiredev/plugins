<div align="center">

![Sapphire Logo](https://raw.githubusercontent.com/sapphiredev/assets/main/banners/SapphireCommunity.png)

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
	public constructor(context: Command.LoaderContext, options: Command.Options) {
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
	public constructor(context: Command.LoaderContext, options: Command.Options) {
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
	public constructor(context: Command.LoaderContext, options: Command.Options) {
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
	public constructor(context: Command.LoaderContext, options: Command.Options) {
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

## Contributors

Please make sure to read the [Contributing Guide][contributing] before making a pull request.

Thank you to all the people who already contributed to Sapphire!

<a href="https://github.com/sapphiredev/plugins/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=sapphiredev/plugins" />
</a>

[contributing]: https://github.com/sapphiredev/.github/blob/main/.github/CONTRIBUTING.md
