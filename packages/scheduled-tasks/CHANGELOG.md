# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

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
