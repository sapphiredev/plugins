<div align="center">

![Sapphire Logo](https://raw.githubusercontent.com/sapphiredev/assets/main/banners/SapphireCommunity.png)

# @sapphire/plugin-logger

**Plugin for <a href="https://github.com/sapphiredev/framework">@sapphire/framework</a> to have pretty console output.**

[![GitHub](https://img.shields.io/github/license/sapphiredev/plugins)](https://github.com/sapphiredev/plugins/blob/main/LICENSE.md)
[![codecov](https://codecov.io/gh/sapphiredev/plugins/branch/main/graph/badge.svg?token=QWL8FB16BR)](https://codecov.io/gh/sapphiredev/plugins)
[![npm bundle size](https://img.shields.io/bundlephobia/min/@sapphire/plugin-logger?logo=webpack&style=flat-square)](https://bundlephobia.com/result?p=@sapphire/plugin-logger)
[![npm](https://img.shields.io/npm/v/@sapphire/plugin-logger?color=crimson&logo=npm&style=flat-square)](https://www.npmjs.com/package/@sapphire/plugin-logger)

</div>

## Description

A Logger implementation that implements Sapphire's `ILogger` interface and implements timestamp and style formatting
with the blazing fast [`colorette`](https://www.npmjs.com/package/colorette) library.

## Features

-   Fully ready for TypeScript!
-   Includes ESM ready entrypoint
-   [`NO_COLOR`](https://no-color.org) friendly, inherited by colorette

## Installation

`@sapphire/plugin-logger` depends on the following packages. Be sure to install these along with this package!

-   [`@sapphire/framework`](https://www.npmjs.com/package/@sapphire/framework)

You can use the following command to install this package, or replace `npm install` with your package manager of choice.

```sh
npm install @sapphire/plugin-logger @sapphire/framework
```

---

## Usage

This registers the necessary options and methods in the Sapphire client to be able to use the log plugin.

```typescript
// Main bot file
// Be sure to register the plugin before instantiating the client.
import '@sapphire/plugin-logger/register';
```

In order to use the Logger in any place other than a piece (commands, arguments, preconditions, etc.), you must first import the `container` property of `@sapphire/framework`. For pieces, you can simply use `this.container.logger` to access Logger methods.

```typescript
import { container } from '@sapphire/framework';

export class MyAwesomeService {
	public printAwesomeLog() {
		container.logger.info('log message');
	}
}
```

Here is an example ping command, demonstrating the use of `this.container.logger` from within a piece by omitting the explicit import.

```typescript
// ping command

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
		this.container.logger.warn('warning message');
	}
}
```

## Types of logs

1. `trace`
1. `debug`
1. `info`
1. `warn`
1. `error`
1. `fatal`

> Example: `container.logger.debug('log debug message');`

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
