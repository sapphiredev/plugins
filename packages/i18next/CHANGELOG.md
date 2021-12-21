# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.1.3](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-i18next@2.1.2...@sapphire/plugin-i18next@2.1.3) (2021-12-21)

**Note:** Version bump only for package @sapphire/plugin-i18next

## [2.1.2](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-i18next@2.1.1...@sapphire/plugin-i18next@2.1.2) (2021-12-06)

**Note:** Version bump only for package @sapphire/plugin-i18next

## [2.1.1](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-i18next@2.1.0...@sapphire/plugin-i18next@2.1.1) (2021-11-25)

### Bug Fixes

-   **i18next:** bumped i18next dependendency to ensure transient dependency has latest fixes ([7cafdfc](https://github.com/sapphiredev/plugins/commit/7cafdfc1876d9d28af3c1b8decf047ab75f3f0bf))

# [2.1.0](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-i18next@2.0.2...@sapphire/plugin-i18next@2.1.0) (2021-11-21)

### Features

-   expose and use namespaces for options, context, etc ([#176](https://github.com/sapphiredev/plugins/issues/176)) ([33452da](https://github.com/sapphiredev/plugins/commit/33452da808d91313a5d3bf680e11b5208ac67442))
-   **i18n:** add `replyLocalized` ([#168](https://github.com/sapphiredev/plugins/issues/168)) ([4c51f52](https://github.com/sapphiredev/plugins/commit/4c51f52411d3a4f368db912dd840504622e4a373))
-   **plugin-i18n:** add new syntax for formatters in i18next ([#167](https://github.com/sapphiredev/plugins/issues/167)) ([d0f01d9](https://github.com/sapphiredev/plugins/commit/d0f01d99a8e25929a819ae0d210596afdd208b62))

## [2.0.2](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-i18next@2.0.1...@sapphire/plugin-i18next@2.0.2) (2021-11-06)

### Bug Fixes

-   **docs:** replace command usage of `run` to `messageRun` ([#160](https://github.com/sapphiredev/plugins/issues/160)) ([415adb8](https://github.com/sapphiredev/plugins/commit/415adb85b884da5d0f1f2ce07a9d46134f2bcb12))

## [2.0.1](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-i18next@2.0.0...@sapphire/plugin-i18next@2.0.1) (2021-10-17)

### Bug Fixes

-   allow more node & npm versions in engines field ([ce5b12f](https://github.com/sapphiredev/plugins/commit/ce5b12f8142297bceda49b85574a95a3cf9112ab))

# [2.0.0](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-i18next@1.3.7...@sapphire/plugin-i18next@2.0.0) (2021-10-16)

### Bug Fixes

-   **deps:** update all non-major dependencies ([#149](https://github.com/sapphiredev/plugins/issues/149)) ([1fe5598](https://github.com/sapphiredev/plugins/commit/1fe55980434b19bb024773a1878366320fa96004))
-   **deps:** update dependency i18next to ^21.2.0 ([#146](https://github.com/sapphiredev/plugins/issues/146)) ([2509ee4](https://github.com/sapphiredev/plugins/commit/2509ee4c8d53cc8bf23f7b7b618d5a4be3f7c24b))
-   **i18next:** change `Awaited` for `Awaitable` ([0e2e6ef](https://github.com/sapphiredev/plugins/commit/0e2e6ef104e66344608ca62f779829411122e84c))
-   **i18next:** change how `fetchLanguage` is implemented ([#107](https://github.com/sapphiredev/plugins/issues/107)) ([30c8f7f](https://github.com/sapphiredev/plugins/commit/30c8f7f2ea4911c79ecb241e182500516e958fc5))
-   **i18next:** remove @sapphire/pieces from install instructions ([7c17a92](https://github.com/sapphiredev/plugins/commit/7c17a925b7c66fdd5422d75a3674e420ddc474ce))
-   **plugin-i18next:** re-added support for guild target ([#103](https://github.com/sapphiredev/plugins/issues/103)) ([a7152a8](https://github.com/sapphiredev/plugins/commit/a7152a8ba3baf0a5bee10e80bc7c33e11b03d4d3))

### Code Refactoring

-   **plugin-i18next:** updated for discord.js@13 and framework@2 ([e041864](https://github.com/sapphiredev/plugins/commit/e04186461071179b96b918294b3f3085c328ede6))

### Features

-   bump to discordjs v13.2.0 ([3d0e484](https://github.com/sapphiredev/plugins/commit/3d0e484eb9a5adb7fef3bb642e304e27072ed2b1))
-   **i18next:** add `baseUserDirectory` as alternative path for the `languages` directory (takes precedence over root scan) ([#159](https://github.com/sapphiredev/plugins/issues/159)) ([f8621b0](https://github.com/sapphiredev/plugins/commit/f8621b088f0382221968dfefe4a48092c83cd73f))
-   **i18next:** bump i18next dependency to v20 ([#125](https://github.com/sapphiredev/plugins/issues/125)) ([0023809](https://github.com/sapphiredev/plugins/commit/0023809ee73fd2cee6828d30a782d67a44e31bbf))
-   **i18next:** update i18next dependency ([#129](https://github.com/sapphiredev/plugins/issues/129)) ([96519de](https://github.com/sapphiredev/plugins/commit/96519de5de253db390ed9a76ed073ffe1eabd187))
-   **plugin-editable-commands:** added first version ([#106](https://github.com/sapphiredev/plugins/issues/106)) ([9af3e85](https://github.com/sapphiredev/plugins/commit/9af3e85a8641f852eaf114679ceed1e71034d16c))
-   **subcommands:** migrate `Command#run` to `Command#messageRun` ([#157](https://github.com/sapphiredev/plugins/issues/157)) ([2960711](https://github.com/sapphiredev/plugins/commit/29607111c4e4f61ece463e10854982f205879996))

### BREAKING CHANGES

-   **i18next:** i18next has been updated to v21.0.1. Please also seee the breaking changes for i18next [here](https://github.com/i18next/i18next/blob/master/CHANGELOG.md#2100) and their migration guide [here](https://www.i18next.com/misc/migration-guide#v-20-x-x-to-v-21-0-0)

-   chore: activate renovate
-   **i18next:** i18next dependency has been bumped to v20.x. As opposed to what the library does, this plugin will default the new option `ignoreJSONStructure` to `false`
-   **i18next:** `fetchLanguage` has been moved from `ClientOptions` to `ClientOptions.i18n`
-   **plugin-i18next:** Changed `InternationalizationHandler#options` to not be optional.
-   **plugin-i18next:** Increase `@sapphire/framework` requirement to v2.
-   **plugin-i18next:** Increase `discord.js` requirement to v13.
-   **plugin-i18next:** Removed `I18nextClient#fetchLanguage` in favor of `InternationalizationHandler#fetchLanguage`.
-   **plugin-i18next:** Removed `I18nextClient#i18n` in favor of `Context#i18n`.
-   **plugin-i18next:** Removed `I18nextClient`.
-   **plugin-i18next:** Removed `Message#editLocalized` in favor of `editLocalized(message, options)`.
-   **plugin-i18next:** Removed `Structure#fetchLanguage` in favor of `fetchLanguage(structure)`.
-   **plugin-i18next:** Removed `Structure#fetchT` in favor of `fetchT(structure)`.
-   **plugin-i18next:** Removed `Structure#resolveKey` in favor of `resolveKey(structure, keys, options)`.
-   **plugin-i18next:** Removed `Structure#sendLocalized` in favor of `sendLocalized(structure, options)`.
-   **plugin-i18next:** Renamed `I18nextClientOptions` to `InternationalizationClientOptions`.
-   **plugin-i18next:** Renamed `I18nextHandler` to `InternationalizationHandler`.
-   **plugin-i18next:** Renamed `InternationalizationHandler.fetchLocale` to `format`.
-   **plugin-i18next:** Renamed `InternationalizationHandler.fetchT` to `getT`.
-   **plugin-i18next:** Require `discord.js` in `/register`.
-   **plugin-i18next:** Simplified `editLocalized`'s overloads.
-   **plugin-i18next:** Simplified `sendLocalized`'s overloads.

## [1.3.7](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-i18next@1.3.6...@sapphire/plugin-i18next@1.3.7) (2021-06-19)

### Bug Fixes

-   remove peer deps, update dev deps, update READMEs ([#91](https://github.com/sapphiredev/plugins/issues/91)) ([3489b1d](https://github.com/sapphiredev/plugins/commit/3489b1dc1e8a7c64c255595b3d441cd0b5bac936))
-   **i18next:** specify package side effects ([33fd1ec](https://github.com/sapphiredev/plugins/commit/33fd1ec86c671ef7419c709793d28c326d21ada7))

## [1.3.6](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-i18next@1.3.5...@sapphire/plugin-i18next@1.3.6) (2021-05-02)

### Bug Fixes

-   drop the `www.` from the SapphireJS URL ([a86049f](https://github.com/sapphiredev/plugins/commit/a86049f185f0ccb12d61379dd82255b36d4fa145))
-   update all the SapphireJS URLs from `.com` to `.dev` ([c5fd156](https://github.com/sapphiredev/plugins/commit/c5fd15691abb9a9712dc4b8aebd8400f6d91f719))

## [1.3.5](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-i18next@1.3.4...@sapphire/plugin-i18next@1.3.5) (2021-04-21)

### Bug Fixes

-   change all Sapphire URLs from "project"->"community" & use our domain where applicable 👨‍🌾🚜 ([#75](https://github.com/sapphiredev/plugins/issues/75)) ([e437dc4](https://github.com/sapphiredev/plugins/commit/e437dc45fcd4d22ab2dcdb0e70c67cc5856883c0))

## [1.3.4](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-i18next@1.3.3...@sapphire/plugin-i18next@1.3.4) (2021-04-03)

**Note:** Version bump only for package @sapphire/plugin-i18next

## [1.3.3](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-i18next@1.3.2...@sapphire/plugin-i18next@1.3.3) (2021-03-16)

### Bug Fixes

-   update dependencies, add tslib, bump framework to v1.0.0 ([880b761](https://github.com/sapphiredev/plugins/commit/880b7614d857f23fcbcd351e69795c451a95f49c))

## [1.3.2](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-i18next@1.3.1...@sapphire/plugin-i18next@1.3.2) (2021-02-16)

**Note:** Version bump only for package @sapphire/plugin-i18next

## [1.3.1](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-i18next@1.3.0...@sapphire/plugin-i18next@1.3.1) (2021-02-07)

### Bug Fixes

-   **i18n:** update dependencies in package.json ([8d0381b](https://github.com/sapphiredev/plugins/commit/8d0381be7b5ecc837fd9883c6035d4a16c065448))
-   **i18next:** properly augment Discord.js extensions ([#56](https://github.com/sapphiredev/plugins/issues/56)) ([6f5b1a9](https://github.com/sapphiredev/plugins/commit/6f5b1a9a05a6d0508e05a33ef23ec1027160df79))

# [1.3.0](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-i18next@1.2.1...@sapphire/plugin-i18next@1.3.0) (2021-02-03)

### Features

-   **i18next:** respect alternative default handling ([#54](https://github.com/sapphiredev/plugins/issues/54)) ([5b12ba8](https://github.com/sapphiredev/plugins/commit/5b12ba8b4a321f73dd6b93c57ddd92143b796f08))

## [1.2.1](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-i18next@1.2.0...@sapphire/plugin-i18next@1.2.1) (2021-01-23)

**Note:** Version bump only for package @sapphire/plugin-i18next

# [1.2.0](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-i18next@1.1.0...@sapphire/plugin-i18next@1.2.0) (2021-01-12)

### Features

-   **i18next:** store loaded namespaces ([#42](https://github.com/sapphiredev/plugins/issues/42)) ([978f0ad](https://github.com/sapphiredev/plugins/commit/978f0ad59a708ffabc02dda3f82fc84a69abf54d))

# [1.1.0](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-i18next@1.0.0...@sapphire/plugin-i18next@1.1.0) (2021-01-11)

### Features

-   **i18next:** allow creating i18next options using namespaces and languages ([#41](https://github.com/sapphiredev/plugins/issues/41)) ([3efa231](https://github.com/sapphiredev/plugins/commit/3efa231421c590d8706afba5b066daaa51b5d175))

# 1.0.0 (2021-01-09)

### Bug Fixes

-   **i18next:** add missing tslib dependency ([5687397](https://github.com/sapphiredev/plugins/commit/568739718dd028ba713f022404b94374729e398a))

### Features

-   **i18next:** implement context and editing ([#35](https://github.com/sapphiredev/plugins/issues/35)) ([1849831](https://github.com/sapphiredev/plugins/commit/18498311766433bc6d2ad9956ca73b39d11b9139)), closes [#29](https://github.com/sapphiredev/plugins/issues/29) [#29](https://github.com/sapphiredev/plugins/issues/29)
-   add plugin-i18next ([#29](https://github.com/sapphiredev/plugins/issues/29)) ([41e6581](https://github.com/sapphiredev/plugins/commit/41e6581199c971db4422fbc6fb411dfca2614dec))

### BREAKING CHANGES

-   **i18next:** All aforementioned changes are breaking.
