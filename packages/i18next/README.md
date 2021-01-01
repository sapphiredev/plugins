<div align="center">

![Sapphire Logo](https://cdn.skyra.pw/gh-assets/sapphire.png)

# @sapphire/plugin-i18next

**Plugin for <a href="https://github.com/sapphire-project/framework">@sapphire/framework</a> to support i18next based internationalization.**

[![GitHub](https://img.shields.io/github/license/sapphire-project/plugins)](https://github.com/sapphire-project/plugins/blob/main/LICENSE.md)
[![Total alerts](https://img.shields.io/lgtm/alerts/g/sapphire-project/plugins.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/sapphire-project/plugins/alerts/)
[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/sapphire-project/plugins.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/sapphire-project/plugins/context:javascript)
[![Coverage Status](https://coveralls.io/repos/github/sapphire-project/plugins/badge.svg?branch=main)](https://coveralls.io/github/sapphire-project/plugins?branch=main)
[![npm bundle size](https://img.shields.io/bundlephobia/min/@sapphire/plugin-in17n?logo=webpack&style=flat-square)](https://bundlephobia.com/result?p=@sapphire/plugin-in17n)
[![npm](https://img.shields.io/npm/v/@sapphire/plugin-in17n?color=crimson&logo=npm&style=flat-square)](https://www.npmjs.com/package/@sapphire/plugin-in17n)
[![Depfu](https://badges.depfu.com/badges/11bbf7392987e6fd51fc6559e1d42dfc/count.svg)](https://depfu.com/github/sapphire-project/plugins?project_id=15201)

</div>

## Description

An implementation of i18next's [filesystem backend] for Sapphire. It allows you to use a JSON-based `languages` directory to add internationalization for your bot using `SapphireClient`'s `fetchLanguage` hook and a custom message extension, adding features such as `sendTranslated` and `fetchLanguageKey`.

[filesystem backend]: https://github.com/i18next/i18next-fs-backend

## Features

-   Fully ready for TypeScript!
-   Includes ESM ready entrypoint
-   Framework agnostic
-   Includes convenience register for discord.js

## Installation

```sh
yarn add -D @sapphire/plugin-i18next
```

---

## Usage

```typescript
import '@sapphire/plugin-i18next/register';
```

And for discord.js:

```typescript
import '@sapphire/plugin-i18next/register-discordjs';
```

It is to be noted that unless you are using discord.js, which has the convenience register to extend the client and message methods for you, you will have to implement your own extensions.

This is currently undocumented and not covered by guides, but will be in the future. For now, you may follow the structure of `register-discordjs.ts` if this is the case for you.

## Sapphire i18next Documentation

For the full @sapphire/plugin-i18next documentation please refer to the TypeDoc generated [documentation](https://sapphire-project.github.io/plugins/modules/_sapphire_plugin_i18next.html).

## Buy us some doughnuts

Sapphire Project is and always will be open source, even if we don't get donations. That being said, we know there are amazing people who may still want to donate just to show their appreciation. Thank you very much in advance!

We accept donations through Open Collective, Ko-fi, Paypal, Patreon and GitHub Sponsorships. You can use the buttons below to donate through your method of choice.

|   Donate With   |                                             Address                                              |
| :-------------: | :----------------------------------------------------------------------------------------------: |
| Open Collective |                    [Click Here](https://opencollective.com/sapphire-project)                     |
|      Ko-fi      |                         [Click Here](https://ko-fi.com/sapphireproject)                          |
|     Patreon     |                      [Click Here](https://www.patreon.com/sapphire_project)                      |
|     PayPal      | [Click Here](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=SP738BQTQQYZY) |

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
