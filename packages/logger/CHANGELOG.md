# Changelog

All notable changes to this project will be documented in this file.

# [@sapphire/plugin-logger@4.0.2](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-logger@4.0.2...@sapphire/plugin-logger@4.0.2) - (2024-01-19)

## 🐛 Bug Fixes

- Update transitive sapphire dependencies ([c78017c](https://github.com/sapphiredev/plugins/commit/c78017c090b04f6380103b4ae4cd97767796eeb6))
- Ensure cts file extensions in dist/cjs (#537) ([6f863f8](https://github.com/sapphiredev/plugins/commit/6f863f8187b7028cf6464dd04f197dd1be6ca1dd))

# [@sapphire/plugin-logger@4.0.1](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-logger@4.0.1...@sapphire/plugin-logger@4.0.1) - (2023-12-05)

## ↩️ Revert

- "refactor(register): cleanup unnecessary side effect imports of index" ([c2af242](https://github.com/sapphiredev/plugins/commit/c2af24269956132237988d94e4d94719b2cd442c))

# [@sapphire/plugin-logger@4.0.0](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-logger@4.0.0...@sapphire/plugin-logger@4.0.0) - (2023-12-05)

## 🏠 Refactor

- **register:** Cleanup unnecessary side effect imports of index ([dede596](https://github.com/sapphiredev/plugins/commit/dede596ae22ceec2700dd860287a1260f092b502))

## 🐛 Bug Fixes

- **logger:** In register load module augments from index to ensure a clean `.d.ts` file ([eed0124](https://github.com/sapphiredev/plugins/commit/eed01248cb5d5d20eb68bb2583c186f6f70b4d84))
- Update transitive dependencies ([9fd4cfa](https://github.com/sapphiredev/plugins/commit/9fd4cfae031b20044aad8ae1051ade3dd29c69dd))

## 🚀 Features

- Split ESM and CJS bundles for proper ESM and CJS loading (#512) ([d9aa006](https://github.com/sapphiredev/plugins/commit/d9aa006ff8c7f78a613dcca605d3353b992b7a46))
  - 💥 **BREAKING CHANGE:** This ensures that the plugins will properly load the
either only ESM or only CJS files. This is done by outputting
dist/cjs and dist/esm folders. This requires @sapphire/framework v5.x!

# [@sapphire/plugin-logger@3.0.7](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-logger@3.0.7...@sapphire/plugin-logger@3.0.7) - (2023-11-16)

## 🐛 Bug Fixes

- Set `engines.node` to `>=v18` ([885a390](https://github.com/sapphiredev/plugins/commit/885a3908d59fd00f7214ef474f2c6a3c58e95af2))

## 📝 Documentation

- Reference updated types in README ([cc963c4](https://github.com/sapphiredev/plugins/commit/cc963c4b7877ad5822d062241f9053181063e993))

# [@sapphire/plugin-logger@3.0.6](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-logger@3.0.5...@sapphire/plugin-logger@3.0.6) - (2023-08-23)

## 🏠 Refactor

- ***:** Cleanup plugin registry files (#469) ([215b334](https://github.com/sapphiredev/plugins/commit/215b3348b30077238147dbc643769d960b856ba1))

# [@sapphire/plugin-logger@3.0.5](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-logger@3.0.4...@sapphire/plugin-logger@3.0.5) - (2023-07-21)

## 🏠 Refactor

- Generalize `stdout` and `stderr` types (#452) ([93d4e89](https://github.com/sapphiredev/plugins/commit/93d4e8945c46f33ef893c4e1f1aa05e3cbc02844))

# [@sapphire/plugin-logger@3.0.4](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-logger@3.0.3...@sapphire/plugin-logger@3.0.4) - (2023-05-03)

## 🐛 Bug Fixes

- **logger:** Remove const enum for verbatimModuleSyntax ([7a7e55d](https://github.com/sapphiredev/plugins/commit/7a7e55d68330ce8246a2c32cc22cdff678a8c700))

# [@sapphire/plugin-logger@3.0.3](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-logger@3.0.2...@sapphire/plugin-logger@3.0.3) - (2023-04-10)

## 🐛 Bug Fixes

- **logger:** Fixed compatibility with TS 5.x ([e6a8386](https://github.com/sapphiredev/plugins/commit/e6a8386912b310b4e3907f44d01861d8e3e4e4b5))

# [@sapphire/plugin-logger@3.0.2](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-logger@3.0.1...@sapphire/plugin-logger@3.0.2) - (2023-04-02)

## 🐛 Bug Fixes

- **deps:** Update all non-major dependencies (#399) ([953d57b](https://github.com/sapphiredev/plugins/commit/953d57b06ea624baa89ba1d03131c5fb10cecbfb))
- **deps:** Update all non-major dependencies (#387) ([e31f714](https://github.com/sapphiredev/plugins/commit/e31f7140c8bb7c34086540912eb595dd04adaef5))

## 📝 Documentation

- Add @Arcadia148 as a contributor ([3a28c2f](https://github.com/sapphiredev/plugins/commit/3a28c2fc9a08be5e66026b7468a304c8b83203e6))
- Add @r-priyam as a contributor ([2d97019](https://github.com/sapphiredev/plugins/commit/2d970198717285c0f1652340ce87b1a4780179f3))
- Add @BenSegal855 as a contributor ([66553df](https://github.com/sapphiredev/plugins/commit/66553dfbb4bc7332c295277ffa4a8f720401bc89))
- Add @yuansheng1549 as a contributor ([c36ac65](https://github.com/sapphiredev/plugins/commit/c36ac65cd0a1a3e266a8a3679a58404177e0bb6b))
- Add @RealShadowNova as a contributor ([6cfa76f](https://github.com/sapphiredev/plugins/commit/6cfa76f793a16c6d11aa057e66e3fb41a9f4fb6d))

# [@sapphire/plugin-logger@3.0.1](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-logger@3.0.0...@sapphire/plugin-logger@3.0.1) - (2022-09-18)

## 🏠 Refactor

- **logger:** Switch from time-utilities to timestamp package ([345769b](https://github.com/sapphiredev/plugins/commit/345769b34fe7c3397d5f6cecbe2ab64cf89be600))

## 🧪 Testing

- Migrate to vitest ([94a182e](https://github.com/sapphiredev/plugins/commit/94a182ea0d03f79616c66983695caf64e93cb6c3))

# [@sapphire/plugin-logger@3.0.0](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-logger@2.2.3...@sapphire/plugin-logger@3.0.0) - (2022-08-20)

## 🐛 Bug Fixes

- Manually set version to 3.0.0 to cover @sapphire/framework@3.0.0 ([b6b05f4](https://github.com/sapphiredev/plugins/commit/b6b05f4d56d3e2f9d0b54a545d6ef6904f5006bf))
- **deps:** Update dependency @sapphire/time-utilities to ^1.7.5 ([e43644d](https://github.com/sapphiredev/plugins/commit/e43644d22dc5440c6c5dede05211fd648b07cf99))

## 📝 Documentation

- Add @ricardooow as a contributor ([15d7f9b](https://github.com/sapphiredev/plugins/commit/15d7f9b0d7428559441550aba1918d068565baa6))
- Add @imranbarbhuiya as a contributor ([e3d8fdc](https://github.com/sapphiredev/plugins/commit/e3d8fdc433a6c89389b2e1c574245e8140d1c47a))
- Add @KrishAgarwal2811 as a contributor ([875dda0](https://github.com/sapphiredev/plugins/commit/875dda0756f1b5302e77993e44a1ac9ab1a065d0))
- Add @jczstudios as a contributor ([c9126bc](https://github.com/sapphiredev/plugins/commit/c9126bc2bb454989c006864293ef99a47369dc38))
- Add @MajesticString as a contributor ([2743c8d](https://github.com/sapphiredev/plugins/commit/2743c8d5b9abe1b554ac7d776cb827d6a1e9db7b))
- Add @Mzato0001 as a contributor ([06626cd](https://github.com/sapphiredev/plugins/commit/06626cd7ff94d3bc8ce75da6383e1b77b6109a3d))

# [@sapphire/plugin-logger@2.2.3](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-logger@2.2.1...@sapphire/plugin-logger@2.2.3) - (2022-07-11)

## 🏃 Performance

- **i18next:** Switch to new backend library ([21cd166](https://github.com/sapphiredev/plugins/commit/21cd1665c3bcba9c3dbc9711e9d57153ad768276))

## 🐛 Bug Fixes

- Manually set version ([117d5a6](https://github.com/sapphiredev/plugins/commit/117d5a6256af7e01b420b28f95abec36f3feb0af))

## 📝 Documentation

- Update typedoc setup ([5c855bd](https://github.com/sapphiredev/plugins/commit/5c855bd8341f155a41c9b85738541f1f47ac837a))

## [2.2.1](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-logger@2.2.0...@sapphire/plugin-logger@2.2.1) (2022-04-01)

**Note:** Version bump only for package @sapphire/plugin-logger

# [2.2.0](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-logger@2.1.3...@sapphire/plugin-logger@2.2.0) (2022-03-06)

### Features

-   allow module: NodeNext ([#251](https://github.com/sapphiredev/plugins/issues/251)) ([31bab09](https://github.com/sapphiredev/plugins/commit/31bab09834ebc1bc646e4a2849dbd24c65f08c0e))

## [2.1.3](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-logger@2.1.2...@sapphire/plugin-logger@2.1.3) (2022-01-23)

**Note:** Version bump only for package @sapphire/plugin-logger

## [2.1.2](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-logger@2.1.1...@sapphire/plugin-logger@2.1.2) (2022-01-13)

**Note:** Version bump only for package @sapphire/plugin-logger

## [2.1.1](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-logger@2.1.0...@sapphire/plugin-logger@2.1.1) (2021-12-06)

### Bug Fixes

-   **deps:** update dependency @sapphire/time-utilities to ^1.5.0 ([d4cf912](https://github.com/sapphiredev/plugins/commit/d4cf912f1e77ad4ce74e9caa4ed427e60ad4b889))

# [2.1.0](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-logger@2.0.2...@sapphire/plugin-logger@2.1.0) (2021-11-21)

### Features

-   expose and use namespaces for options, context, etc ([#176](https://github.com/sapphiredev/plugins/issues/176)) ([33452da](https://github.com/sapphiredev/plugins/commit/33452da808d91313a5d3bf680e11b5208ac67442))

## [2.0.2](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-logger@2.0.1...@sapphire/plugin-logger@2.0.2) (2021-11-06)

### Bug Fixes

-   **docs:** replace command usage of `run` to `messageRun` ([#160](https://github.com/sapphiredev/plugins/issues/160)) ([415adb8](https://github.com/sapphiredev/plugins/commit/415adb85b884da5d0f1f2ce07a9d46134f2bcb12))

## [2.0.1](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-logger@2.0.0...@sapphire/plugin-logger@2.0.1) (2021-10-17)

### Bug Fixes

-   allow more node & npm versions in engines field ([ce5b12f](https://github.com/sapphiredev/plugins/commit/ce5b12f8142297bceda49b85574a95a3cf9112ab))

# [2.0.0](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-logger@1.0.13...@sapphire/plugin-logger@2.0.0) (2021-10-16)

### Bug Fixes

-   **api:** update to Discord API v9 ([#124](https://github.com/sapphiredev/plugins/issues/124)) ([b194fe6](https://github.com/sapphiredev/plugins/commit/b194fe613ec04f327a2aa5ae8d051c400ed105c8))
-   **deps:** update dependency colorette to v2 ([#142](https://github.com/sapphiredev/plugins/issues/142)) ([5ee876b](https://github.com/sapphiredev/plugins/commit/5ee876b3c43c688861168063b92fb343ba184fc9))

### Features

-   **i18next:** update i18next dependency ([#129](https://github.com/sapphiredev/plugins/issues/129)) ([96519de](https://github.com/sapphiredev/plugins/commit/96519de5de253db390ed9a76ed073ffe1eabd187))
-   **subcommands:** migrate `Command#run` to `Command#messageRun` ([#157](https://github.com/sapphiredev/plugins/issues/157)) ([2960711](https://github.com/sapphiredev/plugins/commit/29607111c4e4f61ece463e10854982f205879996))

### BREAKING CHANGES

-   **i18next:** i18next has been updated to v21.0.1. Please also seee the breaking changes for i18next [here](https://github.com/i18next/i18next/blob/master/CHANGELOG.md#2100) and their migration guide [here](https://www.i18next.com/misc/migration-guide#v-20-x-x-to-v-21-0-0)

-   chore: activate renovate

## [1.0.13](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-logger@1.0.12...@sapphire/plugin-logger@1.0.13) (2021-06-19)

### Bug Fixes

-   **docs:** update-tsdoc-for-vscode-may-2021 ([#92](https://github.com/sapphiredev/plugins/issues/92)) ([ac52451](https://github.com/sapphiredev/plugins/commit/ac52451f3cf5560a8b93931411cc04497c00d4a9))
-   remove peer deps, update dev deps, update READMEs ([#91](https://github.com/sapphiredev/plugins/issues/91)) ([3489b1d](https://github.com/sapphiredev/plugins/commit/3489b1dc1e8a7c64c255595b3d441cd0b5bac936))
-   **logger:** specify package side effects ([03e04d2](https://github.com/sapphiredev/plugins/commit/03e04d2751f1897e8e2cb6043ceac72681ce1049))

## [1.0.12](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-logger@1.0.11...@sapphire/plugin-logger@1.0.12) (2021-05-02)

### Bug Fixes

-   drop the `www.` from the SapphireJS URL ([a86049f](https://github.com/sapphiredev/plugins/commit/a86049f185f0ccb12d61379dd82255b36d4fa145))
-   update all the SapphireJS URLs from `.com` to `.dev` ([c5fd156](https://github.com/sapphiredev/plugins/commit/c5fd15691abb9a9712dc4b8aebd8400f6d91f719))

## [1.0.11](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-logger@1.0.10...@sapphire/plugin-logger@1.0.11) (2021-04-21)

### Bug Fixes

-   change all Sapphire URLs from "project"->"community" & use our domain where applicable 👨‍🌾🚜 ([#75](https://github.com/sapphiredev/plugins/issues/75)) ([e437dc4](https://github.com/sapphiredev/plugins/commit/e437dc45fcd4d22ab2dcdb0e70c67cc5856883c0))

## [1.0.10](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-logger@1.0.9...@sapphire/plugin-logger@1.0.10) (2021-04-03)

**Note:** Version bump only for package @sapphire/plugin-logger

## [1.0.9](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-logger@1.0.8...@sapphire/plugin-logger@1.0.9) (2021-03-16)

### Bug Fixes

-   update dependencies, add tslib, bump framework to v1.0.0 ([880b761](https://github.com/sapphiredev/plugins/commit/880b7614d857f23fcbcd351e69795c451a95f49c))

## [1.0.8](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-logger@1.0.7...@sapphire/plugin-logger@1.0.8) (2021-02-16)

**Note:** Version bump only for package @sapphire/plugin-logger

## [1.0.7](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-logger@1.0.6...@sapphire/plugin-logger@1.0.7) (2021-02-07)

### Bug Fixes

-   **logger:** update dependencies in package.json ([9386b3a](https://github.com/sapphiredev/plugins/commit/9386b3a30773e34ac1a50fe3d4ad0452a93a9fc1))

## [1.0.6](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-logger@1.0.5...@sapphire/plugin-logger@1.0.6) (2021-01-23)

**Note:** Version bump only for package @sapphire/plugin-logger

## [1.0.5](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-logger@1.0.4...@sapphire/plugin-logger@1.0.5) (2021-01-09)

**Note:** Version bump only for package @sapphire/plugin-logger

## [1.0.4](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-logger@1.0.3...@sapphire/plugin-logger@1.0.4) (2020-12-28)

### Bug Fixes

-   **api,logger:** add type augments to index.ts ([ae1f4da](https://github.com/sapphiredev/plugins/commit/ae1f4da9671a531edf10555242e21f39eb3b0d17))
-   **api,logger:** properly export ESM register ([7cf7ea9](https://github.com/sapphiredev/plugins/commit/7cf7ea9a9c91f73874035b0512292cc08d93e38e))
-   **api,logger:** third attempt at fixing register and types ([faa3ee2](https://github.com/sapphiredev/plugins/commit/faa3ee2f53d2ca1153a7eff2a64e2abf3feaae85))
-   **logger:** fix location of register file ([6e9a6f7](https://github.com/sapphiredev/plugins/commit/6e9a6f7ae4de5222e879394d717ae04ffb048aeb))
-   **logger:** include register in github publishes ([e297af8](https://github.com/sapphiredev/plugins/commit/e297af8cada0ff3cf94bbe17e2f1c340743cd4d2))

## [1.0.3](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-logger@1.0.2...@sapphire/plugin-logger@1.0.3) (2020-12-24)

**Note:** Version bump only for package @sapphire/plugin-logger

## [1.0.2](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-logger@1.0.1...@sapphire/plugin-logger@1.0.2) (2020-12-24)

### Bug Fixes

-   **logger:** append extra space in default infix ([0daa435](https://github.com/sapphiredev/plugins/commit/0daa4351f75782bde0a2e763c61ca401e559d64f))

## [1.0.1](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-logger@1.0.0...@sapphire/plugin-logger@1.0.1) (2020-12-24)

### Bug Fixes

-   **logger:** remove second spread ([61cddb7](https://github.com/sapphiredev/plugins/commit/61cddb7dfd433c0afd8aeddd6a42b78a1be17850))
-   **logger:** use pre-generics initialization hook ([d8d3ce1](https://github.com/sapphiredev/plugins/commit/d8d3ce183c4e246a9707cbbfca0c69b135be7267))

# 1.0.0 (2020-12-24)

### Features

-   added plugin-logger ([#25](https://github.com/sapphiredev/plugins/issues/25)) ([192a8ca](https://github.com/sapphiredev/plugins/commit/192a8cac6c34c4dd1cc8e12dd5ba3307926c467d))
