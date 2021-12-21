# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

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
