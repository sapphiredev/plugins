# Changelog

All notable changes to this project will be documented in this file.

# [@sapphire/plugin-pattern-commands@4.0.1](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-pattern-commands@4.0.0...@sapphire/plugin-pattern-commands@4.0.1) - (2022-10-24)

## 📝 Documentation

- Add @Arcadia148 as a contributor ([3a28c2f](https://github.com/sapphiredev/plugins/commit/3a28c2fc9a08be5e66026b7468a304c8b83203e6))
- Add @r-priyam as a contributor ([2d97019](https://github.com/sapphiredev/plugins/commit/2d970198717285c0f1652340ce87b1a4780179f3))
- Add @BenSegal855 as a contributor ([66553df](https://github.com/sapphiredev/plugins/commit/66553dfbb4bc7332c295277ffa4a8f720401bc89))
- Add @yuansheng1549 as a contributor ([c36ac65](https://github.com/sapphiredev/plugins/commit/c36ac65cd0a1a3e266a8a3679a58404177e0bb6b))
- Add @RealShadowNova as a contributor ([6cfa76f](https://github.com/sapphiredev/plugins/commit/6cfa76f793a16c6d11aa057e66e3fb41a9f4fb6d))

# [@sapphire/plugin-pattern-commands@4.0.0](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-pattern-commands@3.1.1...@sapphire/plugin-pattern-commands@4.0.0) - (2022-08-20)

## 📝 Documentation

- Add @ricardooow as a contributor ([15d7f9b](https://github.com/sapphiredev/plugins/commit/15d7f9b0d7428559441550aba1918d068565baa6))
- Add @imranbarbhuiya as a contributor ([e3d8fdc](https://github.com/sapphiredev/plugins/commit/e3d8fdc433a6c89389b2e1c574245e8140d1c47a))
- Add @KrishAgarwal2811 as a contributor ([875dda0](https://github.com/sapphiredev/plugins/commit/875dda0756f1b5302e77993e44a1ac9ab1a065d0))
- Add @jczstudios as a contributor ([c9126bc](https://github.com/sapphiredev/plugins/commit/c9126bc2bb454989c006864293ef99a47369dc38))
- Add @MajesticString as a contributor ([2743c8d](https://github.com/sapphiredev/plugins/commit/2743c8d5b9abe1b554ac7d776cb827d6a1e9db7b))
- Add @Mzato0001 as a contributor ([06626cd](https://github.com/sapphiredev/plugins/commit/06626cd7ff94d3bc8ce75da6383e1b77b6109a3d))

## 🚀 Features

- ***:** Subcommands v3 & update plugins to Sapphire Result v2 (#271) ([1cfc32a](https://github.com/sapphiredev/plugins/commit/1cfc32a9cb568d1031a35c5e0628a67bc082ff21))
  - 💥 **BREAKING CHANGE:** @sapphire/plugin-subcommands has been completely rewritten from scratch for version 3. Please refer to the [README](https://github.com/sapphiredev/plugins/blob/main/packages/subcommands/README.md) or [the website](https://www.sapphirejs.dev/docs/Guide/plugins/Subcommands/getting-started) for updated usage.
  - 💥 **BREAKING CHANGE:** @sapphire/plugin-hmr has been updated to use @sapphire/result v2 and @sapphire/framework v3
  - 💥 **BREAKING CHANGE:** @sapphire/plugin-pattern-commands has been updated to use @sapphire/result v2 and @sapphire/framework v3
  - 💥 **BREAKING CHANGE:** @sapphire/plugin-i18next has been updated to use @sapphire/result v2 and @sapphire/framework v3
  - 💥 **BREAKING CHANGE:** @sapphire/plugin-scheduled-tasks has been updated to use @sapphire/result v2 and @sapphire/framework v3

# [@sapphire/plugin-pattern-commands@3.1.1](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-pattern-commands@3.1.0...@sapphire/plugin-pattern-commands@3.1.1) - (2022-07-13)

## 🐛 Bug Fixes

- Resolve CommandNoLuck on 100% chance (#319) ([084b23d](https://github.com/sapphiredev/plugins/commit/084b23da7d87773e7c133d74595d47d3239020f4))

# [@sapphire/plugin-pattern-commands@3.1.0](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-pattern-commands@3.0.0...@sapphire/plugin-pattern-commands@3.1.0) - (2022-06-29)

## 📝 Documentation

- **pattern-commands:** Update message intent deadline (#310) ([28f2bf1](https://github.com/sapphiredev/plugins/commit/28f2bf1d3236196b252d84bd83e16a794e29fbcc))

## 🚀 Features

- **plugin-pattern-commands:** Add success property to finished payload (#314) ([3c3e7ca](https://github.com/sapphiredev/plugins/commit/3c3e7ca8379d29ea902b8bb14574d73e85f5fa66))

# [@sapphire/plugin-pattern-commands@3.0.0](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-pattern-commands@2.2.0...@sapphire/plugin-pattern-commands@3.0.0) - (2022-06-13)

## 📝 Documentation

- Update typedoc setup ([5c855bd](https://github.com/sapphiredev/plugins/commit/5c855bd8341f155a41c9b85738541f1f47ac837a))

## 🚀 Features

- **plugin-pattern-commands:** Event parameter standardisation (#307) ([87960e0](https://github.com/sapphiredev/plugins/commit/87960e01c4dd73d5930ee35b5e959e3487a3cf28))

   ### 💥 Breaking Changes:
   - The parameters of `PatternCommandEvents.CommandRun` have changed, they are now `message, command, payload`, respectively of the types `Message, PatternCommand, PatternCommandPayload`
   - The parameters of `PatternCommandEvents.CommandSuccess` have changed. It is now an object of `PatternCommandSuccessPayload`. To access the respective properties of `result`, `command`, `alias`, and `duration` use `payload.<property>`
   - The parameters of `PatternCommandEvents.CommandError` have changed. The second parameter is now an object of `PatternCommandErrorPayload`. To access the second parameter `command` use `payload.command`.
   - The parameters of `PatternCommandEvents.CommandFinished` have changed. The parameters are now `message, command, payload`, respectively of the types `Message, PatternCommand, PatternCommandFinishedPayload`. The duration, which was previously the second parameter, is now available as `payload.duration`.


# [2.2.0](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-pattern-commands@2.1.1...@sapphire/plugin-pattern-commands@2.2.0) (2022-03-06)

### Features

-   allow module: NodeNext ([#251](https://github.com/sapphiredev/plugins/issues/251)) ([31bab09](https://github.com/sapphiredev/plugins/commit/31bab09834ebc1bc646e4a2849dbd24c65f08c0e))

## [2.1.1](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-pattern-commands@2.1.0...@sapphire/plugin-pattern-commands@2.1.1) (2022-01-23)

### Bug Fixes

-   **pattern-commands:** ensure duration isn't destructured when not available ([8f16d02](https://github.com/sapphiredev/plugins/commit/8f16d02053c2d7338ce644cf23cd9446df1d9cc1))

# [2.1.0](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-pattern-commands@2.0.0...@sapphire/plugin-pattern-commands@2.1.0) (2022-01-13)

### Bug Fixes

-   **scheduled-tasks and pattern-commands:** Add params to event typedocs ([#222](https://github.com/sapphiredev/plugins/issues/222)) ([e18509f](https://github.com/sapphiredev/plugins/commit/e18509f2df3d3b1fd146e21c6dc199170d671b15))

### Features

-   **pattern-commands:** Add duration to `CommandSuccess` event ([#225](https://github.com/sapphiredev/plugins/issues/225)) ([8a58c46](https://github.com/sapphiredev/plugins/commit/8a58c462f3d198febab8a330ee5fac26911a0085))

# [2.0.0](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-pattern-commands@1.0.2...@sapphire/plugin-pattern-commands@2.0.0) (2022-01-10)

### Features

-   add HMR plugin ([#209](https://github.com/sapphiredev/plugins/issues/209)) ([4a18bb1](https://github.com/sapphiredev/plugins/commit/4a18bb1377a8d506fddc5bb991430503902d393b))
-   **pattern-commands:** add duration to finished and error events ([#219](https://github.com/sapphiredev/plugins/issues/219)) ([654c32e](https://github.com/sapphiredev/plugins/commit/654c32e17ab55a60b4593e4825e02feab10ee803))
-   **pattern-commands:** Option for full match of command name ([#220](https://github.com/sapphiredev/plugins/issues/220)) ([832decb](https://github.com/sapphiredev/plugins/commit/832decb947c500c3299212e4d352fa10940dba4a))

## [1.0.2](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-pattern-commands@1.0.1...@sapphire/plugin-pattern-commands@1.0.2) (2021-12-30)

### Bug Fixes

-   **pattern-commands:** resolve listener triggering twice in rare cases ([#203](https://github.com/sapphiredev/plugins/issues/203)) ([bf1ede1](https://github.com/sapphiredev/plugins/commit/bf1ede186bd85e6f135525ea5fdee8da08a94cf0))

## [1.0.1](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-pattern-commands@1.0.0...@sapphire/plugin-pattern-commands@1.0.1) (2021-12-29)

### Bug Fixes

-   **pattern-commands:** fixed missing module augmentation for store ([e7d862b](https://github.com/sapphiredev/plugins/commit/e7d862b8d67d89caed5fec240f7dfc7746130210))

# 1.0.0 (2021-12-29)

### Features

-   add pattern commands plugin ([#192](https://github.com/sapphiredev/plugins/issues/192)) ([0db56ac](https://github.com/sapphiredev/plugins/commit/0db56ac5391b6959ff6f2627623ae8ae6eef2541))
