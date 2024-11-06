# Changelog

All notable changes to this project will be documented in this file.

# [@sapphire/plugin-api@7.0.3](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-api@7.0.2...@sapphire/plugin-api@7.0.3) - (2024-11-06)

## 🐛 Bug Fixes

- **cors:** Use `RouterNode` for the available ACAM values ([b77af3f](https://github.com/sapphiredev/plugins/commit/b77af3f30897a3e123dce323f02cffba30ce4735)) ([#658](https://github.com/sapphiredev/plugins/pull/658) by @kyranet)

# [@sapphire/plugin-api@7.0.2](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-api@7.0.1...@sapphire/plugin-api@7.0.2) - (2024-11-05)

## 🐛 Bug Fixes

- **route:** Handle `index` case correctly ([954d495](https://github.com/sapphiredev/plugins/commit/954d495d2834f76983a70034624a3d4f5749e97e)) ([#657](https://github.com/sapphiredev/plugins/pull/657) by @kyranet)

# [@sapphire/plugin-api@7.0.1](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-api@7.0.0...@sapphire/plugin-api@7.0.1) - (2024-11-05)

## 🏠 Refactor

- **route:** Consider `index` as `/` ([3e51fea](https://github.com/sapphiredev/plugins/commit/3e51fea3ba2e0407c3e0ad45f15b148f07ab0836)) ([#656](https://github.com/sapphiredev/plugins/pull/656) by @kyranet)

# [@sapphire/plugin-api@7.0.0](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-api@6.1.1...@sapphire/plugin-api@7.0.0) - (2024-11-02)

## 🏠 Refactor

- Remove media parsers ([56b0ad1](https://github.com/sapphiredev/plugins/commit/56b0ad11604af73443c7c1e686682a5d3c42da3e)) ([#616](https://github.com/sapphiredev/plugins/pull/616) by @kyranet)
  - 💥 **BREAKING CHANGE:** Removed `MediaParser`
  - 💥 **BREAKING CHANGE:** Removed `MediaParserStore`
  - 💥 **BREAKING CHANGE:** Removed `Route#acceptedContentMimeTypes`
  - 💥 **BREAKING CHANGE:** Removed `ApiRequest#body`, use the new methods instead
- Switch `MimeTypes` to `MimeType` and use IANA media types ([834b446](https://github.com/sapphiredev/plugins/commit/834b446e7934e57a6281b38cf5a8e2cd5bcf01da)) ([#603](https://github.com/sapphiredev/plugins/pull/603) by @kyranet)
  - 💥 **BREAKING CHANGE:** `MimeTypes` has been removed in favor of the `MimeType` string union type consists of all IANA media types
- **router:** Change router system ([ce675e0](https://github.com/sapphiredev/plugins/commit/ce675e0e5cd0a9ff50de621fe3e5504ddbb5483c)) ([#590](https://github.com/sapphiredev/plugins/pull/590) by @kyranet)
  - 💥 **BREAKING CHANGE:** Moved `RouteStore#match` to a listener
  - 💥 **BREAKING CHANGE:** Replaced `node:events` with `@vladfrangu/async_event_emitter`
  - 💥 **BREAKING CHANGE:** Removed `route` parameter in the `Middleware#run` method, use `request.route` instead
  - 💥 **BREAKING CHANGE:** Removed `Route#router` property
  - 💥 **BREAKING CHANGE:** Removed `RouteStore#methods` property
  - 💥 **BREAKING CHANGE:** Removed objects in router events, use `request.route` and `request.routerNode` instead
  - 💥 **BREAKING CHANGE:** Renamed `ServerEvents` enum to `ServerEvent`
  - 💥 **BREAKING CHANGE:** Renamed event `match` to `routerFound`
  - 💥 **BREAKING CHANGE:** Renamed event `noMatch` to `routerBranchNotFound`
- **route:** Change method handling ([08a81b1](https://github.com/sapphiredev/plugins/commit/08a81b1eabbff0d0dcf3afe9438c7876c55a3510)) ([#588](https://github.com/sapphiredev/plugins/pull/588) by @kyranet)
  - 💥 **BREAKING CHANGE:** The headers middleware now uses the supported HTTP methods from the route or the store instead of sending all supported methods
  - 💥 **BREAKING CHANGE:** Changed the method handling in the `Route` class to not be keyed by the method name, sending all requests to the `run` method. This allows for more flexibility in the route handling
  - 💥 **BREAKING CHANGE:** Writing the name of a file as `<name>.<method>.ts` will now set `<method>` as a method for the route
- **route:** Proper route handling and FS-based paths ([d27dc1c](https://github.com/sapphiredev/plugins/commit/d27dc1c5511a95ec66a2eb972c033c393a253cb1)) ([#587](https://github.com/sapphiredev/plugins/pull/587) by @kyranet)
  - 💥 **BREAKING CHANGE:** The prefix is now suffixed with a `/` before concatenating in `RouteData`
  - 💥 **BREAKING CHANGE:** `Route` now reads defaults to filesystem-based path definition when `options.route` is not defined. Virtual pieces (those loaded with `loadPiece`) are unaffected
  - 💥 **BREAKING CHANGE:** Route parameters are now defined as `/guilds/[guild]` rather than `/guilds/:guild`

## 🐛 Bug Fixes

- **api:** Bump tldts dependency ([d418c93](https://github.com/sapphiredev/plugins/commit/d418c936b3376f74bb479ae6661ca8f5fd5e8ca3))
- Specify types from the `undici` package ([d9dd30c](https://github.com/sapphiredev/plugins/commit/d9dd30cb79365c9150b2fac776d61aaccfc97203)) ([#649](https://github.com/sapphiredev/plugins/pull/649) by @kyranet)
- **deps:** Update `@vladfrangu/async_event_emitter` ([26d4b68](https://github.com/sapphiredev/plugins/commit/26d4b68632d2797f543a240e34455371371c8766)) ([#596](https://github.com/sapphiredev/plugins/pull/596) by @kyranet)
- **deps:** Update dependency tldts to ^6.1.31 ([fc8e636](https://github.com/sapphiredev/plugins/commit/fc8e636a00cb3042e93cfde4a19920bfa10cdf2d)) ([#592](https://github.com/sapphiredev/plugins/pull/592) by @renovate[bot])
- **deps:** Update dependency tldts to ^6.1.22 ([f28d6dd](https://github.com/sapphiredev/plugins/commit/f28d6dd073e711ef0b9d76cbf82f8feea8381266)) ([#575](https://github.com/sapphiredev/plugins/pull/575) by @renovate[bot])
- **deps:** Update all non-major dependencies ([43df709](https://github.com/sapphiredev/plugins/commit/43df70954d837f7b14d62ea9123aca4b1da9ae36)) ([#574](https://github.com/sapphiredev/plugins/pull/574) by @renovate[bot])
- **deps:** Update all non-major dependencies ([7909d16](https://github.com/sapphiredev/plugins/commit/7909d16fcec9a8e5e9a3f8816c90a26fbc7d1284)) ([#573](https://github.com/sapphiredev/plugins/pull/573) by @renovate[bot])
- **deps:** Update all non-major dependencies ([ee64834](https://github.com/sapphiredev/plugins/commit/ee64834c799a5ac28b1ae172cb19f77a1887f3d4)) ([#546](https://github.com/sapphiredev/plugins/pull/546) by @renovate[bot])
- **api:** Update transitive dependencies ([a41b970](https://github.com/sapphiredev/plugins/commit/a41b9705bc24e9f6187b5d72aa101e103004e2c8))
- Update transitive dependencies ([9bcd222](https://github.com/sapphiredev/plugins/commit/9bcd2222032371c71e696f504503e78f29638cc5))

## 📝 Documentation

- **typedoc:** Exclude externals to exclude Collection and Map methods from Store ([c3e54a4](https://github.com/sapphiredev/plugins/commit/c3e54a4e412a150f57f5795ae9c2a26974cfd0a6))
- **api:** Fix tsdoc comments ([13aa0b1](https://github.com/sapphiredev/plugins/commit/13aa0b1919508305c7d3313468e77276efaee44c))

## 🚀 Features

- Update mime types ([ccf3dc1](https://github.com/sapphiredev/plugins/commit/ccf3dc1b11a46c3d6e1d091c5805be19022695d2)) ([#651](https://github.com/sapphiredev/plugins/pull/651) by @github-actions[bot])
- Update mime types ([518ac87](https://github.com/sapphiredev/plugins/commit/518ac87e9c5b8b01209a237a7e6afdef79553d5e)) ([#647](https://github.com/sapphiredev/plugins/pull/647) by @github-actions[bot])
- Update mime types ([9e3ae6f](https://github.com/sapphiredev/plugins/commit/9e3ae6fd4377aba82115cae6e0820ad233ba5024)) ([#645](https://github.com/sapphiredev/plugins/pull/645) by @github-actions[bot])
- Update mime types ([a1d7d5e](https://github.com/sapphiredev/plugins/commit/a1d7d5e13becd19b172f884fffa7f255287cf6df)) ([#641](https://github.com/sapphiredev/plugins/pull/641) by @github-actions[bot])
- Update mime types ([352f2cd](https://github.com/sapphiredev/plugins/commit/352f2cdd66d9280dfc3cba995da812e4a145153c)) ([#634](https://github.com/sapphiredev/plugins/pull/634) by @github-actions[bot])
- Update mime types ([51af5e9](https://github.com/sapphiredev/plugins/commit/51af5e9d6913fe75b61982c00d0d7072eb46d4c2)) ([#632](https://github.com/sapphiredev/plugins/pull/632) by @github-actions[bot])
- Update mime types ([fb8af18](https://github.com/sapphiredev/plugins/commit/fb8af184e7722464c076eac1d8b6ca43914bef01)) ([#620](https://github.com/sapphiredev/plugins/pull/620) by @github-actions[bot])
- Update mime types ([e37f2d0](https://github.com/sapphiredev/plugins/commit/e37f2d04de0bb118042e83755f2ba0ef7bea8641)) ([#618](https://github.com/sapphiredev/plugins/pull/618) by @github-actions[bot])
- **router:** Add FS group syntax ([7ba75bc](https://github.com/sapphiredev/plugins/commit/7ba75bc7de215db6ff67445f0b3fe8a8606c19de)) ([#615](https://github.com/sapphiredev/plugins/pull/615) by @kyranet)
- Update mime types ([677d87e](https://github.com/sapphiredev/plugins/commit/677d87e8ce9d539353d3b6f0a826e407329782b0)) ([#611](https://github.com/sapphiredev/plugins/pull/611) by @github-actions[bot])

# [@sapphire/plugin-api@6.1.1](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-api@6.1.1...@sapphire/plugin-api@6.1.1) - (2024-01-19)

## 🐛 Bug Fixes

- Update transitive undici dependency ([2a89351](https://github.com/sapphiredev/plugins/commit/2a8935124fbfd35c8ec6abfdc6cf173f94559585))
- Ensure cts file extensions in dist/cjs (#537) ([6f863f8](https://github.com/sapphiredev/plugins/commit/6f863f8187b7028cf6464dd04f197dd1be6ca1dd))

# [@sapphire/plugin-api@6.1.0](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-api@6.1.0...@sapphire/plugin-api@6.1.0) - (2024-01-06)

## 🐛 Bug Fixes

- **api:** Bump undici to v6 (we already dropped support for node 16) ([4f9601d](https://github.com/sapphiredev/plugins/commit/4f9601da4f9e60f2fd6985acf2f2187cba924018))

## 🚀 Features

- **api:** Add image function to ApiResponse (#534) ([adac80a](https://github.com/sapphiredev/plugins/commit/adac80aded5fc30aa038e016c98508207f81614a))

# [@sapphire/plugin-api@6.0.1](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-api@6.0.1...@sapphire/plugin-api@6.0.1) - (2023-12-05)

## ↩️ Revert

- "refactor(register): cleanup unnecessary side effect imports of index" ([c2af242](https://github.com/sapphiredev/plugins/commit/c2af24269956132237988d94e4d94719b2cd442c))

# [@sapphire/plugin-api@6.0.0](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-api@6.0.0...@sapphire/plugin-api@6.0.0) - (2023-12-05)

## 🏠 Refactor

- **register:** Cleanup unnecessary side effect imports of index ([dede596](https://github.com/sapphiredev/plugins/commit/dede596ae22ceec2700dd860287a1260f092b502))

## 🐛 Bug Fixes

- **api:** Expose `load*` methods on the `index` level in case register isn't used ([3fcd9a2](https://github.com/sapphiredev/plugins/commit/3fcd9a29b5007e364ff358c2c3f8fbeabea6c575))
- Update transitive dependencies ([9fd4cfa](https://github.com/sapphiredev/plugins/commit/9fd4cfae031b20044aad8ae1051ade3dd29c69dd))

## 🚀 Features

- Split ESM and CJS bundles for proper ESM and CJS loading (#512) ([d9aa006](https://github.com/sapphiredev/plugins/commit/d9aa006ff8c7f78a613dcca605d3353b992b7a46))
  - 💥 **BREAKING CHANGE:** This ensures that the plugins will properly load the
either only ESM or only CJS files. This is done by outputting
dist/cjs and dist/esm folders. This requires @sapphire/framework v5.x!

# [@sapphire/plugin-api@5.2.0](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-api@5.2.0...@sapphire/plugin-api@5.2.0) - (2023-11-16)

## 🏠 Refactor

- Support latest /framework ([0b1010d](https://github.com/sapphiredev/plugins/commit/0b1010d59933b0e22108cbafd61c619e8126967d))

## 🐛 Bug Fixes

- **api:** Update transitive tldts dependency ([9678be8](https://github.com/sapphiredev/plugins/commit/9678be82f56920cc31da6020f83461b6a06e463b))
- **api:** Update transitive dependencies ([3aa68f7](https://github.com/sapphiredev/plugins/commit/3aa68f71b6c625753d70ebee663c754d8846ebbd))

## 📝 Documentation

- **api:** Improve typedoc ([95fe74c](https://github.com/sapphiredev/plugins/commit/95fe74c44ccae490710923cb4d25d45b13ff4030))

## 🚀 Features

- Make all pieces virtual ([608c5fa](https://github.com/sapphiredev/plugins/commit/608c5facab8b3b75d8b9de1c16d00df642f842e7))

# [@sapphire/plugin-api@5.1.2](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-api@5.1.2...@sapphire/plugin-api@5.1.2) - (2023-10-23)

## 🐛 Bug Fixes

- **api:** Bump tldts and undici dependencies ([e559bee](https://github.com/sapphiredev/plugins/commit/e559beeeae4d3bc0097c428f29be083ebb0ad570))
- Set `engines.node` to `>=v18` ([885a390](https://github.com/sapphiredev/plugins/commit/885a3908d59fd00f7214ef474f2c6a3c58e95af2))
- **api:** Bump transitive undici dependency ([ea0ac5b](https://github.com/sapphiredev/plugins/commit/ea0ac5ba06b7499f0f3a3e5d92f70e282b667bfb))

# [@sapphire/plugin-api@5.1.1](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-api@5.1.0...@sapphire/plugin-api@5.1.1) - (2023-08-23)

## 🏠 Refactor

- ***:** Cleanup plugin registry files (#469) ([215b334](https://github.com/sapphiredev/plugins/commit/215b3348b30077238147dbc643769d960b856ba1))

## 🐛 Bug Fixes

- **api:** Bump transitive dependencies ([79d7230](https://github.com/sapphiredev/plugins/commit/79d7230c84ad59338197d8109e6f3ba46a5c2158))
- **api:** Update deps ([8729197](https://github.com/sapphiredev/plugins/commit/872919797bc23dec0ac9e58e4c945f7f475e20c6))

# [@sapphire/plugin-api@5.1.0](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-api@5.0.4...@sapphire/plugin-api@5.1.0) - (2023-06-13)

## 🚀 Features

- **api:** Add `text/html` and `image/x-icon` mime types (#447) ([5f5332d](https://github.com/sapphiredev/plugins/commit/5f5332d5f359826eb4b1d8240b0b85f31cdd608a))

# [@sapphire/plugin-api@5.0.4](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-api@5.0.3...@sapphire/plugin-api@5.0.4) - (2023-05-03)

## 🏠 Refactor

- **api:** Switch from psl to tldts library (#436) ([1fde242](https://github.com/sapphiredev/plugins/commit/1fde242d2108edeca57a38d40bebcb303a9c1d71))

## 🐛 Bug Fixes

- **api:** Remove const enum for verbatimModuleSyntax ([daeb694](https://github.com/sapphiredev/plugins/commit/daeb69458c7a4fac666a963ef3ea0e9e820fbc06))

## 📝 Documentation

- **api:** Fix typedoc for MiddlewareStore#sortedMiddlewares ([f0c940e](https://github.com/sapphiredev/plugins/commit/f0c940e97a55b54d800aede26177dbf8e6cd88fd))

# [@sapphire/plugin-api@5.0.3](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-api@5.0.2...@sapphire/plugin-api@5.0.3) - (2023-04-10)

## 🐛 Bug Fixes

- **api:** Explicitly import tslib ([d7921a4](https://github.com/sapphiredev/plugins/commit/d7921a4851b6197279d26e517aaf9e54a828c56c))
- **api:** Fixed compatibility with TS 5.x ([dc843af](https://github.com/sapphiredev/plugins/commit/dc843afdfc614bb7fea61452621c4a6227518ad4))

# [@sapphire/plugin-api@5.0.2](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-api@5.0.1...@sapphire/plugin-api@5.0.2) - (2023-04-02)

## 🐛 Bug Fixes

- **api:** Bump undici dependency ([2e3409c](https://github.com/sapphiredev/plugins/commit/2e3409ce9ab189b67a59d414acef2e9c15d4c12c))

# [@sapphire/plugin-api@5.0.1](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-api@5.0.0...@sapphire/plugin-api@5.0.1) - (2023-02-18)

## 🐛 Bug Fixes

- **api:** Bump undici dependency minor ([2038e60](https://github.com/sapphiredev/plugins/commit/2038e6053f42502e2642e4d85e5cf9d7a7c2bc3e))

## 📝 Documentation

- **api:** Update feature list ([c0d982b](https://github.com/sapphiredev/plugins/commit/c0d982b1a277bb5ec476f698a011b4cfff8ffea1))

# [@sapphire/plugin-api@5.0.0](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-api@4.0.1...@sapphire/plugin-api@5.0.0) - (2023-01-08)

## 🏠 Refactor

- Node-fetch to undici (#145) ([16409fd](https://github.com/sapphiredev/plugins/commit/16409fdebe4bae7d8eb22da32e639b68e6239dd1))

## 🐛 Bug Fixes

- **deps:** Update all non-major dependencies (#399) ([953d57b](https://github.com/sapphiredev/plugins/commit/953d57b06ea624baa89ba1d03131c5fb10cecbfb))
- **deps:** Update all non-major dependencies (#387) ([e31f714](https://github.com/sapphiredev/plugins/commit/e31f7140c8bb7c34086540912eb595dd04adaef5))

## 📝 Documentation

- Add @Arcadia148 as a contributor ([3a28c2f](https://github.com/sapphiredev/plugins/commit/3a28c2fc9a08be5e66026b7468a304c8b83203e6))
- Add @r-priyam as a contributor ([2d97019](https://github.com/sapphiredev/plugins/commit/2d970198717285c0f1652340ce87b1a4780179f3))
- Add @BenSegal855 as a contributor ([66553df](https://github.com/sapphiredev/plugins/commit/66553dfbb4bc7332c295277ffa4a8f720401bc89))
- Add @yuansheng1549 as a contributor ([c36ac65](https://github.com/sapphiredev/plugins/commit/c36ac65cd0a1a3e266a8a3679a58404177e0bb6b))
- Add @RealShadowNova as a contributor ([6cfa76f](https://github.com/sapphiredev/plugins/commit/6cfa76f793a16c6d11aa057e66e3fb41a9f4fb6d))

## 🚀 Features

- **deps:** Support for djs v14 (#403) ([7674782](https://github.com/sapphiredev/plugins/commit/76747829f4b3ec152ab888e57a56a138e7d527f5))

# [@sapphire/plugin-api@4.0.1](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-api@4.0.0...@sapphire/plugin-api@4.0.1) - (2022-09-18)

## 🐛 Bug Fixes

- **api:** Compatibility with latest @types/node ([8c80780](https://github.com/sapphiredev/plugins/commit/8c807807bbeb979fb4344b1c7a342d72aceee83c))

## 🧪 Testing

- Migrate to vitest ([94a182e](https://github.com/sapphiredev/plugins/commit/94a182ea0d03f79616c66983695caf64e93cb6c3))

# [@sapphire/plugin-api@4.0.0](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-api@3.2.4...@sapphire/plugin-api@4.0.0) - (2022-08-20)

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

# [@sapphire/plugin-api@3.2.4](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-api@3.2.3...@sapphire/plugin-api@3.2.4) - (2022-07-18)

## 🐛 Bug Fixes

- End response only if options route handler is not present (#325) ([058d088](https://github.com/sapphiredev/plugins/commit/058d0881d1b542e669052d816939dde16f33877b))

# [@sapphire/plugin-api@3.2.3](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-api@3.2.1...@sapphire/plugin-api@3.2.3) - (2022-07-11)

## 🏃 Performance

- **i18next:** Switch to new backend library ([21cd166](https://github.com/sapphiredev/plugins/commit/21cd1665c3bcba9c3dbc9711e9d57153ad768276))

## 🐛 Bug Fixes

- Manually set version ([117d5a6](https://github.com/sapphiredev/plugins/commit/117d5a6256af7e01b420b28f95abec36f3feb0af))

## 📝 Documentation

- Update typedoc setup ([5c855bd](https://github.com/sapphiredev/plugins/commit/5c855bd8341f155a41c9b85738541f1f47ac837a))

## [3.2.1](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-api@3.2.0...@sapphire/plugin-api@3.2.1) (2022-04-01)

### Bug Fixes

-   **deps:** update all non-major dependencies ([2377eb9](https://github.com/sapphiredev/plugins/commit/2377eb90c7a5efb65e2be242d492f06bd4841a2e))

# [3.2.0](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-api@3.1.4...@sapphire/plugin-api@3.2.0) (2022-03-06)

### Bug Fixes

-   **deps:** update all non-major dependencies ([2016134](https://github.com/sapphiredev/plugins/commit/201613418babe93748e74064cf66d4ea0582725c))

### Features

-   allow module: NodeNext ([#251](https://github.com/sapphiredev/plugins/issues/251)) ([31bab09](https://github.com/sapphiredev/plugins/commit/31bab09834ebc1bc646e4a2849dbd24c65f08c0e))
-   **api:** Add automatically connect option ([#250](https://github.com/sapphiredev/plugins/issues/250)) ([6bf3626](https://github.com/sapphiredev/plugins/commit/6bf3626364264a6450a4d97e7dc3f6ada538269a))

## [3.1.4](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-api@3.1.3...@sapphire/plugin-api@3.1.4) (2022-01-23)

### Bug Fixes

-   **deps:** update dependency node-fetch to v2.6.7 [security] ([743c9a6](https://github.com/sapphiredev/plugins/commit/743c9a606cd8d03cc91666cb86953ba302ccfb65))

## [3.1.3](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-api@3.1.2...@sapphire/plugin-api@3.1.3) (2022-01-06)

### Bug Fixes

-   **api:** fixed return of `response.json` and `response.text` to actually return `void` ([add3ce5](https://github.com/sapphiredev/plugins/commit/add3ce55b2d49f9a605691d78baed13ef27844c7))

## [3.1.2](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-api@3.1.1...@sapphire/plugin-api@3.1.2) (2021-12-21)

### Bug Fixes

-   **routes:** ensure that unmatched routes return 404 instead of 200 ([#193](https://github.com/sapphiredev/plugins/issues/193)) ([19e1be9](https://github.com/sapphiredev/plugins/commit/19e1be98d9c8ef4493fd76a517d33b3bf7577ba8))

## [3.1.1](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-api@3.1.0...@sapphire/plugin-api@3.1.1) (2021-12-06)

**Note:** Version bump only for package @sapphire/plugin-api

# [3.1.0](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-api@3.0.2...@sapphire/plugin-api@3.1.0) (2021-11-21)

### Bug Fixes

-   **deps:** update all non-major dependencies ([4c796f8](https://github.com/sapphiredev/plugins/commit/4c796f8ea424c0fe37cda949afac0d5900cc2ff2))

### Features

-   expose and use namespaces for options, context, etc ([#176](https://github.com/sapphiredev/plugins/issues/176)) ([33452da](https://github.com/sapphiredev/plugins/commit/33452da808d91313a5d3bf680e11b5208ac67442))

## [3.0.2](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-api@3.0.1...@sapphire/plugin-api@3.0.2) (2021-11-06)

**Note:** Version bump only for package @sapphire/plugin-api

## [3.0.1](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-api@3.0.0...@sapphire/plugin-api@3.0.1) (2021-10-17)

### Bug Fixes

-   allow more node & npm versions in engines field ([ce5b12f](https://github.com/sapphiredev/plugins/commit/ce5b12f8142297bceda49b85574a95a3cf9112ab))

# [3.0.0](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-api@2.2.0...@sapphire/plugin-api@3.0.0) (2021-10-16)

### Bug Fixes

-   **api:** remove @sapphire/pieces from install instructions ([44e514c](https://github.com/sapphiredev/plugins/commit/44e514c7a755b13b316e875d3be7ed055bd33baf))
-   **api:** update to Discord API v9 ([#124](https://github.com/sapphiredev/plugins/issues/124)) ([b194fe6](https://github.com/sapphiredev/plugins/commit/b194fe613ec04f327a2aa5ae8d051c400ed105c8))
-   **plugin-api:** resolved augmentation bugs ([#102](https://github.com/sapphiredev/plugins/issues/102)) ([e21fd4a](https://github.com/sapphiredev/plugins/commit/e21fd4a6b0b36b2351c388b57d9c454734627a8b))

### Code Refactoring

-   **plugin-api:** updated for discord.js@13 and framework@2 ([856cd6f](https://github.com/sapphiredev/plugins/commit/856cd6f6f409ebb7fc156a64b0f7503154d2a38e))

### Features

-   **i18next:** update i18next dependency ([#129](https://github.com/sapphiredev/plugins/issues/129)) ([96519de](https://github.com/sapphiredev/plugins/commit/96519de5de253db390ed9a76ed073ffe1eabd187))
-   rename `Awaited` to `Awaitable` ([#152](https://github.com/sapphiredev/plugins/issues/152)) ([e8aabab](https://github.com/sapphiredev/plugins/commit/e8aababca760125fd3752a807ef26da16103dd65))

### BREAKING CHANGES

-   **i18next:** i18next has been updated to v21.0.1. Please also seee the breaking changes for i18next [here](https://github.com/i18next/i18next/blob/master/CHANGELOG.md#2100) and their migration guide [here](https://www.i18next.com/misc/migration-guide#v-20-x-x-to-v-21-0-0)

-   chore: activate renovate
-   **plugin-api:** Increase `@sapphire/framework` requirement to v2.

# [2.2.0](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-api@2.1.4...@sapphire/plugin-api@2.2.0) (2021-06-19)

### Bug Fixes

-   **api:** specify package side effects ([2b50666](https://github.com/sapphiredev/plugins/commit/2b506666031af0f7586d5cd98f35957ba5dc8620))
-   **doc:** change `[@link](https://github.com/link)` to `[@linkplain](https://github.com/linkplain)` for support in VSCode IntelliSense ([e448947](https://github.com/sapphiredev/plugins/commit/e44894769aae533668de7d6f2559cc4f7b58041d))
-   **docs:** update-tsdoc-for-vscode-may-2021 ([#92](https://github.com/sapphiredev/plugins/issues/92)) ([ac52451](https://github.com/sapphiredev/plugins/commit/ac52451f3cf5560a8b93931411cc04497c00d4a9))
-   remove peer deps, update dev deps, update READMEs ([#91](https://github.com/sapphiredev/plugins/issues/91)) ([3489b1d](https://github.com/sapphiredev/plugins/commit/3489b1dc1e8a7c64c255595b3d441cd0b5bac936))

### Features

-   **api:** expand MimeTypes enum with more common mime types ([b824cc6](https://github.com/sapphiredev/plugins/commit/b824cc60ea9c160b6c057dfb48ad0f9f416c2a24))

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
