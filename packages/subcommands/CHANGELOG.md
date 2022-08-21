# Changelog

All notable changes to this project will be documented in this file.

# [@sapphire/plugin-subcommands@3.1.1](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-subcommands@3.1.0...@sapphire/plugin-subcommands@3.1.1) - (2022-08-21)

## 🐛 Bug Fixes

- Fixed arg parsing (#340) ([80c35c9](https://github.com/sapphiredev/plugins/commit/80c35c97f3d0a0663382accb61efd1530c9849ee))

# [@sapphire/plugin-subcommands@3.1.0](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-subcommands@3.0.0...@sapphire/plugin-subcommands@3.1.0) - (2022-08-21)

## 🐛 Bug Fixes

- Add missing messages to `UserError` throws ([59d5986](https://github.com/sapphiredev/plugins/commit/59d59869421af3d112793a60ff6633b4c70efbb7))
- Fixed matching of message subcommand groups ([bb5a769](https://github.com/sapphiredev/plugins/commit/bb5a7698c8ee7637d076d8b827b458e148ac8baa))

## 🚀 Features

- Expose the `matchedSubcommandMapping` on `MessageSubcommandAcceptedPayload` and `ChatInputSubcommandAcceptedPayload` context ([273b740](https://github.com/sapphiredev/plugins/commit/273b7405392305d7e2f1324333906da4dc1ee8ed))

# [@sapphire/plugin-subcommands@3.0.0](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-subcommands@2.2.2...@sapphire/plugin-subcommands@3.0.0) - (2022-08-20)

## 📝 Documentation

- Add @ricardooow as a contributor ([15d7f9b](https://github.com/sapphiredev/plugins/commit/15d7f9b0d7428559441550aba1918d068565baa6))
- Add @imranbarbhuiya as a contributor ([e3d8fdc](https://github.com/sapphiredev/plugins/commit/e3d8fdc433a6c89389b2e1c574245e8140d1c47a))
- Add @KrishAgarwal2811 as a contributor ([875dda0](https://github.com/sapphiredev/plugins/commit/875dda0756f1b5302e77993e44a1ac9ab1a065d0))
- Add @jczstudios as a contributor ([c9126bc](https://github.com/sapphiredev/plugins/commit/c9126bc2bb454989c006864293ef99a47369dc38))
- Add @MajesticString as a contributor ([2743c8d](https://github.com/sapphiredev/plugins/commit/2743c8d5b9abe1b554ac7d776cb827d6a1e9db7b))
- Add @Mzato0001 as a contributor ([06626cd](https://github.com/sapphiredev/plugins/commit/06626cd7ff94d3bc8ce75da6383e1b77b6109a3d))

## 🚀 Features

- **subcommands:** Lowercase subcommands and dashless aliases (#337) ([31ea70c](https://github.com/sapphiredev/plugins/commit/31ea70caae38988ca395dd3e934822c26e6df4f6))
- ***:** Subcommands v3 & update plugins to Sapphire Result v2 (#271) ([1cfc32a](https://github.com/sapphiredev/plugins/commit/1cfc32a9cb568d1031a35c5e0628a67bc082ff21))
  - 💥 **BREAKING CHANGE:** @sapphire/plugin-subcommands has been completely rewritten from scratch for version 3. Please refer to the [README](https://github.com/sapphiredev/plugins/blob/main/packages/subcommands/README.md) or [the website](https://www.sapphirejs.dev/docs/Guide/plugins/Subcommands/getting-started) for updated usage.
  - 💥 **BREAKING CHANGE:** @sapphire/plugin-hmr has been updated to use @sapphire/result v2 and @sapphire/framework v3
  - 💥 **BREAKING CHANGE:** @sapphire/plugin-pattern-commands has been updated to use @sapphire/result v2 and @sapphire/framework v3
  - 💥 **BREAKING CHANGE:** @sapphire/plugin-i18next has been updated to use @sapphire/result v2 and @sapphire/framework v3
  - 💥 **BREAKING CHANGE:** @sapphire/plugin-scheduled-tasks has been updated to use @sapphire/result v2 and @sapphire/framework v3

# [@sapphire/plugin-subcommands@2.2.2](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-subcommands@2.2.0...@sapphire/plugin-subcommands@2.2.2) - (2022-07-11)

## 🐛 Bug Fixes

- Manually set version ([117d5a6](https://github.com/sapphiredev/plugins/commit/117d5a6256af7e01b420b28f95abec36f3feb0af))

## 📝 Documentation

- Update typedoc setup ([5c855bd](https://github.com/sapphiredev/plugins/commit/5c855bd8341f155a41c9b85738541f1f47ac837a))

# [2.2.0](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-subcommands@2.1.3...@sapphire/plugin-subcommands@2.2.0) (2022-03-06)

### Features

-   add HMR plugin ([#209](https://github.com/sapphiredev/plugins/issues/209)) ([4a18bb1](https://github.com/sapphiredev/plugins/commit/4a18bb1377a8d506fddc5bb991430503902d393b))
-   allow module: NodeNext ([#251](https://github.com/sapphiredev/plugins/issues/251)) ([31bab09](https://github.com/sapphiredev/plugins/commit/31bab09834ebc1bc646e4a2849dbd24c65f08c0e))

## [2.1.3](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-subcommands@2.1.2...@sapphire/plugin-subcommands@2.1.3) (2021-12-21)

**Note:** Version bump only for package @sapphire/plugin-subcommands

## [2.1.2](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-subcommands@2.1.1...@sapphire/plugin-subcommands@2.1.2) (2021-12-06)

### Bug Fixes

-   **subcommands:** TS Only - Fixed type of re-export of SubCommandPluginCommand.Context ([39004ac](https://github.com/sapphiredev/plugins/commit/39004ac0d334dc68d9ad53258ba297f22fb8a7c9))

## [2.1.1](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-subcommands@2.1.0...@sapphire/plugin-subcommands@2.1.1) (2021-11-30)

### Bug Fixes

-   expose `Context`, `JSON` and `RunInTypes` in the `SubCommandPluginCommand` namespace ([9af2b57](https://github.com/sapphiredev/plugins/commit/9af2b57f8b1cf6bc483a75a5d7b80de0dbb0dbdb))

# [2.1.0](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-subcommands@2.0.2...@sapphire/plugin-subcommands@2.1.0) (2021-11-21)

### Features

-   expose and use namespaces for options, context, etc ([#176](https://github.com/sapphiredev/plugins/issues/176)) ([33452da](https://github.com/sapphiredev/plugins/commit/33452da808d91313a5d3bf680e11b5208ac67442))

## [2.0.2](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-subcommands@2.0.1...@sapphire/plugin-subcommands@2.0.2) (2021-11-06)

### Bug Fixes

-   **docs:** replace command usage of `run` to `messageRun` ([#160](https://github.com/sapphiredev/plugins/issues/160)) ([415adb8](https://github.com/sapphiredev/plugins/commit/415adb85b884da5d0f1f2ce07a9d46134f2bcb12))

## [2.0.1](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-subcommands@2.0.0...@sapphire/plugin-subcommands@2.0.1) (2021-10-17)

### Bug Fixes

-   allow more node & npm versions in engines field ([ce5b12f](https://github.com/sapphiredev/plugins/commit/ce5b12f8142297bceda49b85574a95a3cf9112ab))

# [2.0.0](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-subcommands@1.0.6...@sapphire/plugin-subcommands@2.0.0) (2021-10-16)

### Code Refactoring

-   **plugin-subcommands:** updated for discord.js@13 and framework@2 ([9ac515f](https://github.com/sapphiredev/plugins/commit/9ac515fa142d126a5448e092b0354d5f8a9bf5b8))

### Features

-   **i18next:** update i18next dependency ([#129](https://github.com/sapphiredev/plugins/issues/129)) ([96519de](https://github.com/sapphiredev/plugins/commit/96519de5de253db390ed9a76ed073ffe1eabd187))
-   rename `Awaited` to `Awaitable` ([#152](https://github.com/sapphiredev/plugins/issues/152)) ([e8aabab](https://github.com/sapphiredev/plugins/commit/e8aababca760125fd3752a807ef26da16103dd65))
-   **subcommands:** migrate `Command#run` to `Command#messageRun` ([#157](https://github.com/sapphiredev/plugins/issues/157)) ([2960711](https://github.com/sapphiredev/plugins/commit/29607111c4e4f61ece463e10854982f205879996))

### BREAKING CHANGES

-   **i18next:** i18next has been updated to v21.0.1. Please also seee the breaking changes for i18next [here](https://github.com/i18next/i18next/blob/master/CHANGELOG.md#2100) and their migration guide [here](https://www.i18next.com/misc/migration-guide#v-20-x-x-to-v-21-0-0)

-   chore: activate renovate
-   **plugin-subcommands:** Increase `@sapphire/framework` requirement to v2.

## [1.0.6](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-subcommands@1.0.5...@sapphire/plugin-subcommands@1.0.6) (2021-06-19)

### Bug Fixes

-   remove peer deps, update dev deps, update READMEs ([#91](https://github.com/sapphiredev/plugins/issues/91)) ([3489b1d](https://github.com/sapphiredev/plugins/commit/3489b1dc1e8a7c64c255595b3d441cd0b5bac936))
-   **subcommands:** fixed JavaScript usage in README ([#89](https://github.com/sapphiredev/plugins/issues/89)) ([73a35e9](https://github.com/sapphiredev/plugins/commit/73a35e98da56a27a05b2179188599fcaf1d87ff0))
-   **subcommands:** mark package as side effect free ([7959288](https://github.com/sapphiredev/plugins/commit/7959288cb61131a75bd0692056e3764577cf5669))
-   **subcommands:** respect caseInsensitive client option ([#84](https://github.com/sapphiredev/plugins/issues/84)) ([6fec28a](https://github.com/sapphiredev/plugins/commit/6fec28acdb2cd07013d4f7c64f2f985528727a53))

## [1.0.5](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-subcommands@1.0.4...@sapphire/plugin-subcommands@1.0.5) (2021-05-02)

### Bug Fixes

-   drop the `www.` from the SapphireJS URL ([a86049f](https://github.com/sapphiredev/plugins/commit/a86049f185f0ccb12d61379dd82255b36d4fa145))
-   update all the SapphireJS URLs from `.com` to `.dev` ([c5fd156](https://github.com/sapphiredev/plugins/commit/c5fd15691abb9a9712dc4b8aebd8400f6d91f719))

## [1.0.4](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-subcommands@1.0.3...@sapphire/plugin-subcommands@1.0.4) (2021-04-21)

### Bug Fixes

-   change all Sapphire URLs from "project"->"community" & use our domain where applicable 👨‍🌾🚜 ([#75](https://github.com/sapphiredev/plugins/issues/75)) ([e437dc4](https://github.com/sapphiredev/plugins/commit/e437dc45fcd4d22ab2dcdb0e70c67cc5856883c0))

## [1.0.3](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-subcommands@1.0.2...@sapphire/plugin-subcommands@1.0.3) (2021-04-03)

**Note:** Version bump only for package @sapphire/plugin-subcommands

## [1.0.2](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-subcommands@1.0.1...@sapphire/plugin-subcommands@1.0.2) (2021-03-16)

### Bug Fixes

-   update dependencies, add tslib, bump framework to v1.0.0 ([880b761](https://github.com/sapphiredev/plugins/commit/880b7614d857f23fcbcd351e69795c451a95f49c))

## [1.0.1](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-subcommands@1.0.0...@sapphire/plugin-subcommands@1.0.1) (2021-02-12)

### Bug Fixes

-   **subcommands:** mark subCommands as optional in SubCommandPluginCommandOptions ([51c433d](https://github.com/sapphiredev/plugins/commit/51c433d963e1cdcb797eddef8dbd4ad3e634ec05))

# 1.0.0 (2021-02-12)

### Features

-   **subcommands:** type improvements & fix build ([#59](https://github.com/sapphiredev/plugins/issues/59)) ([1707d01](https://github.com/sapphiredev/plugins/commit/1707d013d06ae109ddcba83ead9e936a17ba56eb))
-   add subcommands plugin ([#58](https://github.com/sapphiredev/plugins/issues/58)) ([74fa051](https://github.com/sapphiredev/plugins/commit/74fa05151a5267927ec1c792b9fd0b88a078c6fd))
