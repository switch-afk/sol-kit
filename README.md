# sol-kit

One command for a set of small Solana CLI tools.

```
npx @sybimeta/sol-kit --help
npx @sybimeta/sol-kit list
npx @sybimeta/sol-kit tx <signature>
```

To get the shorter `sol-kit` command, install it globally:

```
npm install -g @sybimeta/sol-kit
sol-kit list
```

## Tools

`sol-kit list` shows every tool with its short alias:

| Alias | Tool |
| --- | --- |
| tx | sol-tx-explain |
| watch | sol-tx-watch |
| prog | sol-program-info |
| fee | sol-priority-fee |
| rent | sol-rent-reclaim |
| idl | sol-idl-peek |
| pda | sol-pda |
| epoch | sol-epoch |
| stake | sol-stake-info |
| holders | sol-holders |
| bench | sol-rpc-bench |
| mint | mint-check |
| wallet | sol-wallet-profile |

## Running a tool

Call a tool by alias or by full name. Everything after the tool is passed straight to it:

```
npx @sybimeta/sol-kit epoch
npx @sybimeta/sol-kit sol-holders <mint> --limit 10
```

sol-kit runs the tool with `npx`, so the first run of each tool downloads it and needs a network connection. The tool's exit code becomes sol-kit's exit code.

If you mistype a command, sol-kit suggests the closest one.

## Requirements

Node.js 18 or newer with npm. No dependencies.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). Changes are listed in [CHANGELOG.md](CHANGELOG.md).

## License

MIT