<h1 align="center">🏦 OSx Vault Plugin</h1>

<p align="center">
  <img src="./assets/banner1.png" alt="repo-banner" />
  <br>
  <i> A ERC4626 vault that uses an Aragon DAO for storage and management of the underlying asset.</i>
  <br>
</p>

<p align="center">
  <a href="https://github.com/pythonpete32/erc4626-osx-plugin/actions"><img src="https://github.com/pythonpete32/erc4626-osx-plugin/actions/workflows/test.yml/badge.svg" alt="Github Actions"></a>
  <a href="https://getfoundry.sh/"><img src="https://img.shields.io/badge/Built%20with-Foundry-FFDB1C.svg" alt="Foundry"></a>
  <a href="https://opensource.org/license/agpl-v3/"><img src="https://img.shields.io/badge/License-AGPL-blue.svg" alt="License: AGPL-3-0"></a>
  <a href="https://use-aragon.daobox.app"><img src="https://img.shields.io/badge/Docs-DAOBox-blue.svg" alt="Docs"></a>
  <a href="https://discord.gg/d5nCgVt4kE"><img alt="Discord" src="https://img.shields.io/discord/1019114018545352734"></a>

</p>

<hr>

[gha]: https://github.com/pythonpete32/erc4626-osx-plugin/actions
[gha-badge]: https://github.com/pythonpete32/erc4626-osx-plugin/actions/workflows/ci.yml/badge.svg
[foundry]: https://getfoundry.sh
[foundry-badge]: https://img.shields.io/badge/Built%20with-Foundry-FFDB1C.svg
[license]: https://opensource.org/license/agpl-v3/
[license-badge]: https://img.shields.io/badge/License-AGPL-blue.svg

<br />

## Quick Start

```sh
$ git clone git@github.com:pythonpete32/erc4626-osx-plugin.git
$ pnpm install
$ pnpm setup
$ pnpm dev
```

<br />

```markdown
.
├── packages/contracts
│ ├── src
│ ├── deploy
│ ├── test
│ ├── utils
│ ├── ...
│ └── package.json
│
├── packages/subgraph
│ ├── src
│ ├── scripts
│ ├── manifest
│ ├── tests
│ ├── utils
│ ├── ...
│ └── package.json
│
├── packages/js-client
│ ├── src
│ ├── test
│ ├── ...
│ └── package.json
│
├── packages/app
│ ├── src
│ ├── test
│ ├── ...
│ └── package.json
├── ...
└── package.json
```

## License

This project is licensed under AGPL-3.0-or-later.
