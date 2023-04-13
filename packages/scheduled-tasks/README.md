<div align="center">

![Sapphire Logo](https://raw.githubusercontent.com/sapphiredev/assets/main/banners/SapphireCommunity.png)

# @sapphire/plugin-scheduled-tasks

**Plugin for <a href="https://github.com/sapphiredev/framework">@sapphire/framework</a> to add support for scheduled tasks.**

[![GitHub](https://img.shields.io/github/license/sapphiredev/plugins)](https://github.com/sapphiredev/plugins/blob/main/LICENSE.md)
[![codecov](https://codecov.io/gh/sapphiredev/plugins/branch/main/graph/badge.svg?token=QWL8FB16BR)](https://codecov.io/gh/sapphiredev/plugins)
[![npm bundle size](https://img.shields.io/bundlephobia/min/@sapphire/plugin-scheduled-tasks?logo=webpack&style=flat-square)](https://bundlephobia.com/result?p=@sapphire/plugin-scheduled-tasks)
[![npm](https://img.shields.io/npm/v/@sapphire/plugin-scheduled-tasks?color=crimson&logo=npm&style=flat-square)](https://www.npmjs.com/package/@sapphire/plugin-scheduled-tasks)

</div>

## Description

Many bots have features that need to run periodically, such as uploading analytics data, reminders for users, birthdays, scheduled giveaways, undoing moderation actions, and more. Several implemented solutions exist for this, but as with many time-based processing attempts, they are often flawed and unreliable. This plugin is our solution, enabling you to schedule tasks and save them in services like Redis and SQS with ease.

## Features

-   Full TypeScript support
-   Includes ESM entrypoint

## Installation

`@sapphire/plugin-scheduled-tasks` depends on the following packages. Be sure to install these along with this package!

-   [`@sapphire/framework`](https://www.npmjs.com/package/@sapphire/framework)

In case you want to use bullmq as your provider:

-   [`bullmq`](https://www.npmjs.com/package/bullmq)

In case you want to use sqs as your provider:

-   [`sqs-consumer`](https://www.npmjs.com/package/sqs-consumer)
-   [`sqs-producer`](https://www.npmjs.com/package/sqs-producer)

You can use the following command to install this package along with `bullmq`, or replace `npm install` with your package manager of choice.

```sh
npm install @sapphire/plugin-scheduled-tasks @sapphire/framework bullmq
```

or with `sqs`

```sh
npm install @sapphire/plugin-scheduled-tasks @sapphire/framework sqs-consumer sqs-producer
```

---

## Usage

This registers the necessary options and methods in the Sapphire client to be able to use the schedule plugin.

```typescript
// Main bot file
// Be sure to register the plugin before instantiating the client.
import { ScheduledTaskRedisStrategy } from '@sapphire/plugin-scheduled-tasks/register-redis';

// Or if you want to use sqs
import { ScheduledTaskSQSStrategy } from '@sapphire/plugin-scheduled-tasks/register-sqs';
```

Then, you can pass the imported Strategy into the configuration options in your SapphireClient extension class or initializer. This will either be located in your new SapphireClient constructor call, or super in your constructor method if you use an extension class.

```typescript
const options = {
	...otherClientOptionsGoHere,
	tasks: {
		// Using bullmq (redis)
		strategy: new ScheduledTaskRedisStrategy({
			/* You can add your Bull options here, for example we can configure custom Redis connection options: */
			bull: {
				connection: {
					port: 8888, // Defaults to 6379, but if your Redis server runs on another port configure it here
					password: 'very-strong-password', // If your Redis server requires a password configure it here
					host: 'localhost', // The host at which the redis server is found
					db: 2 // Redis database number, defaults to 0 but can be any value between 0 and 15
				}
			}
		}),
		// Or with SQS
		strategy: new ScheduledTaskSQSStrategy({
			/* You can add your SQS options here */
		})
	}
};
```

In order to use the scheduled tasks anywhere other than a piece (commands, arguments, preconditions, etc.), you must first import the `container` property of `@sapphire/framework`. For pieces, you can simply use `this.container.tasks` to access this plugin's methods.

This is a simple example that creates a task to be run in 2 seconds from a service.

```typescript
import { container } from '@sapphire/framework';

export class MyAwesomeService {
	public createAwesomeTask() {
		container.tasks.create('name', { id: '123' }, 2000);
	}
}
```

Here is an example mute command, demonstrating the use of `this.container.tasks` from within a piece by omitting the explicit import.

```typescript
// mute command

import { Command, CommandOptions, PieceContext } from '@sapphire/framework';
import type { Message } from 'discord.js';

export class MuteCommand extends Command {
	public constructor(context: PieceContext) {
		super(context, {
			description: 'Mute a user'
		});
	}

	public async run(message: Message) {
		// create a task to unmute the user in 1 minute
		this.container.tasks.create('unmute', { authorId: message.author.id }, 60_000);
	}
}
```

### Create a task handler

Scheduled tasks use their own store, like other types of pieces. You can create a directory alongside your commands directory named `scheduled-tasks` and place your tasks there, but they must inherit from `ScheduledTask`, like so.

#### Manual task example

##### Creating the Piece:

```typescript
import { ScheduledTask } from '@sapphire/plugin-scheduled-tasks';

export class ManualTask extends ScheduledTask {
	public constructor(context: ScheduledTask.Context, options: ScheduledTask.Options) {
		super(context, options);
	}

	public async run(payload: unknown) {
		this.container.logger.info('I ran!', payload);
	}
}

declare module '@sapphire/plugin-scheduled-tasks' {
	interface ScheduledTasks {
		manual: never;
	}
}
```

##### Using Manual Tasks

```typescript
container.tasks.create('manual', payload, 5000);
```

#### Pattern Task Example

Pattern jobs are currently only supported by the Redis strategy.

##### Creating the Piece:

```typescript
import { ScheduledTask } from '@sapphire/plugin-scheduled-tasks';

export class PatternTask extends ScheduledTask {
	public constructor(context: ScheduledTask.Context, options: ScheduledTask.Options) {
		super(context, {
			...options,
			pattern: '0 * * * *'
		});
	}

	public async run() {
		this.container.logger.info('I run every hour at *:00');
	}
}

declare module '@sapphire/plugin-scheduled-tasks' {
	interface ScheduledTasks {
		pattern: never;
	}
}
```

##### Using Pattern tasks

Pattern & Interval tasks are loaded automatically.

#### Interval task example

##### Creating the Piece:

```typescript
import { ScheduledTask } from '@sapphire/plugin-scheduled-tasks';

export class IntervalTask extends ScheduledTask {
	public constructor(context: ScheduledTask.Context, options: ScheduledTask.Options) {
		super(context, {
			...options,
			interval: 60_000 // 60 seconds
		});
	}

	public async run() {
		this.container.logger.info('I run every minute');
	}
}

declare module '@sapphire/plugin-scheduled-tasks' {
	interface ScheduledTasks {
		interval: never;
	}
}
```

##### Using Interval tasks

Pattern & Interval tasks are loaded automatically.

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
