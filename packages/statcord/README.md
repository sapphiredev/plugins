<div align="center">

![Sapphire Logo](https://cdn.skyra.pw/gh-assets/sapphire-banner.png)

# @sapphire/plugin-statcord

**Plugin for <a href="https://github.com/sapphiredev/framework">@sapphire/framework</a> to post and manage bot stats with <a href="https://statcord.com/">Statcord</a>.**

[![GitHub](https://img.shields.io/github/license/sapphiredev/plugins)](https://github.com/sapphiredev/plugins/blob/main/LICENSE.md)
[![codecov](https://codecov.io/gh/sapphiredev/plugins/branch/main/graph/badge.svg?token=QWL8FB16BR)](https://codecov.io/gh/sapphiredev/plugins)
[![npm bundle size](https://img.shields.io/bundlephobia/min/@sapphire/plugin-statcord?logo=webpack&style=flat-square)](https://bundlephobia.com/result?p=@sapphire/plugin-statcord)
[![npm](https://img.shields.io/npm/v/@sapphire/plugin-statcord?color=crimson&logo=npm&style=flat-square)](https://www.npmjs.com/package/@sapphire/plugin-statcord)

</div>

## Description

This plugin allows the integration of Statcord with the Bot. Statcord is a web page that allows to manage statistics such as, how many commands were executed in a day, new guilds, etc.

More information about Statcord can be found on its [website](https://statcord.com).

## Features

-   Fully ready for TypeScript!
-   Includes ESM ready entrypoint
-   Easy to use

## Installation

`@sapphire/plugin-statcord` depends on the following packages. Be sure to install these along with this package!

-   [`@sapphire/framework`](https://www.npmjs.com/package/@sapphire/framework)

You can use the following command to install this package, or replace `npm install` with your package manager of choice.

```sh
npm install @sapphire/plugin-statcord @sapphire/framework
```

---

## Usage

### JavaScript

In your main or setup file, register the plugin:

```javascript
require('@sapphire/plugin-statcord/register');
```

It is important to add an API key provided by Statcord.

```javascript
require('@sapphire/plugin-statcord/register');

const client = new SapphireClient({
	/* your bot options */
	statcord: {
		key: 'YOUR_AWESOME_API_KEY', // (Required) Statcord API key.
		autopost: false, // (Optional) Allows automatic posting of statistics.
		baseUrl: 'https://api.statcord.com/v3', // (Optional) Change the base URL of the Statcord API.
		debug: false, // (Optional) Show debug messages.
		sharding: false // (Optional) Activate the sharding mode, it is important to read the notes below.
	}
});

async function main() {
	await client.login();
}

void main();
```

### TypeScript

In your main or setup file, register the plugin:

```typescript
import '@sapphire/plugin-statcord/register';
```

It is important to add an API key provided by Statcord.

```typescript
import '@sapphire/plugin-statcord/register';

const client = new SapphireClient({
	/* your bot options */
	statcord: {
		key: 'YOUR_AWESOME_API_KEY', // (Required) Statcord API key.
		autopost: false, // (Optional) Allows automatic posting of statistics.
		baseUrl: 'https://api.statcord.com/v3', // (Optional) Change the base URL of the Statcord API.
		debug: false, // (Optional) Show debug messages.
		sharding: false // (Optional) Activate the sharding mode, it is important to read the notes below.
	}
});

async function main() {
	await client.login();
}

void main();
```

If you enable the `autopost` option, that's it, the plugin will collect and publish the statistics for you, you don't have to do anything else!

## Bandwidth usage
To set the bandwidth usage in each statistics post the `setBandwidthUsage()` method is available, the data sent by this method is reset in each statistics post. This is done so that the user can choose the best way to get this data.

### Javascript
```javascript
const { container } = require('@sapphire/framework');

class MyAwesomeServicePostStats {
	public postBandwidth() {
		const bandwidthUsage = getBandwidthUsage(); // Use your method to get this data.
		container.statcord.setBandwidthUsage(bandwidthUsage);
	}
}

export default MyAwesomeServicePostStats;
```

### TypeScript

```typescript
import { container } from '@sapphire/framework';

export class MyAwesomeServicePostStats {
	public postBandwidth() {
		const bandwidthUsage = getBandwidthUsage(); // Use your method to get this data.
		container.statcord.setBandwidthUsage(bandwidthUsage);
	}
}
```

## Posting statistics manually
To be able to post statistics manually, it is necessary to disable the `autopost` option in the statcord options, by default it is disabled.

### Javascript

```javascript
const client = new SapphireClient({
	/* your bot options */
	statcord: {
		key: 'YOUR_AWESOME_API_KEY',
		autopost: false
	}
});

async function main() {
	await client.login();
}

void main();
```

### TypeScript

```typescript
import '@sapphire/plugin-statcord/register';

const client = new SapphireClient({
	/* your bot options */
	statcord: {
		key: 'YOUR_AWESOME_API_KEY',
		autopost: false
	}
});

async function main() {
	await client.login();
}

void main();
```

In order to be able to post statistics there is the `postStats` method available, by default, the statistics of used commands, popular commands, total guilds and users are managed internally by the plugin.

Remember that you can use these methods and all the Statcord plugin methods globally available anywhere in the Bot.

### Javascript
```javascript
const { container } = require('@sapphire/framework');

class MyAwesomeServicePostStats {
	public postStats() {
		container.statcord.postStats();
	}
}

export default MyAwesomeServicePostStats;
```

### TypeScript

```typescript
import { container } from '@sapphire/framework';

export class MyAwesomeServicePostStats {
	public postStats() {
		container.statcord.postStats();
	}
}
```

## Get statistics
The plugin allows to get the statistics from Statcord, as it also has methods that wrapper with the Statcord API.

1. `clientStats();`: Get current client statistics in Statcord.
2. `bucketStats();`: Check everyone who has voted for the bot today.
3. `userVotesStats();`: Check if someone has voted for the bot today.

## Notes
1. The `postCommand` and `postStats` methods are available globally so that they can be used in other ways according to the user's needs. For example, it is recommended to disable the `autopost` option when using the ShardingManager, as it is possible for Shards to go into Rate Limit in the Statcord API when they all perform the action of posting statistics at the same time and having these methods available allows you to devise a better way to post those statistics.
2. If the `sharding` mode is used together with the `autopost` option it is important that the Shards have at least 1 minute of initialization between them, so that the shards have a difference of `1 minute` and thus be able to send the statistics without entering Rate Limit in the Statcord API.

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
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification.
Contributions of any kind welcome!
