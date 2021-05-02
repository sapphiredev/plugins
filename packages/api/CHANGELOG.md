# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.1.4](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-api@2.1.3...@sapphire/plugin-api@2.1.4) (2021-05-02)

### Bug Fixes

-   drop the `www.` from the SapphireJS URL ([a86049f](https://github.com/sapphiredev/plugins/commit/a86049f185f0ccb12d61379dd82255b36d4fa145))
-   update all the SapphireJS URLs from `.com` to `.dev` ([c5fd156](https://github.com/sapphiredev/plugins/commit/c5fd15691abb9a9712dc4b8aebd8400f6d91f719))

## [2.1.3](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-api@2.1.2...@sapphire/plugin-api@2.1.3) (2021-04-21)

### Bug Fixes

-   change all Sapphire URLs from "project"->"community" & use our domain where applicable 👨‍🌾🚜 ([#75](https://github.com/sapphiredev/plugins/issues/75)) ([e437dc4](https://github.com/sapphiredev/plugins/commit/e437dc45fcd4d22ab2dcdb0e70c67cc5856883c0))

## [2.1.2](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-api@2.1.1...@sapphire/plugin-api@2.1.2) (2021-04-03)

### Bug Fixes

-   **api:** always set Domain on cookie ([90b76e9](https://github.com/sapphiredev/plugins/commit/90b76e9586f213745517c1937437b7c48e4cafb0))

## [2.1.1](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-api@2.1.0...@sapphire/plugin-api@2.1.1) (2021-04-03)

### Bug Fixes

-   **api:** fixed types for CookieStore ([83420f4](https://github.com/sapphiredev/plugins/commit/83420f46dfbcfba3477aa4db0897dc4aacc2118e))

# [2.1.0](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-api@2.0.5...@sapphire/plugin-api@2.1.0) (2021-04-03)

### Features

-   **api:** add domainOverwrite to ServerOptions.auth ([#73](https://github.com/sapphiredev/plugins/issues/73)) ([32f9222](https://github.com/sapphiredev/plugins/commit/32f922240438b5587e4e51c76fe28babb1a5811f))

## [2.0.5](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-api@2.0.4...@sapphire/plugin-api@2.0.5) (2021-04-03)

### Bug Fixes

-   **api:** fixed how domain is retrieved for cookies ([#72](https://github.com/sapphiredev/plugins/issues/72)) ([bd5302f](https://github.com/sapphiredev/plugins/commit/bd5302fca79606f887bed19ffc828dccbecdb991))

## [2.0.4](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-api@2.0.3...@sapphire/plugin-api@2.0.4) (2021-03-16)

### Bug Fixes

-   update dependencies, add tslib, bump framework to v1.0.0 ([880b761](https://github.com/sapphiredev/plugins/commit/880b7614d857f23fcbcd351e69795c451a95f49c))

## [2.0.3](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-api@2.0.2...@sapphire/plugin-api@2.0.3) (2021-02-16)

### Bug Fixes

-   **plugin-api:** automatically remove cookie on invalid token ([#62](https://github.com/sapphiredev/plugins/issues/62)) ([5ce667e](https://github.com/sapphiredev/plugins/commit/5ce667ed6fc1eb1b2b88fea7698041d71c4579b7))

## [2.0.2](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-api@2.0.1...@sapphire/plugin-api@2.0.2) (2021-02-13)

### Bug Fixes

-   **plugin-api:** `expires_in` is in seconds, not milliseconds ([#60](https://github.com/sapphiredev/plugins/issues/60)) ([fccfab5](https://github.com/sapphiredev/plugins/commit/fccfab5321791a80dd30b541fca207b87acba4d2))

## [2.0.1](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-api@2.0.0...@sapphire/plugin-api@2.0.1) (2021-02-07)

**Note:** Version bump only for package @sapphire/plugin-api

# [2.0.0](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-api@1.5.2...@sapphire/plugin-api@2.0.0) (2021-02-03)

### Features

-   **api:** update for @sapphire/framework alpha 5 ([#53](https://github.com/sapphiredev/plugins/issues/53)) ([fe51322](https://github.com/sapphiredev/plugins/commit/fe513225a671072acd6904165393cb0e3d078464))

### BREAKING CHANGES

-   **api:** refer to breaking changes in [@sapphire/framework v1.0.0-alpha.5](https://github.com/sapphiredev/framework/releases/tag/v1.0.0-alpha.5)

## [1.5.2](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-api@1.5.1...@sapphire/plugin-api@1.5.2) (2021-01-28)

### Bug Fixes

-   **plugin-api:** swap condition ([27742f2](https://github.com/sapphiredev/plugins/commit/27742f23f71fbbc79b9e6606da9cfc4d48a891ae))

## [1.5.1](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-api@1.5.0...@sapphire/plugin-api@1.5.1) (2021-01-28)

### Bug Fixes

-   add additional peer dependencies ([d67820a](https://github.com/sapphiredev/plugins/commit/d67820ab2e0390980c785b56d4194c05fa59b1ba))
-   **plugin-api:** fixed typo ([#50](https://github.com/sapphiredev/plugins/issues/50)) ([d25c674](https://github.com/sapphiredev/plugins/commit/d25c674f2463f8bbe865f34ca5a6ef4c5b26f434))

# [1.5.0](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-api@1.4.0...@sapphire/plugin-api@1.5.0) (2021-01-28)

### Features

-   **plugin-api:** make LoginDataTransformer accept Awaited<LoginData> ([#49](https://github.com/sapphiredev/plugins/issues/49)) ([666e0a2](https://github.com/sapphiredev/plugins/commit/666e0a2adfb00510fa303f8b3d796eb00409fd38))

# [1.4.0](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-api@1.3.1...@sapphire/plugin-api@1.4.0) (2021-01-27)

### Features

-   **plugin-api:** added Auth#{fetchData,transformers}, fixed Oauth bug ([#48](https://github.com/sapphiredev/plugins/issues/48)) ([957a63b](https://github.com/sapphiredev/plugins/commit/957a63be9b783521d1a95015369d9e2530a41f55))

## [1.3.1](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-api@1.3.0...@sapphire/plugin-api@1.3.1) (2021-01-23)

### Bug Fixes

-   **plugin-api:** return null instead of throwing error ([#46](https://github.com/sapphiredev/plugins/issues/46)) ([7a0cf3d](https://github.com/sapphiredev/plugins/commit/7a0cf3d6d135ae4ab5de72e9e0c22446b3a9fffd))

# [1.3.0](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-api@1.2.0...@sapphire/plugin-api@1.3.0) (2021-01-09)

### Bug Fixes

-   **api:** update to latest discord-api-types ([6a46797](https://github.com/sapphiredev/plugins/commit/6a4679770f44b4930016280963c0fe4563c48bf2))

### Features

-   **api:** add media parsers ([#39](https://github.com/sapphiredev/plugins/issues/39)) ([18fac10](https://github.com/sapphiredev/plugins/commit/18fac107e9210a8c66da6b7cc5d3b24ab47a07e1))

# [1.2.0](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-api@1.1.1...@sapphire/plugin-api@1.2.0) (2020-12-28)

### Bug Fixes

-   **api:** correct the registered paths ([986dc5d](https://github.com/sapphiredev/plugins/commit/986dc5d6d6c37b071b09f655853998c2596efd10))
-   **api:** resolved a few critical bugs ([#30](https://github.com/sapphiredev/plugins/issues/30)) ([fc479c5](https://github.com/sapphiredev/plugins/commit/fc479c5c487303a21bad1d7023a40437ec328d17))
-   **api:** resolved all bugs with oauth2 ([#31](https://github.com/sapphiredev/plugins/issues/31)) ([d7c4ad4](https://github.com/sapphiredev/plugins/commit/d7c4ad47af1ff693c9fffc83a078eab4ffb6c33c))
-   **api,logger:** add type augments to index.ts ([ae1f4da](https://github.com/sapphiredev/plugins/commit/ae1f4da9671a531edf10555242e21f39eb3b0d17))
-   **api,logger:** properly export ESM register ([7cf7ea9](https://github.com/sapphiredev/plugins/commit/7cf7ea9a9c91f73874035b0512292cc08d93e38e))
-   **api,logger:** third attempt at fixing register and types ([faa3ee2](https://github.com/sapphiredev/plugins/commit/faa3ee2f53d2ca1153a7eff2a64e2abf3feaae85))

### Features

-   **api:** handle route errors ([#33](https://github.com/sapphiredev/plugins/issues/33)) ([bc3c6f6](https://github.com/sapphiredev/plugins/commit/bc3c6f619a8f27fcf5b505c441fb95f9ef439d72))

## [1.1.1](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-api@1.1.0...@sapphire/plugin-api@1.1.1) (2020-12-24)

**Note:** Version bump only for package @sapphire/plugin-api

# [1.1.0](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-api@1.0.1...@sapphire/plugin-api@1.1.0) (2020-12-24)

### Features

-   added plugin-logger ([#25](https://github.com/sapphiredev/plugins/issues/25)) ([192a8ca](https://github.com/sapphiredev/plugins/commit/192a8cac6c34c4dd1cc8e12dd5ba3307926c467d))

## [1.0.1](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-api@1.0.0...@sapphire/plugin-api@1.0.1) (2020-12-22)

### Bug Fixes

-   exclude tsbuildinfo ([3e37278](https://github.com/sapphiredev/plugins/commit/3e37278009e6842fe783e4ce31ab359fca6aef44))

# 1.0.0 (2020-12-22)

### Features

-   finished API ([#22](https://github.com/sapphiredev/plugins/issues/22)) ([a647112](https://github.com/sapphiredev/plugins/commit/a6471129ddab96146987a1dafa90f0576de8e2f2))
-   make API framework agnostic ([#24](https://github.com/sapphiredev/plugins/issues/24)) ([4067d70](https://github.com/sapphiredev/plugins/commit/4067d70dc9a6f0f4f7cf414eff8c1c785f7f0e86))
-   **api:** add api plugin ([d87c7ad](https://github.com/sapphiredev/plugins/commit/d87c7adf8555f948fde31381969d3ebe2f0102f4))
