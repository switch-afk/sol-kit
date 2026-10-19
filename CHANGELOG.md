# Changelog

All notable changes to sol-kit are listed here.

## [Unreleased]

## [0.2.0] - 2026-10-19

### Added

- Three more tools: `bench` (sol-rpc-bench), `mint` (mint-check) and `wallet` (sol-wallet-profile). `sol-kit list` now shows 13 tools.

## [0.1.0] - 2026-10-19

### Added

- `sol-kit list` shows the 10 available tools with their short aliases.
- `sol-kit <tool> [args]` runs a tool by alias or full name through `npx` and passes the arguments and exit code through.
- Typo help: an unknown command prints a `Did you mean` hint when an alias, tool name or built-in command is close.
- `--help` and `--version`.
- Runs on Windows, macOS and Linux with no dependencies.