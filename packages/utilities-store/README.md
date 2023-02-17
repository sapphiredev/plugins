<div align="center">

![Sapphire Logo](https://cdn.skyra.pw/gh-assets/sapphire-banner.png)

# @sapphire/plugin-utilities-store

**Plugin for <a href="https://github.com/sapphiredev/framework">@sapphire/framework</a> to have a Sapphire store which you can fill with utility functions available through the container.**

[![GitHub](https://img.shields.io/github/license/sapphiredev/plugins)](https://github.com/sapphiredev/plugins/blob/main/LICENSE.md)
[![codecov](https://codecov.io/gh/sapphiredev/plugins/branch/main/graph/badge.svg?token=QWL8FB16BR)](https://codecov.io/gh/sapphiredev/plugins)
[![npm bundle size](https://img.shields.io/bundlephobia/min/@sapphire/plugin-api?logo=webpack&style=flat-square)](https://bundlephobia.com/result?p=@sapphire/plugin-api)
[![npm](https://img.shields.io/npm/v/@sapphire/plugin-api?color=crimson&logo=npm&style=flat-square)](https://www.npmjs.com/package/@sapphire/plugin-api)

</div>

## Description

When writing a bot you often have many external utility functions and to have some centralized place to access them from it is useful to have an automatically imported utilities store. This plugin provides a store that you can fill with utility functions and access them from the container.

**Please note that utility functions are available on the Sapphire `container` only after the bot has logged in, any functions required before logging in should be exported through normal module loading means.**

## Installation

`@sapphire/plugin-utilities-store` depends on the following packages. Be sure to install these along with this package!

-   [`@sapphire/framework`](https://www.npmjs.com/package/@sapphire/framework)

You can use the following command to install this package, or replace `npm install` with your package manager of choice.

```sh
npm install @sapphire/plugin-utilities-store
```

---

## Usage

Start by importing the registration file in your project to use the plugin:

**JavaScript**

```javascript
require('@sapphire/plugin-utilities-store/register');
```

**TypeScript**

```typescript
import '@sapphire/plugin-utilities-store/register';
```

-   Create a new `utilities` directory under `/src`
-   Make your first utility piece:

```typescript
import { Utility } from '@sapphire/plugin-utilities-store';

export class SumUtility extends Utility {
	public constructor(context: Utility.Context, options: Utility.Options) {
		super(context, {
			...options,
			name: 'sum'
		});
	}

	public add(numberOne: number, numberTwo: number) {
		return numberOne + numberTwo;
	}

	public subtract(numberOne: number, numberTwo: number) {
		return numberOne - numberTwo;
	}
}
```

In this example we simply add and subtract two numbers. You can pass any arguments you wish to the utility function, and it will execute as written.

In order for TypeScript to know about your utility functions and their arguments you need to do leverage module augmentation. `SumUtility` here is the piece class as defined in the example above.

```typescript
declare module '@sapphire/plugin-utilities-store' {
	export interface Utilities {
		sum: SumUtility;
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
