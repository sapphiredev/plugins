# Changelog

All notable changes to this project will be documented in this file.

# [@sapphire/plugin-utilities-store@2.0.1](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-utilities-store@2.0.1...@sapphire/plugin-utilities-store@2.0.1) - (2023-12-05)

## ↩️ Revert

- "refactor(register): cleanup unnecessary side effect imports of index" ([c2af242](https://github.com/sapphiredev/plugins/commit/c2af24269956132237988d94e4d94719b2cd442c))

# [@sapphire/plugin-utilities-store@2.0.0](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-utilities-store@2.0.0...@sapphire/plugin-utilities-store@2.0.0) - (2023-12-05)

## 🏠 Refactor

- **register:** Cleanup unnecessary side effect imports of index ([dede596](https://github.com/sapphiredev/plugins/commit/dede596ae22ceec2700dd860287a1260f092b502))

## 🚀 Features

- Split ESM and CJS bundles for proper ESM and CJS loading (#512) ([d9aa006](https://github.com/sapphiredev/plugins/commit/d9aa006ff8c7f78a613dcca605d3353b992b7a46))
  - 💥 **BREAKING CHANGE:** This ensures that the plugins will properly load the
either only ESM or only CJS files. This is done by outputting
dist/cjs and dist/esm folders. This requires @sapphire/framework v5.x!

# [@sapphire/plugin-utilities-store@1.0.3](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-utilities-store@1.0.3...@sapphire/plugin-utilities-store@1.0.3) - (2023-11-16)

## 🏠 Refactor

- Support latest /framework ([3ac929f](https://github.com/sapphiredev/plugins/commit/3ac929f1c38c2edbf00fa68d5ffef055d697e602))
- Remove useless `registerPath` call ([8cfecaf](https://github.com/sapphiredev/plugins/commit/8cfecaf51e0fbf9f92c9f63415a8c10889b11b70))

## 🐛 Bug Fixes

- Set `engines.node` to `>=v18` ([885a390](https://github.com/sapphiredev/plugins/commit/885a3908d59fd00f7214ef474f2c6a3c58e95af2))

# [@sapphire/plugin-utilities-store@1.0.2](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-utilities-store@1.0.1...@sapphire/plugin-utilities-store@1.0.2) - (2023-08-23)

## 🏠 Refactor

- ***:** Cleanup plugin registry files (#469) ([215b334](https://github.com/sapphiredev/plugins/commit/215b3348b30077238147dbc643769d960b856ba1))

# [@sapphire/plugin-utilities-store@1.0.1](https://github.com/sapphiredev/plugins/compare/@sapphire/plugin-utilities-store@1.0.0...@sapphire/plugin-utilities-store@1.0.1) - (2023-04-10)

## 🐛 Bug Fixes

- **utilities-store:** Fixed compatibility with TS 5.x ([b5177b8](https://github.com/sapphiredev/plugins/commit/b5177b86da803deefbdd2421fd4bf50fb97211e1))

# [@sapphire/plugin-utilities-store@1.0.0](https://github.com/sapphiredev/plugins/tree/@sapphire/plugin-utilities-store@1.0.0) - (2023-02-18)

## 🚀 Features

- Add utilities-store plugin (#415) ([7766f29](https://github.com/sapphiredev/plugins/commit/7766f2997e7d0f52db30d2184c944076060f7033))

