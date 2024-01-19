# Changelog

All notable changes to this project will be documented in this file.

# [@sapphire/plugin-scheduled-tasks@10.0.1](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-scheduled-tasks@10.0.1...@sapphire/plugin-scheduled-tasks@10.0.1) - (2024-01-19)

## 🐛 Bug Fixes

- Update transitive sapphire dependencies ([c78017c](https://github.com/sapphiredev/plugins/commit/c78017c090b04f6380103b4ae4cd97767796eeb6))
- Update bullmq transitive dependency ([43dd84c](https://github.com/sapphiredev/plugins/commit/43dd84c8e1331d71be69c6b0e279796a2bfa41b9))
- Ensure cts file extensions in dist/cjs (#537) ([6f863f8](https://github.com/sapphiredev/plugins/commit/6f863f8187b7028cf6464dd04f197dd1be6ca1dd))
- **scheduled-tasks:** Bump transitive dependencies ([834119e](https://github.com/sapphiredev/plugins/commit/834119e0423c7e046975d8e320b0515c00971714))
- **scheduled-tasks:** Bump bullmq transitive dependency ([8efcaee](https://github.com/sapphiredev/plugins/commit/8efcaee5802a2203288089ce79fcae9ee9c7b086))
- **scheduled-tasks:** Bump transitive dependencies ([30116e2](https://github.com/sapphiredev/plugins/commit/30116e2fe9e7fb523c9805afc150f5725395ef96))

# [@sapphire/plugin-scheduled-tasks@10.0.0](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-scheduled-tasks@10.0.0...@sapphire/plugin-scheduled-tasks@10.0.0) - (2023-12-27)

## 🚀 Features

- Bullmq v5 (#529) ([4278ab0](https://github.com/sapphiredev/plugins/commit/4278ab035989ec99bf0f7233f98e4ff75b57f71d))
  - 💥 **BREAKING CHANGE:** This plugin now uses bullmq v5.1.0 (previously v3.15.8). Refer to the bullmq breaking changes from v4.0.0 onwards for any breaking changes that they have included https://github.com/taskforcesh/bullmq/blob/master/docs/gitbook/changelog.md#400-2023-06-21
- **scheduled-tasks:** Enforce payload types, clearer Redis/BullMQ errors (#509) ([9fbf980](https://github.com/sapphiredev/plugins/commit/9fbf980e603022c3e1cd61a9ad742cd43a60e7fa))
  - 💥 **BREAKING CHANGE:** Refer to https://github.com/sapphiredev/plugins/blob/main/packages/scheduled-tasks/UPGRADING-v9-v10.md for upgrading instructions.
  - 💥 **BREAKING CHANGE:** payload types are now enforced, you may need to update your code to match.
  - 💥 **BREAKING CHANGE:** The `ScheduledTaskJob` interface has been removed in favor of defining types on `ScheduledTasks`.
  - 💥 **BREAKING CHANGE:** Due to the removal of `ScheduledTaskJob`, the `BullClient` will now be typed as `unknown` since the Job types in the Queue can not _really_ be known. So you will need to do validation when interacting directly with the client.
  - 💥 **BREAKING CHANGE:** The included error listeners are now enabled by default. If you want them to be disabled, just set `loadScheduledTaskErrorListeners` to false in the `SapphireClient` options.
  - 💥 **BREAKING CHANGE:** The internal BullMQ client does not actually throw any errors, it just emits them from the client. As such, those error events will now be sent to the corresponding error listener registered by the plugin.
  - 💥 **BREAKING CHANGE:** The error listeners previously only returned the name of the task when an error was emitted, but now the event will provide the associated Piece.

# [@sapphire/plugin-scheduled-tasks@9.1.0](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-scheduled-tasks@9.1.0...@sapphire/plugin-scheduled-tasks@9.1.0) - (2023-12-18)

## 🚀 Features

- **scheduled-tasks:** Add timezone for tasks with pattern (#518) ([f3396a1](https://github.com/sapphiredev/plugins/commit/f3396a170f2b3cb921652360264a201a1075e57a))

# [@sapphire/plugin-scheduled-tasks@9.0.1](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-scheduled-tasks@9.0.1...@sapphire/plugin-scheduled-tasks@9.0.1) - (2023-12-05)

## ↩️ Revert

- "refactor(register): cleanup unnecessary side effect imports of index" ([c2af242](https://github.com/sapphiredev/plugins/commit/c2af24269956132237988d94e4d94719b2cd442c))

# [@sapphire/plugin-scheduled-tasks@9.0.0](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-scheduled-tasks@9.0.0...@sapphire/plugin-scheduled-tasks@9.0.0) - (2023-12-05)

## 🏠 Refactor

- **register:** Cleanup unnecessary side effect imports of index ([dede596](https://github.com/sapphiredev/plugins/commit/dede596ae22ceec2700dd860287a1260f092b502))

## 🐛 Bug Fixes

- **scheduled-tasks:** Expose `load*` methods on the `index` level in case register isn't used ([d7f380b](https://github.com/sapphiredev/plugins/commit/d7f380b9126f48616de3657f949ac583c63a3f34))
- Update transitive dependencies ([9fd4cfa](https://github.com/sapphiredev/plugins/commit/9fd4cfae031b20044aad8ae1051ade3dd29c69dd))

## 🚀 Features

- Split ESM and CJS bundles for proper ESM and CJS loading (#512) ([d9aa006](https://github.com/sapphiredev/plugins/commit/d9aa006ff8c7f78a613dcca605d3353b992b7a46))
  - 💥 **BREAKING CHANGE:** This ensures that the plugins will properly load the
either only ESM or only CJS files. This is done by outputting
dist/cjs and dist/esm folders. This requires @sapphire/framework v5.x!

# [@sapphire/plugin-scheduled-tasks@8.1.0](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-scheduled-tasks@8.1.0...@sapphire/plugin-scheduled-tasks@8.1.0) - (2023-11-16)

## 🏠 Refactor

- Support latest /framework ([0625d4d](https://github.com/sapphiredev/plugins/commit/0625d4db01573ae02d05fe5b4dfcf679c25a94ba))

## 🚀 Features

- Make all pieces virtual ([847288b](https://github.com/sapphiredev/plugins/commit/847288b3f5149dc8f0abf0263104e635079f2f8f))
- **scheduled-tasks:** Add error listeners (#499) ([ccbe75e](https://github.com/sapphiredev/plugins/commit/ccbe75e6eb30f5918773c4daccc7ce013666b35e))

# [@sapphire/plugin-scheduled-tasks@8.0.0](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-scheduled-tasks@8.0.0...@sapphire/plugin-scheduled-tasks@8.0.0) - (2023-10-26)

## 🐛 Bug Fixes

- Fixed mismatch between `customJobOptions` and `bullJobsOptions` ([5bc7fbc](https://github.com/sapphiredev/plugins/commit/5bc7fbc2bc53fea3721e8d16d22e52eb59f04499))
  - 💥 **BREAKING CHANGE:** `bullJobsOptions` has been removed. The 1:1 replacement is `customJobOptions`
- **scheduled-tasks:** Set `engines.node` to `>=18` ([d0df8aa](https://github.com/sapphiredev/plugins/commit/d0df8aa0d97d68e7bbbad4c9ad808168dd5b11a2))

# [@sapphire/plugin-scheduled-tasks@7.1.2](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-scheduled-tasks@7.1.1...@sapphire/plugin-scheduled-tasks@7.1.2) - (2023-08-23)

## 🏠 Refactor

- ***:** Cleanup plugin registry files (#469) ([215b334](https://github.com/sapphiredev/plugins/commit/215b3348b30077238147dbc643769d960b856ba1))

# [@sapphire/plugin-scheduled-tasks@7.1.1](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-scheduled-tasks@7.1.0...@sapphire/plugin-scheduled-tasks@7.1.1) - (2023-07-21)

## 🐛 Bug Fixes

- **scheduled-tasks:** Bump transitive @sapphire/utilities and bullmq dependencies ([4497403](https://github.com/sapphiredev/plugins/commit/449740360e06caf98998c6f8b54e2f1750cb07b1))
- **scheduled-tasks:** Bump bullmq transitive dependency ([7140c34](https://github.com/sapphiredev/plugins/commit/7140c3498de7ed3572c82c19cad9fbaa9584d7c1))

# [@sapphire/plugin-scheduled-tasks@7.1.0](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-scheduled-tasks@7.0.0...@sapphire/plugin-scheduled-tasks@7.1.0) - (2023-05-24)

## 🐛 Bug Fixes

- Update bullmq dependency ([5ccf732](https://github.com/sapphiredev/plugins/commit/5ccf732ef3a5a7ce1d8fb71a3e540b259589a9a8))
- **deps:** Update all non-major dependencies ([9bb6627](https://github.com/sapphiredev/plugins/commit/9bb6627c20999d37130537fce58241c12a795046))
- **scheduled-tasks:** Bump bullmq ([35fa66a](https://github.com/sapphiredev/plugins/commit/35fa66ad1dd6a275994834fc92b42a34ef17f31f))

## 🚀 Features

- **scheduled-tasks:** Add typings for listener events (#443) ([5ee1814](https://github.com/sapphiredev/plugins/commit/5ee18141634d40d6b211304f74c82a6f439cf980))

# [@sapphire/plugin-scheduled-tasks@7.0.0](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-scheduled-tasks@6.0.1...@sapphire/plugin-scheduled-tasks@7.0.0) - (2023-05-05)

## 🏠 Refactor

- **scheduled-tasks:** Remove sqs support (#437) ([332f25d](https://github.com/sapphiredev/plugins/commit/332f25db960ec4047ca7b6b97bbeb63a6ad7e991))
  - 💥 **BREAKING CHANGE:** sqs support has been removed as it was no longer maintained and used version has been deprecated
  - 💥 **BREAKING CHANGE:** redis strategy is now default and the naming scheme of all types and classes have been changed to match
  - 💥 **BREAKING CHANGE:** The options passed to `clientOptions.tasks` can be flattened to remove the `new ScheduledTaskRedisStrategy` and just provide options directly.

# [@sapphire/plugin-scheduled-tasks@6.0.1](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-scheduled-tasks@6.0.0...@sapphire/plugin-scheduled-tasks@6.0.1) - (2023-04-10)

## 🐛 Bug Fixes

- **scheduled-tasks:** Fixed compatibility with TS 5.x ([ddb942e](https://github.com/sapphiredev/plugins/commit/ddb942e2ba1f1b0de39b7acd9b84395e5dec91fe))
- **scheduled-tasks:** Update dependencies ([2fe31a0](https://github.com/sapphiredev/plugins/commit/2fe31a0cb821059215c098bab60a0ecc56518a3c))
- **deps:** Update all non-major dependencies (#399) ([953d57b](https://github.com/sapphiredev/plugins/commit/953d57b06ea624baa89ba1d03131c5fb10cecbfb))
- **deps:** Update all non-major dependencies (#387) ([e31f714](https://github.com/sapphiredev/plugins/commit/e31f7140c8bb7c34086540912eb595dd04adaef5))

# [@sapphire/plugin-scheduled-tasks@6.0.0](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-scheduled-tasks@5.0.1...@sapphire/plugin-scheduled-tasks@6.0.0) - (2022-10-29)

## 🏠 Refactor

- **scheduled-tasks:** Support for bullmq v3 (#386) ([4b37938](https://github.com/sapphiredev/plugins/commit/4b37938b857260a9a34587c27c37ed2c204c10b3))
  - 💥 **BREAKING CHANGE:** This plugin now depends on bullmq version 3.x. This means `cron` has been changed to `pattern`, see also https://github.com/taskforcesh/bullmq/pull/1456 and the full changelog https://github.com/taskforcesh/bullmq/blob/master/docs/gitbook/changelog.md#300-2022-10-25

## 🐛 Bug Fixes

- **scheduled-tasks:** Update dependencies ([0a6cabf](https://github.com/sapphiredev/plugins/commit/0a6cabf486618ee8092406a66e8501f981207cbb))

## 📝 Documentation

- Add @Arcadia148 as a contributor ([3a28c2f](https://github.com/sapphiredev/plugins/commit/3a28c2fc9a08be5e66026b7468a304c8b83203e6))

# [@sapphire/plugin-scheduled-tasks@5.0.1](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-scheduled-tasks@5.0.0...@sapphire/plugin-scheduled-tasks@5.0.1) - (2022-10-02)

## 🐛 Bug Fixes

- **scheduled-tasks:** Bump dependencies ([3b7fd06](https://github.com/sapphiredev/plugins/commit/3b7fd06dbf14e19a2a767395a5bfdacf6068769d))

## 📝 Documentation

- Add @r-priyam as a contributor ([2d97019](https://github.com/sapphiredev/plugins/commit/2d970198717285c0f1652340ce87b1a4780179f3))
- Add @BenSegal855 as a contributor ([66553df](https://github.com/sapphiredev/plugins/commit/66553dfbb4bc7332c295277ffa4a8f720401bc89))
- Add @yuansheng1549 as a contributor ([c36ac65](https://github.com/sapphiredev/plugins/commit/c36ac65cd0a1a3e266a8a3679a58404177e0bb6b))
- Add @RealShadowNova as a contributor ([6cfa76f](https://github.com/sapphiredev/plugins/commit/6cfa76f793a16c6d11aa057e66e3fb41a9f4fb6d))

# [@sapphire/plugin-scheduled-tasks@5.0.0](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-scheduled-tasks@4.0.1...@sapphire/plugin-scheduled-tasks@5.0.0) - (2022-09-25)

## 🚀 Features

- **scheduled-tasks:** Update dependency bullmq to v2 (#363) ([8e27891](https://github.com/sapphiredev/plugins/commit/8e2789132829eeeab3b52529d4ecefedbbc78ace))
  - 💥 **BREAKING CHANGE:** scheduled-tasks plugin now depends on BullMQ v2, please update your dependency.

# [@sapphire/plugin-scheduled-tasks@4.0.1](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-scheduled-tasks@4.0.0...@sapphire/plugin-scheduled-tasks@4.0.1) - (2022-09-18)

## 🏠 Refactor

- **scheduled-task:** Remove `@types/ioredis`, require ioredis v5, and bump bullmq (#359) ([50fa969](https://github.com/sapphiredev/plugins/commit/50fa9699a0f9d0cbb676efd0eb02c4253413c558))

## 🐛 Bug Fixes

- **scheduled-tasks:** Fix dependencies ([738fb7f](https://github.com/sapphiredev/plugins/commit/738fb7f18bca305725fde7b7b8c3c1ad92f45e7c))
- **scheduled-tasks:** Various register fixes (#355) ([9ab3cc6](https://github.com/sapphiredev/plugins/commit/9ab3cc67669684f79f788dc3825bb8c04b39f96b))

# [@sapphire/plugin-scheduled-tasks@4.0.0](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-scheduled-tasks@3.0.0...@sapphire/plugin-scheduled-tasks@4.0.0) - (2022-08-20)

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

# [@sapphire/plugin-scheduled-tasks@3.0.0](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-scheduled-tasks@2.3.5...@sapphire/plugin-scheduled-tasks@3.0.0) - (2022-07-21)

## 🏠 Refactor

- **scheduled-task:** Migrate from bull to bullmq (#326) ([c6a09d9](https://github.com/sapphiredev/plugins/commit/c6a09d946f2b33eb07adac4e3aec3050cf4dd6a3))
  - 💥 **BREAKING CHANGE:** `bull` optional dependency has been changed for `bullmq`
  - 💥 **BREAKING CHANGE:** The interface for the options parameter for a new `ScheduledTask` piece has been changed to have a key of `bullJobsOptions` instead of the old `bullJobOptions`. The same rename has also been applied to the public property on the `ScheduledTask` class.
  - 💥 **BREAKING CHANGE:** When creating a new scheduled task the third argument (`options`) the required interface has changed. See the following changes for details.
  - 💥 **BREAKING CHANGE:** `ScheduledTasksTaskOptions.type` has been renamed to `ScheduledTasksTaskOptions.repeated`. `type: 'default'` is equal to `repeated: false` and `type: 'repeated'` is equal to `repeated: true`
  - 💥 **BREAKING CHANGE:** `bullJobOptions` has been renamed to `customJobOptions`
  - 💥 **BREAKING CHANGE:** The private property of `ScheduledTaskRedisStrategy.bullClient` is now `ScheduledTaskRedisStrategy.queueClient` (note: the public getter `client` is unchanged).

## 🐛 Bug Fixes

- **deps:** Update dependency @sapphire/time-utilities to ^1.7.5 ([e43644d](https://github.com/sapphiredev/plugins/commit/e43644d22dc5440c6c5dede05211fd648b07cf99))

# [@sapphire/plugin-scheduled-tasks@2.3.5](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-scheduled-tasks@2.3.3...@sapphire/plugin-scheduled-tasks@2.3.5) - (2022-07-11)

## 🏃 Performance

- **i18next:** Switch to new backend library ([21cd166](https://github.com/sapphiredev/plugins/commit/21cd1665c3bcba9c3dbc9711e9d57153ad768276))

## 🐛 Bug Fixes

- Manually set version ([117d5a6](https://github.com/sapphiredev/plugins/commit/117d5a6256af7e01b420b28f95abec36f3feb0af))

# [@sapphire/plugin-scheduled-tasks@2.3.3](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-scheduled-tasks@2.3.2...@sapphire/plugin-scheduled-tasks@2.3.3) - (2022-04-24)

## Bug Fixes

- **ScheduledTaskRedisStrategy:** Bull job options not being passed when adding task (#279) ([9f3dc42](https://github.com/sapphiredev/plugins/commit/9f3dc42a42c528b65ca04906add6db08a7b99227))

## Documentation

- Update typedoc setup ([5c855bd](https://github.com/sapphiredev/plugins/commit/5c855bd8341f155a41c9b85738541f1f47ac837a))

## [2.3.2](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-scheduled-tasks@2.3.1...@sapphire/plugin-scheduled-tasks@2.3.2) (2022-04-02)

### Bug Fixes

-   **schedules-tasks:** processor name on bull ([#264](https://github.com/sapphiredev/plugins/issues/264)) ([d0f7d5b](https://github.com/sapphiredev/plugins/commit/d0f7d5ba57131b68216f7c9d2964c49c81ca09d6))

## [2.3.1](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-scheduled-tasks@2.3.0...@sapphire/plugin-scheduled-tasks@2.3.1) (2022-04-01)

### Bug Fixes

-   **schedules-tasks:** create cron scheduled tasks with unique names to avoid name conflicts, causing tasks to be ignored ([#263](https://github.com/sapphiredev/plugins/issues/263)) ([44c4b94](https://github.com/sapphiredev/plugins/commit/44c4b94b88ad945771df81d1dbb514081606459c))

# [2.3.0](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-scheduled-tasks@2.2.0...@sapphire/plugin-scheduled-tasks@2.3.0) (2022-03-06)

### Bug Fixes

-   **deps:** update all non-major dependencies ([2016134](https://github.com/sapphiredev/plugins/commit/201613418babe93748e74064cf66d4ea0582725c))

### Features

-   allow module: NodeNext ([#251](https://github.com/sapphiredev/plugins/issues/251)) ([31bab09](https://github.com/sapphiredev/plugins/commit/31bab09834ebc1bc646e4a2849dbd24c65f08c0e))

# [2.2.0](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-scheduled-tasks@2.1.0...@sapphire/plugin-scheduled-tasks@2.2.0) (2022-01-23)

### Bug Fixes

-   **scheduled-tasks:** fix the flow of running repeated tasks ([b614a9a](https://github.com/sapphiredev/plugins/commit/b614a9a5664482fae79148162dac4eed9afe0e5a))

### Features

-   **scheduled-tasks:** make it possible to configure additional Job options when using Redis strategy ([#232](https://github.com/sapphiredev/plugins/issues/232)) ([cb90edc](https://github.com/sapphiredev/plugins/commit/cb90edce16dbff9280e88f6f18a4adf91cef28af))

# [2.1.0](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-scheduled-tasks@2.0.0...@sapphire/plugin-scheduled-tasks@2.1.0) (2022-01-13)

### Bug Fixes

-   **scheduled-tasks and pattern-commands:** Add params to event typedocs ([#222](https://github.com/sapphiredev/plugins/issues/222)) ([e18509f](https://github.com/sapphiredev/plugins/commit/e18509f2df3d3b1fd146e21c6dc199170d671b15))

### Features

-   **scheduled-tasks:** add duration to `ScheduledTaskSuccess` event ([#226](https://github.com/sapphiredev/plugins/issues/226)) ([6ab6493](https://github.com/sapphiredev/plugins/commit/6ab6493918bb7979a83d8beefc169329ee0bd5dd))

# [2.0.0](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-scheduled-tasks@1.2.1...@sapphire/plugin-scheduled-tasks@2.0.0) (2022-01-10)

### Bug Fixes

-   **scheduled-task:** Return result ([#221](https://github.com/sapphiredev/plugins/issues/221)) ([1cf6d92](https://github.com/sapphiredev/plugins/commit/1cf6d92bf90bc74b921aa6445af177632bdde5c6))

### Features

-   **scheduled-task:** add duration to finished and error events ([#218](https://github.com/sapphiredev/plugins/issues/218)) ([8d7d3a6](https://github.com/sapphiredev/plugins/commit/8d7d3a6a9a8c23963832144d10971133135a035f))

## [1.2.1](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-scheduled-tasks@1.2.0...@sapphire/plugin-scheduled-tasks@1.2.1) (2022-01-09)

### Bug Fixes

-   **scheduled-task:** SQS type error when using Redis ([#217](https://github.com/sapphiredev/plugins/issues/217)) ([513aee6](https://github.com/sapphiredev/plugins/commit/513aee6520e6f6b322fb85e7cdd36a8ed40aed9d))

### Features

-   add HMR plugin ([#209](https://github.com/sapphiredev/plugins/issues/209)) ([4a18bb1](https://github.com/sapphiredev/plugins/commit/4a18bb1377a8d506fddc5bb991430503902d393b))

# [1.2.0](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-scheduled-tasks@1.1.1...@sapphire/plugin-scheduled-tasks@1.2.0) (2022-01-06)

### Bug Fixes

-   **scheduled-tasks:** added tsdoc for `ScheduledTaskEvents` ([17fff64](https://github.com/sapphiredev/plugins/commit/17fff647f3a8613be7750ca62c2675398bf3aa7a))
-   **scheduled-tasks:** fixed export of events enum not being on top level ([caf2d54](https://github.com/sapphiredev/plugins/commit/caf2d5465edbe7466734c283229b78ba2ea715c6))
-   **scheduled-tasks:** fixed the return types for the strategy methods ([3d8ec44](https://github.com/sapphiredev/plugins/commit/3d8ec44ca515b49eac2a1062875bc063a4e62982))

### Features

-   **scheduled-tasks:** add `delete`, `list`, `listRepeated` & `get` methods ([#207](https://github.com/sapphiredev/plugins/issues/207)) ([13c767b](https://github.com/sapphiredev/plugins/commit/13c767b4f241842f2f759ab0667bec329a6291c3))
-   **scheduled-tasks:** add getter for the client ([878e187](https://github.com/sapphiredev/plugins/commit/878e187241056bfbe8ce53d85dc8fa2f77bcb78c))

## [1.1.1](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-scheduled-tasks@1.1.0...@sapphire/plugin-scheduled-tasks@1.1.1) (2021-12-29)

### Bug Fixes

-   **scheduled-tasks:** no async/await for connect ([#201](https://github.com/sapphiredev/plugins/issues/201)) ([6c3b9b1](https://github.com/sapphiredev/plugins/commit/6c3b9b1b32fb8aa006e9bc1e88074d17cb315fa1))

# [1.1.0](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-scheduled-tasks@1.0.1...@sapphire/plugin-scheduled-tasks@1.1.0) (2021-12-29)

### Features

-   **scheduled-tasks:** emit various events in the process of handling scheduled tasks ([#200](https://github.com/sapphiredev/plugins/issues/200)) ([68a5e2a](https://github.com/sapphiredev/plugins/commit/68a5e2a4ca9b806ddbf38cee8b1331fb9aa1b46f))

## [1.0.1](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-scheduled-tasks@1.0.0...@sapphire/plugin-scheduled-tasks@1.0.1) (2021-12-28)

### Bug Fixes

-   **scheduled-task:** bump `bull` and `@sapphire/time-utilities` dependencies ([f12a285](https://github.com/sapphiredev/plugins/commit/f12a2851bc57b49b5c716d9974e269c1723d8c2d))

# 1.0.0 (2021-12-26)

### Features

-   Scheduled tasks plugin ([#148](https://github.com/sapphiredev/plugins/issues/148)) ([65d5f04](https://github.com/sapphiredev/plugins/commit/65d5f04bdaf9f1b8df0bc3a2ddf0413ca7a4a631))
