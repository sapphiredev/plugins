# Changelog

All notable changes to this project will be documented in this file.

# [@sapphire/plugin-subcommands@7.0.0](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-subcommands@6.0.3...@sapphire/plugin-subcommands@7.0.0) - (2024-08-07)

## 🏠 Refactor

- Changed no match errors to emit on a subcommand listener instead of the root MessageCommandError / ChatInputCommandError ([6e7a5bf](https://github.com/sapphiredev/plugins/commit/6e7a5bf89feb869e656cb1a07bb29a664b1ebd41)) ([#601](https://github.com/sapphiredev/plugins/pull/601) by @favna)
  - 💥 **BREAKING CHANGE:** If no subcommand matched the error was emitted to `MessageCommandError` or `ChatInputCommandError`.
This was inconsistent with errors during runtime emitted to `MessageSubcommandError` and `ChatInputSubcommandError` respectively.
Therefore these events are now emitted to the new events `PluginMessageSubcommandNoMatch` and `PluginChatInputSubcommandNoMatch` respectively.
New built-in listeners for these events will log the infractions to the console at the error level. You can override these listeners to provide your functionality.

## 🐛 Bug Fixes

- **deps:** Update all non-major dependencies ([43df709](https://github.com/sapphiredev/plugins/commit/43df70954d837f7b14d62ea9123aca4b1da9ae36)) ([#574](https://github.com/sapphiredev/plugins/pull/574) by @renovate[bot])
- **deps:** Update all non-major dependencies ([7909d16](https://github.com/sapphiredev/plugins/commit/7909d16fcec9a8e5e9a3f8816c90a26fbc7d1284)) ([#573](https://github.com/sapphiredev/plugins/pull/573) by @renovate[bot])
- **subcommands:** Export cooldown precondition on top level and deprecate namespaced exports ([e71f926](https://github.com/sapphiredev/plugins/commit/e71f9260de9b04f2ff010d4f8697fb78f230c1bb))
- **deps:** Update all non-major dependencies ([ee64834](https://github.com/sapphiredev/plugins/commit/ee64834c799a5ac28b1ae172cb19f77a1887f3d4)) ([#546](https://github.com/sapphiredev/plugins/pull/546) by @renovate[bot])
- **subcommands:** Update transitive dependencies ([342090e](https://github.com/sapphiredev/plugins/commit/342090efa7a6c2c5a82a6e97eced374d60885be9))

# [@sapphire/plugin-subcommands@6.0.3](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-subcommands@6.0.3...@sapphire/plugin-subcommands@6.0.3) - (2024-01-19)

## 🐛 Bug Fixes

- Update transitive sapphire dependencies ([c78017c](https://github.com/sapphiredev/plugins/commit/c78017c090b04f6380103b4ae4cd97767796eeb6))
- Ensure cts file extensions in dist/cjs (#537) ([6f863f8](https://github.com/sapphiredev/plugins/commit/6f863f8187b7028cf6464dd04f197dd1be6ca1dd))
- **subcommands:** Bump transitive dependencies ([6985cbf](https://github.com/sapphiredev/plugins/commit/6985cbf9b8dd81b3bdc8a4f612b41ca6d5ac7d8b))

# [@sapphire/plugin-subcommands@6.0.2](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-subcommands@6.0.2...@sapphire/plugin-subcommands@6.0.2) - (2023-12-30)

## 🐛 Bug Fixes

- **subcommands:** Bump transitive dependencies ([4765979](https://github.com/sapphiredev/plugins/commit/47659797881fc06acb12bcf145069d5d7cb046cd))
- **plugins:** Fixed name for plugin subcommnad cooldown precondition (#531) ([f6cd4b6](https://github.com/sapphiredev/plugins/commit/f6cd4b6f2113b6be072fef0e0342a0ad49e2acc1))

# [@sapphire/plugin-subcommands@6.0.1](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-subcommands@6.0.1...@sapphire/plugin-subcommands@6.0.1) - (2023-12-05)

## ↩️ Revert

- "refactor(register): cleanup unnecessary side effect imports of index" ([c2af242](https://github.com/sapphiredev/plugins/commit/c2af24269956132237988d94e4d94719b2cd442c))

# [@sapphire/plugin-subcommands@6.0.0](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-subcommands@6.0.0...@sapphire/plugin-subcommands@6.0.0) - (2023-12-05)

## 🏠 Refactor

- **register:** Cleanup unnecessary side effect imports of index ([dede596](https://github.com/sapphiredev/plugins/commit/dede596ae22ceec2700dd860287a1260f092b502))

## 🐛 Bug Fixes

- **subcommands:** Expose `load*` methods on the `index` level in case register isn't used ([1477e38](https://github.com/sapphiredev/plugins/commit/1477e3899a1874c0e67a9dcbdf266ffb78c51cdd))
- Update transitive dependencies ([9fd4cfa](https://github.com/sapphiredev/plugins/commit/9fd4cfae031b20044aad8ae1051ade3dd29c69dd))

## 🚀 Features

- Split ESM and CJS bundles for proper ESM and CJS loading (#512) ([d9aa006](https://github.com/sapphiredev/plugins/commit/d9aa006ff8c7f78a613dcca605d3353b992b7a46))
  - 💥 **BREAKING CHANGE:** This ensures that the plugins will properly load the
either only ESM or only CJS files. This is done by outputting
dist/cjs and dist/esm folders. This requires @sapphire/framework v5.x!

# [@sapphire/plugin-subcommands@5.1.0](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-subcommands@5.1.0...@sapphire/plugin-subcommands@5.1.0) - (2023-11-16)

## 🏠 Refactor

- Support latest /framework ([3a186ca](https://github.com/sapphiredev/plugins/commit/3a186cae353394bec461b08c3ccd7f422e2cc343))

## 🐛 Bug Fixes

- **subcommands:** Add subcommand specific cooldown (#504) ([b7bca79](https://github.com/sapphiredev/plugins/commit/b7bca79effddf638ba1cef8d42684fe24471e0c9))
- **subcommands:** Remove unused events `ChatInputSubcommandNotFound` and `MessageSubcommandNotFound`. If you previously had listeners for these, just remove them (#506) ([ee92625](https://github.com/sapphiredev/plugins/commit/ee9262500f706857b1ca05959007c5040ad22151))

## 🚀 Features

- Make all pieces virtual ([65bd0db](https://github.com/sapphiredev/plugins/commit/65bd0db1804a4b0cf32815a70e91fb837e92829e))

# [@sapphire/plugin-subcommands@5.0.0](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-subcommands@5.0.0...@sapphire/plugin-subcommands@5.0.0) - (2023-10-26)

## 🐛 Bug Fixes

- **subcommands:** Remove deprecated `SubcommandPluginEvents.MessageSubCommandDenied` ([99ccfb8](https://github.com/sapphiredev/plugins/commit/99ccfb82ccdaed7d517a84fe6f1d647db4a071d9))
  - 💥 **BREAKING CHANGE:** `SubcommandPluginEvents.MessageSubCommandDenied` has been removed. Use `SubcommandPluginEvents.MessageSubcommandDenied` instead. If you previously named your listener file `messageSubCommandDenied.<ext>` then you will also need to rename it to `messageSubcommandDenied.<ext>`. Note the change in capital C in `Subcommand`.
- **subcommands:** Remove deprecated `SubcommandPluginEvents.ChatInputSubCommandDenied` ([d14f023](https://github.com/sapphiredev/plugins/commit/d14f0234b98988eef13527de471b0dd12472b693))
  - 💥 **BREAKING CHANGE:** `SubcommandPluginEvents.ChatInputSubCommandDenied` has been removed. Use `SubcommandPluginEvents.ChatInputSubcommandDenied` instead. If you previously named your listener file `chatInputSubCommandDenied.<ext>` then you will also need to rename it to `chatInputSubcommandDenied.<ext>`. Note the change in capital C in `Subcommand`.

# [@sapphire/plugin-subcommands@4.3.0](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-subcommands@4.3.0...@sapphire/plugin-subcommands@4.3.0) - (2023-10-23)

## 🚀 Features

- **subcommands:** Add support for all remaining precondition shortcuts (#491) ([6da37d6](https://github.com/sapphiredev/plugins/commit/6da37d6af22d75df40875dbd963b5122f15952ee))

# [@sapphire/plugin-subcommands@4.2.2](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-subcommands@4.2.2...@sapphire/plugin-subcommands@4.2.2) - (2023-10-16)

## 🐛 Bug Fixes

- **subcommands:** Ensure subcommands support fw 4.7.0 specific preconditions ([aef5949](https://github.com/sapphiredev/plugins/commit/aef59497b4a7fde0599603e8cba714b5b7a61c76))
- Set `engines.node` to `>=v18` ([885a390](https://github.com/sapphiredev/plugins/commit/885a3908d59fd00f7214ef474f2c6a3c58e95af2))

# [@sapphire/plugin-subcommands@4.2.1](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-subcommands@4.2.0...@sapphire/plugin-subcommands@4.2.1) - (2023-08-29)

## 🏠 Refactor

- **subcommands:** Deprecate `SubcommandPluginEvents.ChatInputSubCommandDenied` in favour of `SubcommandPluginEvents.ChatInputSubcommandDenied` and `SubcommandPluginEvents.MessageSubCommandDenied` in favour of `SubcommandPluginEvents.MessageSubcommandDenied` ([ed845b4](https://github.com/sapphiredev/plugins/commit/ed845b4102925fb8b419a752f992298fa892a74d))

# [@sapphire/plugin-subcommands@4.2.0](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-subcommands@4.1.1...@sapphire/plugin-subcommands@4.2.0) - (2023-08-23)

## 🚀 Features

- **subcommands:** Add runIn to match framework (#470) ([89cb5d9](https://github.com/sapphiredev/plugins/commit/89cb5d9937402140a28d10739ae9b911b22558f5))

# [@sapphire/plugin-subcommands@4.1.1](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-subcommands@4.1.0...@sapphire/plugin-subcommands@4.1.1) - (2023-08-23)

## 🏠 Refactor

- ***:** Cleanup plugin registry files (#469) ([215b334](https://github.com/sapphiredev/plugins/commit/215b3348b30077238147dbc643769d960b856ba1))

## 🐛 Bug Fixes

- **subcommands:** Ensure that `subcommand.type` always has a value ([6007a23](https://github.com/sapphiredev/plugins/commit/6007a23926cad34e15dd72d58fec90bb858ae6c1))

# [@sapphire/plugin-subcommands@4.1.0](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-subcommands@4.0.2...@sapphire/plugin-subcommands@4.1.0) - (2023-08-21)

## 🚀 Features

- **subcommands:** Implement per-subcommand preconditions (#465) ([f5d5536](https://github.com/sapphiredev/plugins/commit/f5d55367e4833875a07438aa1cba435ed3889f27))

# [@sapphire/plugin-subcommands@4.0.2](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-subcommands@4.0.1...@sapphire/plugin-subcommands@4.0.2) - (2023-07-21)

## 🐛 Bug Fixes

- **subcommands:** Bump transitive @sapphire/utilities dependency ([bc57087](https://github.com/sapphiredev/plugins/commit/bc57087df4d52d691ab61332a987bfbe1bf34bfb))
- **deps:** Update all non-major dependencies ([9bb6627](https://github.com/sapphiredev/plugins/commit/9bb6627c20999d37130537fce58241c12a795046))

# [@sapphire/plugin-subcommands@4.0.1](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-subcommands@4.0.0...@sapphire/plugin-subcommands@4.0.1) - (2023-04-10)

## 🐛 Bug Fixes

- **subcommands:** Fixed compatibility with TS 5.x ([3340544](https://github.com/sapphiredev/plugins/commit/3340544241e7546b23fe050e7a45d9e2f399af8c))
- **subcommands:** Update dependencies ([249e9df](https://github.com/sapphiredev/plugins/commit/249e9df1fbb37bcfaf4192284dbd7b4734163854))

# [@sapphire/plugin-subcommands@4.0.0](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-subcommands@3.2.4...@sapphire/plugin-subcommands@4.0.0) - (2023-01-08)

## 🐛 Bug Fixes

- **deps:** Update all non-major dependencies (#399) ([953d57b](https://github.com/sapphiredev/plugins/commit/953d57b06ea624baa89ba1d03131c5fb10cecbfb))

## 🚀 Features

- **deps:** Support for djs v14 (#403) ([7674782](https://github.com/sapphiredev/plugins/commit/76747829f4b3ec152ab888e57a56a138e7d527f5))

# [@sapphire/plugin-subcommands@3.2.4](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-subcommands@3.2.3...@sapphire/plugin-subcommands@3.2.4) - (2022-12-10)

## 🐛 Bug Fixes

- SupportsXCommands() methods now use SubcommandMappings (#398) ([3e7a45a](https://github.com/sapphiredev/plugins/commit/3e7a45a63899b9ff1ffa39afb7855e81515daceb))
- **deps:** Update all non-major dependencies (#387) ([e31f714](https://github.com/sapphiredev/plugins/commit/e31f7140c8bb7c34086540912eb595dd04adaef5))

## 📝 Documentation

- Add @Arcadia148 as a contributor ([3a28c2f](https://github.com/sapphiredev/plugins/commit/3a28c2fc9a08be5e66026b7468a304c8b83203e6))

# [@sapphire/plugin-subcommands@3.2.3](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-subcommands@3.2.2...@sapphire/plugin-subcommands@3.2.3) - (2022-10-08)

## 🐛 Bug Fixes

- **subcommands:** Update dependencies ([3d4e93c](https://github.com/sapphiredev/plugins/commit/3d4e93c1a94a2869a6bd576097747403b29fda0c))
- Default subcommand argument behavior (#365) ([6cef7c6](https://github.com/sapphiredev/plugins/commit/6cef7c66da57a319e0348d80dcbde49526c071be))

# [@sapphire/plugin-subcommands@3.2.2](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-subcommands@3.2.1...@sapphire/plugin-subcommands@3.2.2) - (2022-10-02)

## 🐛 Bug Fixes

- **subcommands:** Bump dependencies ([1142524](https://github.com/sapphiredev/plugins/commit/1142524d89cec3a527867cf0527434bc5c38c39c))

## 📝 Documentation

- Add @r-priyam as a contributor ([2d97019](https://github.com/sapphiredev/plugins/commit/2d970198717285c0f1652340ce87b1a4780179f3))
- Add @BenSegal855 as a contributor ([66553df](https://github.com/sapphiredev/plugins/commit/66553dfbb4bc7332c295277ffa4a8f720401bc89))
- Add @yuansheng1549 as a contributor ([c36ac65](https://github.com/sapphiredev/plugins/commit/c36ac65cd0a1a3e266a8a3679a58404177e0bb6b))
- Add @RealShadowNova as a contributor ([6cfa76f](https://github.com/sapphiredev/plugins/commit/6cfa76f793a16c6d11aa057e66e3fb41a9f4fb6d))

# [@sapphire/plugin-subcommands@3.2.1](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-subcommands@3.2.0...@sapphire/plugin-subcommands@3.2.1) - (2022-09-02)

## 🐛 Bug Fixes

- Subcommands script (#346) ([4f5f06a](https://github.com/sapphiredev/plugins/commit/4f5f06a3b7df35c18d71d196bcda5abdb2b499b7))
- **subcommands:** Fixed mismatch in `*SubcommandMissingHandler` built in errors (#345) ([4ab92be](https://github.com/sapphiredev/plugins/commit/4ab92bef58fbe81e3874740834ce7f592e7bde1e))

# [@sapphire/plugin-subcommands@3.2.0](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-subcommands@3.1.1...@sapphire/plugin-subcommands@3.2.0) - (2022-08-29)

## 🚀 Features

- **subcommands:** Add default error listeners (#343) ([7f36686](https://github.com/sapphiredev/plugins/commit/7f3668689e5c7e664bca16e3cd6a36ea803b6a9c))

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
