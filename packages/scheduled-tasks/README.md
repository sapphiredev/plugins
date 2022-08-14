<div align="center">

![Sapphire Logo](https://cdn.skyra.pw/gh-assets/sapphire-banner.png)

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
-   [`@sapphire/stopwatch`](https://www.npmjs.com/package/@sapphire/stopwatch)

In case you want to use bullmq as your provider:

-   [`bullmq`](https://www.npmjs.com/package/bullmq)

In case you want to use sqs as your provider:

-   [`sqs-consumer`](https://www.npmjs.com/package/sqs-consumer)
-   [`sqs-producer`](https://www.npmjs.com/package/sqs-producer)

You can use the following command to install this package along with `bullmq`, or replace `npm install` with your package manager of choice.

```sh
npm install @sapphire/plugin-scheduled-tasks @sapphire/framework @sapphire/stopwatch bullmq

// If you are using TypeScript, you need to install the @types/ioredis types
npm install @types/ioredis --save-dev
```

or with `sqs`

```sh
npm install @sapphire/plugin-scheduled-tasks @sapphire/framework @sapphire/stopwatch sqs-consumer sqs-producer
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

#### Cron Task Example

Cron jobs are currently only supported by the Redis strategy.

##### Creating the Piece:

```typescript
import { ScheduledTask } from '@sapphire/plugin-scheduled-tasks';

export class CronTask extends ScheduledTask {
	public constructor(context: ScheduledTask.Context, options: ScheduledTask.Options) {
		super(context, {
			...options,
			cron: '0 * * * *'
		});
	}

	public async run() {
		this.container.logger.info('I run every hour at *:00');
	}
}

declare module '@sapphire/plugin-scheduled-tasks' {
	interface ScheduledTasks {
		cron: never;
	}
}
```

##### Using Cron tasks

Cron & Interval tasks are loaded automatically.

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

Cron & Interval tasks are loaded automatically.

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
    <td align="center"><a href="https://linktr.ee/mzato0001"><img src="https://avatars.githubusercontent.com/u/62367547?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Mzato</b></sub></a><br /><a href="https://github.com/sapphiredev/plugins/commits?author=Mzato0001" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
