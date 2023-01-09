<div align="center">

![Sapphire Logo](https://cdn.skyra.pw/gh-assets/sapphire-banner.png)

# @sapphire/plugin-subcommands

**Plugin for <a href="https://github.com/sapphiredev/framework">@sapphire/framework</a> so your commands can have subcommands.**

[![GitHub](https://img.shields.io/github/license/sapphiredev/plugins)](https://github.com/sapphiredev/plugins/blob/main/LICENSE.md)
[![codecov](https://codecov.io/gh/sapphiredev/plugins/branch/main/graph/badge.svg?token=QWL8FB16BR)](https://codecov.io/gh/sapphiredev/plugins)
[![npm bundle size](https://img.shields.io/bundlephobia/min/@sapphire/plugin-subcommands?logo=webpack&style=flat-square)](https://bundlephobia.com/result?p=@sapphire/plugin-subcommands)
[![npm](https://img.shields.io/npm/v/@sapphire/plugin-subcommands?color=crimson&logo=npm&style=flat-square)](https://www.npmjs.com/package/@sapphire/plugin-subcommands)

</div>

## Description

Subcommands are a way to split 1 command into multiple. This can in particular be very useful for configuration commands with subcommands such as `set`, `reset` and `remove`.

## Features

-   Fully ready for TypeScript!
-   Includes ESM ready entrypoint
-   Type generics for easy extension in TypeScript
-   Input/Output mapping

## Installation

`@sapphire/plugin-subcommands` depends on the following packages. Be sure to install these along with this package!

-   [`@sapphire/framework`](https://www.npmjs.com/package/@sapphire/framework)
-   [`@sapphire/utilities`](https://www.npmjs.com/package/@sapphire/utilities)
-   [`discord.js`](https://www.npmjs.com/package/discord.js)

You can use the following command to install this package, or replace `npm install` with your package manager of choice.

```sh
npm install @sapphire/plugin-subcommands @sapphire/framework @sapphire/utilities discord.js
```

---

## Usage

Start by importing the registration file in your project to use the plugins error loggers:

**JavaScript**

```js
require('@sapphire/plugin-subcommands/register');
```

**TypeScript**

```typescript
import '@sapphire/plugin-subcommands/register';
```

Then, you can create new subcommands by extending the Subcommand class.
_With TypeScript:_

```typescript
import { Subcommand } from '@sapphire/plugin-subcommands';
import { ApplyOptions } from '@sapphire/decorators';
import type { Args } from '@sapphire/framework';
import type { Message, CommandInteraction } from 'discord.js';

// Using ApplyOptions decorator makes it easy to configure
@ApplyOptions<Subcommand.Options>({
	subcommands: [
		{
			name: 'add',
			messageRun: 'messageAdd',
			chatInputRun: 'chatInputAdd'
		},
		{
			name: 'remove',
			messageRun: 'messageRemove',
			chatInputRun: 'chatInputRemove'
		},
		{
			name: 'list',
			messageRun: 'messageList',
			chatInputRun: 'chatInputList'
		}
	]
})
// Extend `Subcommand` instead of `Command`
export class UserCommand extends Subcommand {
	public async messageAdd(message: Message, args: Args) {}

	public async messageRemove(message: Message, args: Args) {}

	public async messageList(message: Message, args: Args) {}

	public async chatInputAdd(interaction: Subcommand.ChatInputInteraction) {}

	public async chatInputRemove(interaction: Subcommand.ChatInputInteraction) {}

	public async chatInputList(interaction: Subcommand.ChatInputInteraction) {}
}
```

_With JavaScript:_

```javascript
const { Subcommand } = require('@sapphire/plugin-subcommands');

// Extend `Subcommand` instead of `Command`
module.exports = class UserCommand extends Subcommand {
	constructor(context, options) {
		super(context, {
			...options,
			subcommands: [
				{
					name: 'add',
					messageRun: 'messageAdd',
					chatInputRun: 'chatInputAdd'
				},
				{
					name: 'remove',
					messageRun: 'messageRemove',
					chatInputRun: 'chatInputRemove'
				},
				{
					name: 'list',
					messageRun: 'messageList',
					chatInputRun: 'chatInputList'
				}
			]
		});
	}

	async messageAdd(message, args) {}

	async messageRemove(message, args) {}

	async messageList(message, args) {}

	async chatInputAdd(interaction) {}

	async chatInputRemove(interaction) {}

	async chatInputList(interaction) {}
};
```

For more documentation please refer to [guide](https://www.sapphirejs.dev/docs/Guide/plugins/Subcommands/getting-started)

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
