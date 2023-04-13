<div align="center">

![Sapphire Logo](https://raw.githubusercontent.com/sapphiredev/assets/main/banners/SapphireCommunity.png)

# @sapphire/plugin-pattern-commands

**Plugin for <a href="https://github.com/sapphiredev/framework">@sapphire/framework</a> so you can have pattern commands.**

[![GitHub](https://img.shields.io/github/license/sapphiredev/plugins)](https://github.com/sapphiredev/plugins/blob/main/LICENSE.md)
[![codecov](https://codecov.io/gh/sapphiredev/plugins/branch/main/graph/badge.svg?token=QWL8FB16BR)](https://codecov.io/gh/sapphiredev/plugins)
[![npm bundle size](https://img.shields.io/bundlephobia/min/@sapphire/plugin-pattern-commands?logo=webpack&style=flat-square)](https://bundlephobia.com/result?p=@sapphire/plugin-pattern-commands)
[![npm](https://img.shields.io/npm/v/@sapphire/plugin-pattern-commands?color=crimson&logo=npm&style=flat-square)](https://www.npmjs.com/package/@sapphire/plugin-pattern-commands)

</div>

## Description

With pattern commands you can define rulesets to which the bot may respond.

## Important notes

-   Starting August 31, 2022 this plugin will only work with Message Intent. This is because this plugin relies on scanning messages, which is impossible without the intent.

## Features

-   Fully ready for TypeScript!
-   Includes ESM ready entrypoint
-   Type generics for easy extension in TypeScript
-   Input/Output mapping

## Installation

`@sapphire/plugin-pattern-commands` depends on the following packages. Be sure to install these along with this package!

-   [`@sapphire/framework`](https://www.npmjs.com/package/@sapphire/framework)
-   [`@sapphire/utilities`](https://www.npmjs.com/package/@sapphire/utilities)
-   [`@sapphire/stopwatch`](https://www.npmjs.com/package/@sapphire/stopwatch)
-   [`discord.js`](https://www.npmjs.com/package/discord.js)

You can use the following command to install this package, or replace `npm install` with your package manager of choice.

```sh
npm install @sapphire/plugin-pattern-commands @sapphire/framework @sapphire/utilities @sapphire/stopwatch discord.js
```

---

## Usage

-   Paste this in your Bot.ts (or where you initiate your client)

```typescript
import '@sapphire/plugin-pattern-commands/register';
```

-   Create a new `pattern-commands` directory under `/src`
-   Make your first pattern command:

```typescript
import type { Message } from 'discord.js';
import { PatternCommand } from '@sapphire/plugin-pattern-commands';
import { ApplyOptions } from '@sapphire/decorators';

@ApplyOptions<PatternCommand.Options>({
	aliases: ['cat', 'postman'],
	chance: 85
})
export class AwooCommand extends PatternCommand {
	public messageRun(message: Message) {
		message.reply('Woof!');
	}
}
```

In this example there's a 85% chance when your bot will bark at someone who says cat or postman.
The matcher is case-insensitive and can match at substrings as well (so in the example above the word catnip also can trigger your bot)
For aliases you can use regexp as well, but you have to encapsulate them as a string. For example:

```typescript
@ApplyOptions<PatternCommand.Options>({
    aliases: ['a{3,}'],
})
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
