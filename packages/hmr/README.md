<div align="center">

![Sapphire Logo](https://raw.githubusercontent.com/sapphiredev/assets/main/banners/SapphireCommunity.png)

# @sapphire/plugin-hmr

**Plugin for <a href="https://github.com/sapphiredev/framework">@sapphire/framework</a> for super-speed HMR.**

[![GitHub](https://img.shields.io/github/license/sapphiredev/plugins)](https://github.com/sapphiredev/plugins/blob/main/LICENSE.md)
[![codecov](https://codecov.io/gh/sapphiredev/plugins/branch/main/graph/badge.svg?token=QWL8FB16BR)](https://codecov.io/gh/sapphiredev/plugins)
[![npm bundle size](https://img.shields.io/bundlephobia/min/@sapphire/plugin-hmr?logo=webpack&style=flat-square)](https://bundlephobia.com/result?p=@sapphire/plugin-hmr)
[![npm](https://img.shields.io/npm/v/@sapphire/plugin-hmr?color=crimson&logo=npm&style=flat-square)](https://www.npmjs.com/package/@sapphire/plugin-hmr)

</div>

## Description

This plugin provides a HMR (Hot Module Replacement) feature for @sapphire/framework. This allows you to add, delete, and
update commands, listeners, and other pieces without having to restart your bot. This allows for rapid iteration and prototyping without your bot slowing you down.

## Features

-   Fully ready for TypeScript!
-   Includes ESM ready entrypoint
-   Easy to use

## Installation

`@sapphire/plugin-hmr` depends on the following packages. Be sure to install these along with this package!

-   [`@sapphire/framework`](https://www.npmjs.com/package/@sapphire/framework)

You can use the following command to install this package, or replace `npm install` with your package manager of choice.

```sh
npm install @sapphire/plugin-hmr @sapphire/framework
```

---

## Usage

### JavaScript

In your main or setup file, register the plugin:

```javascript
require('@sapphire/plugin-hmr/register');
```

Or if you want to make sure the plugin is only loaded in development, you can register it dynamically like so:

```javascript
require('@sapphire/plugin-hmr/register');

const client = new SapphireClient({
	/* your bot options */
	hmr: {
		enabled: process.env.NODE_ENV === 'development'
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
import '@sapphire/plugin-hmr/register';
```

Or if you want to make sure the plugin is only loaded in development, you can register it dynamically like so:

```typescript
import '@sapphire/plugin-hmr/register';

const client = new SapphireClient({
	/* your bot options */
	hmr: {
		enabled: process.env.NODE_ENV === 'development'
	}
});

async function main() {
	await client.login();
}

void main();
```

In order for HMR to pick up your compiled JavaScript files, you will need to recompile your code. To that end, we will configure a `dev` script in `package.json` scripts that runs `build` in parallel with `start`:

```json
"scripts": {
	"dev": "run-p watch start",
	"build": "tsc",
	"watch": "tsc --watch",
	"start": "node dist/index.js"
}
```

_Note:_ This uses the `run-p` script which is part of [`npm-run-all`](https://github.com/mysticatea/npm-run-all)

_Note 2:_ Please do note that because the processes are started simultaneously you should run `build` at least once before running `dev`, otherwise the `start` process will fail because there are no files to run just yet.

then run your bot using the dev script. You can replace npm with your package manager of choice.

```sh
npm run start
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
