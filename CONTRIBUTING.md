# Contributing to sol-kit

Thanks for helping. sol-kit is a thin hub: it lists a set of small Solana CLI tools and runs them through `npx`. Please keep it small.

## Setup

You need Node.js 18 or newer.

```
git clone https://github.com/switch-afk/sol-kit.git
cd sol-kit
npm test
```

sol-kit has no dependencies. Please do not add any.

## Tests

- Run `npm test` (it uses the built-in `node --test`).
- Every change needs a test. CI runs on Node 18, 20 and 22.
- Tests never start a real `npx`. They pass a fake `spawn` (see `tests/helpers/fake-spawn.js`).

## Adding a tool

Add an entry to `src/tools.js`:

- `name`: the npm package name. It must already be published on npm.
- `alias`: a short lowercase alias. It must be unique and cannot be `list` or `help`.
- `description`: one line that starts with a verb and has no trailing period.

Then update the tool table in `README.md` and the tool count in `tests/tools.test.js`.

## Pull requests

- One focused change per PR, branched from `main`.
- Add a line under `Unreleased` in `CHANGELOG.md`.
- CI must be green. PRs are squash merged.

## Bugs

Open an issue with the command you ran, what you expected, what happened, your Node version and your operating system.