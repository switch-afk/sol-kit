# sol-kit

One command for a set of small Solana CLI tools.

```
npx sol-kit --help
npx sol-kit list
npx sol-kit tx <signature>
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

## Running a tool

Call a tool by alias or by full name. Everything after the tool is passed straight to it:

```
npx sol-kit epoch
npx sol-kit sol-holders <mint> --limit 10
```

sol-kit runs the tool with `npx`, so the first run of each tool downloads it and needs a network connection. The tool's exit code becomes sol-kit's exit code.

## Requirements

Node.js 18 or newer with npm. No dependencies.

## License

MIT