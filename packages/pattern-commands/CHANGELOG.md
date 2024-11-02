# Changelog

All notable changes to this project will be documented in this file.

# [@sapphire/plugin-pattern-commands@6.0.3](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-pattern-commands@6.0.2...@sapphire/plugin-pattern-commands@6.0.3) - (2024-11-02)

## 🐛 Bug Fixes

- **deps:** Update all non-major dependencies ([43df709](https://github.com/sapphiredev/plugins/commit/43df70954d837f7b14d62ea9123aca4b1da9ae36)) ([#574](https://github.com/sapphiredev/plugins/pull/574) by @renovate[bot])
- **deps:** Update all non-major dependencies ([7909d16](https://github.com/sapphiredev/plugins/commit/7909d16fcec9a8e5e9a3f8816c90a26fbc7d1284)) ([#573](https://github.com/sapphiredev/plugins/pull/573) by @renovate[bot])
- **deps:** Update all non-major dependencies ([ee64834](https://github.com/sapphiredev/plugins/commit/ee64834c799a5ac28b1ae172cb19f77a1887f3d4)) ([#546](https://github.com/sapphiredev/plugins/pull/546) by @renovate[bot])

## 📝 Documentation

- **typedoc:** Exclude externals to exclude Collection and Map methods from Store ([c3e54a4](https://github.com/sapphiredev/plugins/commit/c3e54a4e412a150f57f5795ae9c2a26974cfd0a6))

# [@sapphire/plugin-pattern-commands@6.0.2](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-pattern-commands@6.0.2...@sapphire/plugin-pattern-commands@6.0.2) - (2024-01-19)

## 🐛 Bug Fixes

- Ensure cts file extensions in dist/cjs (#537) ([6f863f8](https://github.com/sapphiredev/plugins/commit/6f863f8187b7028cf6464dd04f197dd1be6ca1dd))

# [@sapphire/plugin-pattern-commands@6.0.1](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-pattern-commands@6.0.1...@sapphire/plugin-pattern-commands@6.0.1) - (2023-12-05)

## ↩️ Revert

- "refactor(register): cleanup unnecessary side effect imports of index" ([c2af242](https://github.com/sapphiredev/plugins/commit/c2af24269956132237988d94e4d94719b2cd442c))

# [@sapphire/plugin-pattern-commands@6.0.0](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-pattern-commands@6.0.0...@sapphire/plugin-pattern-commands@6.0.0) - (2023-12-05)

## 🏠 Refactor

- **register:** Cleanup unnecessary side effect imports of index ([dede596](https://github.com/sapphiredev/plugins/commit/dede596ae22ceec2700dd860287a1260f092b502))

## 🐛 Bug Fixes

- **pattern-commands:** Expose `load*` methods on the `index` level in case register isn't used ([b26d849](https://github.com/sapphiredev/plugins/commit/b26d84970d07e4fafd5d4b6d1f526a66d4b3cb3a))
- **pattern-commands:** Fixed typo in file names and relative imports ([f4f1ed5](https://github.com/sapphiredev/plugins/commit/f4f1ed52cb7dd978bd9e6f9888c2db4404c5cb19))

## 🚀 Features

- Split ESM and CJS bundles for proper ESM and CJS loading (#512) ([d9aa006](https://github.com/sapphiredev/plugins/commit/d9aa006ff8c7f78a613dcca605d3353b992b7a46))
  - 💥 **BREAKING CHANGE:** This ensures that the plugins will properly load the
either only ESM or only CJS files. This is done by outputting
dist/cjs and dist/esm folders. This requires @sapphire/framework v5.x!

# [@sapphire/plugin-pattern-commands@5.1.0](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-pattern-commands@5.1.0...@sapphire/plugin-pattern-commands@5.1.0) - (2023-11-16)

## 🏠 Refactor

- Support latest /framework ([9715b38](https://github.com/sapphiredev/plugins/commit/9715b385477960ed6c935d37408beb4e2f2308a1))

## 🐛 Bug Fixes

- Set `engines.node` to `>=v18` ([885a390](https://github.com/sapphiredev/plugins/commit/885a3908d59fd00f7214ef474f2c6a3c58e95af2))

## 🚀 Features

- Make all pieces virtual and remove useless `registerPath` call ([6781ec2](https://github.com/sapphiredev/plugins/commit/6781ec23c643c8f41f2b6b54e71a7ec442eea884))

# [@sapphire/plugin-pattern-commands@5.0.2](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-pattern-commands@5.0.1...@sapphire/plugin-pattern-commands@5.0.2) - (2023-08-23)

## 🏠 Refactor

- ***:** Cleanup plugin registry files (#469) ([215b334](https://github.com/sapphiredev/plugins/commit/215b3348b30077238147dbc643769d960b856ba1))

# [@sapphire/plugin-pattern-commands@5.0.1](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-pattern-commands@5.0.0...@sapphire/plugin-pattern-commands@5.0.1) - (2023-04-10)

## 🐛 Bug Fixes

- **pattern-commands:** Fixed compatibility with TS 5.x ([71214ab](https://github.com/sapphiredev/plugins/commit/71214ab2320914eee7ff90d33a1f7db7361f5992))

# [@sapphire/plugin-pattern-commands@5.0.0](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-pattern-commands@4.1.0...@sapphire/plugin-pattern-commands@5.0.0) - (2023-01-08)

## 🐛 Bug Fixes

- **deps:** Update all non-major dependencies (#399) ([953d57b](https://github.com/sapphiredev/plugins/commit/953d57b06ea624baa89ba1d03131c5fb10cecbfb))

## 🚀 Features

- **deps:** Support for djs v14 (#403) ([7674782](https://github.com/sapphiredev/plugins/commit/76747829f4b3ec152ab888e57a56a138e7d527f5))

# [@sapphire/plugin-pattern-commands@4.1.0](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-pattern-commands@4.0.1...@sapphire/plugin-pattern-commands@4.1.0) - (2022-11-19)

## 🐛 Bug Fixes

- **deps:** Update all non-major dependencies (#387) ([e31f714](https://github.com/sapphiredev/plugins/commit/e31f7140c8bb7c34086540912eb595dd04adaef5))

## 🚀 Features

- **plugin-patterncommands:** Add command weight and allow to run another patternCommand if one was caught by a precondition (#389) ([a0c72f4](https://github.com/sapphiredev/plugins/commit/a0c72f48ea532fa423030c6288a17df6f289edcc))

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
