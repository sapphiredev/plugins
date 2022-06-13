# Changelog

All notable changes to this project will be documented in this file.

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
