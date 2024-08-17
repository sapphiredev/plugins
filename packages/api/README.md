<div align="center">

![Sapphire Logo](https://raw.githubusercontent.com/sapphiredev/assets/main/banners/SapphireCommunity.png)

# @sapphire/plugin-api

**Plugin for <a href="https://github.com/sapphiredev/framework">@sapphire/framework</a> to expose a REST API.**

[![GitHub](https://img.shields.io/github/license/sapphiredev/plugins)](https://github.com/sapphiredev/plugins/blob/main/LICENSE.md)
[![npm bundle size](https://img.shields.io/bundlephobia/min/@sapphire/plugin-api?logo=webpack&style=flat-square)](https://bundlephobia.com/result?p=@sapphire/plugin-api)
[![npm](https://img.shields.io/npm/v/@sapphire/plugin-api?color=crimson&logo=npm&style=flat-square)](https://www.npmjs.com/package/@sapphire/plugin-api)

</div>

## Description

This plugin provides an API endpoint for your bot that can be called from external services. A good exemplary use case for this is once your bot grows to have enough configuration options that you want to offer a website to your end-users to change those settings, and your website needs to interface with the bot for this to work.

## Features

-   Fully ready for TypeScript!
-   Follows common REST standards.
-   Includes ESM ready entrypoint
-   Premade OAuth 2.0 endpoints

## Installation

`@sapphire/plugin-api` depends on the following packages. Be sure to install these along with this package!

-   [`@sapphire/framework`](https://www.npmjs.com/package/@sapphire/framework)
-   [`discord.js`](https://www.npmjs.com/package/discord.js)
-   [`discord-api-types`](https://www.npmjs.com/package/discord-api-types)

You can use the following command to install this package, or replace `npm install` with your package manager of choice.

```sh
npm install @sapphire/plugin-api @sapphire/framework discord.js discord-api-types
```

---

## Usage

Start by importing the registration file in your project to use the plugin:

**JavaScript**

```js
require('@sapphire/plugin-api/register');
```

**TypeScript**

```typescript
import '@sapphire/plugin-api/register';
```

Then, you can use the following configuration options in your SapphireClient extension class or initializer. This will either be located in your `new SapphireClient` constructor call, or `super` in your constructor method if you use an extension class.

```js
{
  auth: {
	// The application/client ID of your bot.
	// You can find this at https://discord.com/developers/applications
    id: '',
	// The client secret of your bot.
	// You can find this at https://discord.com/developers/applications
    secret: '',
	// The name of the authentication cookie.
    cookie: 'SAPPHIRE_AUTH',
	// The URL that users should be redirected to after a successful authentication
    redirect: '',
	// The scopes that should be given to the authentication.
    scopes: [OAuth2Scopes.Identify],
	// Transformers to transform the raw data from Discord to a different structure.
    transformers: []
  },
  // The prefix for all routes, e.g. / or v1/.
  prefix: '',
  // The origin header to be set on every request at 'Access-Control-Allow-Origin.
  origin: '*',
  // Any options passed to the NodeJS "net" internal server.listen function
  // See https://nodejs.org/api/net.html#net_server_listen_options_callback
  listenOptions: {
	// The port the API will listen on.
    port: 4000
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
