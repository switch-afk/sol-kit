'use strict';

const TOOLS = [
  {
    name: 'sol-tx-explain',
    alias: 'tx',
    description: 'Explain a transaction in plain English from its signature',
  },
  {
    name: 'sol-tx-watch',
    alias: 'watch',
    description: "Stream a wallet's new transactions live, each explained in plain English",
  },
  {
    name: 'sol-program-info',
    alias: 'prog',
    description: 'Show whether a program is upgradeable, its authority, last deploy and size',
  },
  {
    name: 'sol-priority-fee',
    alias: 'fee',
    description: 'Show low, medium and high priority fees based on recent transactions',
  },
  {
    name: 'sol-rent-reclaim',
    alias: 'rent',
    description: "Find a wallet's empty token accounts and the SOL rent you can reclaim",
  },
  {
    name: 'sol-idl-peek',
    alias: 'idl',
    description: "Read a program's on-chain Anchor IDL and print its instructions, errors, types",
  },
  {
    name: 'sol-pda',
    alias: 'pda',
    description: 'Derive and verify program derived addresses from seeds',
  },
  {
    name: 'sol-epoch',
    alias: 'epoch',
    description: 'Show the current epoch, its progress and the estimated time left',
  },
  {
    name: 'sol-stake-info',
    alias: 'stake',
    description: "Show a stake account's status and lockup, or list a wallet's stake accounts",
  },
  {
    name: 'sol-holders',
    alias: 'holders',
    description: 'Show the largest holders of a token mint with their share of supply',
  },
  {
    name: 'sol-rpc-bench',
    alias: 'bench',
    description: 'Benchmark RPC endpoints for latency, slot lag and reliability',
  },
  {
    name: 'mint-check',
    alias: 'mint',
    description: 'Check a token mint for red flags: authorities, supply and holder concentration',
  },
  {
    name: 'sol-wallet-profile',
    alias: 'wallet',
    description: "Show a wallet's balance, owner, recent activity and token holdings",
  },
];

function findTool(query) {
  return TOOLS.find((t) => t.alias === query || t.name === query) || null;
}

module.exports = { TOOLS, findTool };