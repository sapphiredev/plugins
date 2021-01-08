<div align="center">

![Sapphire Logo](https://cdn.skyra.pw/gh-assets/sapphire.png)

# @sapphire/plugin-prompt

**Plugin for <a href="https://github.com/sapphire-project/framework">@sapphire/framework</a> to add prompt messages.**

[![GitHub](https://img.shields.io/github/license/sapphire-project/plugins)](https://github.com/sapphire-project/plugins/blob/main/LICENSE.md)
[![Total alerts](https://img.shields.io/lgtm/alerts/g/sapphire-project/plugins.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/sapphire-project/plugins/alerts/)
[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/sapphire-project/plugins.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/sapphire-project/plugins/context:javascript)
[![Coverage Status](https://coveralls.io/repos/github/sapphire-project/plugins/badge.svg?branch=main)](https://coveralls.io/github/sapphire-project/plugins?branch=main)
[![npm bundle size](https://img.shields.io/bundlephobia/min/@sapphire/plugin-in17n?logo=webpack&style=flat-square)](https://bundlephobia.com/result?p=@sapphire/plugin-in17n)
[![npm](https://img.shields.io/npm/v/@sapphire/plugin-in17n?color=crimson&logo=npm&style=flat-square)](https://www.npmjs.com/package/@sapphire/plugin-in17n)
[![Depfu](https://badges.depfu.com/badges/11bbf7392987e6fd51fc6559e1d42dfc/count.svg)](https://depfu.com/github/sapphire-project/plugins?project_id=15201)

</div>

## Description

Simple plugin to extend Channel & Messages with a prompt.

## Features

-   Fully ready for TypeScript!
-   Includes ESM ready entrypoint
-   Includes convenience register for discord.js

## Installation

```sh
yarn add -D @sapphire/plugin-prompt
```

---

## Usage

```typescript
import '@sapphire/plugin-prompt/register';
```

And for discord.js:

```typescript
import '@sapphire/plugin-prompt/register-discordjs';
```

It is to be noted that unless you are using discord.js, which has the convenience register to extend the channel and message methods for you, you will have to implement your own extensions.

This is currently undocumented and not covered by guides, but will be in the future. For now, you may follow the structure of `register-discordjs.ts` if this is the case for you.

## Sapphire prompt Documentation

For the full @sapphire/plugin-prompt documentation please refer to the TypeDoc generated [documentation](https://sapphire-project.github.io/plugins/modules/_sapphire_plugin_prompt.html).

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
<table>
  <tr>
    <td align="center"><a href="https://favware.tech/"><img src="https://avatars3.githubusercontent.com/u/4019718?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Jeroen Claassens</b></sub></a><br /><a href="https://github.com/sapphire-project/plugins/commits?author=Favna" title="Code">�</a> <a href="#infra-Favna" title="Infrastructure (Hosting, Build-Tools, etc)">�</a> <a href="#projectManagement-Favna" title="Project Management">�</a></td>
    <td align="center"><a href="https://quantumlytangled.com"><img src="https://avatars1.githubusercontent.com/u/7919610?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Nejc Drobnic</b></sub></a><br /><a href="https://github.com/sapphire-project/plugins/commits?author=QuantumlyTangled" title="Code">�</a> <a href="https://github.com/sapphire-project/plugins/commits?author=QuantumlyTangled" title="Documentation">�</a></td>
    <td align="center"><a href="https://github.com/kyranet"><img src="https://avatars0.githubusercontent.com/u/24852502?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Antonio Román</b></sub></a><br /><a href="https://github.com/sapphire-project/plugins/commits?author=kyranet" title="Code">�</a></td>
    <td align="center"><a href="https://github.com/vladfrangu"><img src="https://avatars3.githubusercontent.com/u/17960496?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Vlad Frangu</b></sub></a><br /><a href="https://github.com/sapphire-project/plugins/pulls?q=is%3Apr+reviewed-by%3Avladfrangu" title="Reviewed Pull Requests">�</a></td>
    <td align="center"><a href="https://github.com/apps/depfu"><img src="https://avatars3.githubusercontent.com/in/715?v=4?s=100" width="100px;" alt=""/><br /><sub><b>depfu[bot]</b></sub></a><br /><a href="#maintenance-depfu[bot]" title="Maintenance">�</a></td>
    <td align="center"><a href="https://github.com/apps/dependabot"><img src="https://avatars0.githubusercontent.com/in/29110?v=4?s=100" width="100px;" alt=""/><br /><sub><b>dependabot[bot]</b></sub></a><br /><a href="#maintenance-dependabot[bot]" title="Maintenance">�</a></td>
    <td align="center"><a href="https://github.com/apps/allcontributors"><img src="https://avatars0.githubusercontent.com/in/23186?v=4?s=100" width="100px;" alt=""/><br /><sub><b>allcontributors[bot]</b></sub></a><br /><a href="https://github.com/sapphire-project/plugins/commits?author=allcontributors[bot]" title="Documentation">�</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/Nytelife26"><img src="https://avatars1.githubusercontent.com/u/22531310?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Tyler J Russell</b></sub></a><br /><a href="https://github.com/sapphire-project/plugins/commits?author=Nytelife26" title="Code">�</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
