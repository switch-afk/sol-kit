'use strict';

const pkg = require('../package.json');
const { TOOLS } = require('./tools');

const HELP = `sol-kit v${pkg.version}
One command for a set of small Solana CLI tools.

Usage:
  sol-kit <command> [options]

Commands:
  list             List the available tools

Options:
  -h, --help       Show this help
  -v, --version    Show the version
`;

function formatList(tools) {
  const aliasWidth = Math.max(...tools.map((t) => t.alias.length));
  const nameWidth = Math.max(...tools.map((t) => t.name.length));
  const lines = tools.map(
    (t) =>
      `  ${t.alias.padEnd(aliasWidth)}  ${t.name.padEnd(nameWidth)}  ${t.description}`
  );
  return `Available tools:\n\n${lines.join('\n')}\n`;
}

function run(argv, io) {
  const out = (io && io.stdout) || process.stdout;
  const err = (io && io.stderr) || process.stderr;
  const first = argv[0];

  if (first === undefined || first === '-h' || first === '--help' || first === 'help') {
    out.write(HELP);
    return 0;
  }

  if (first === '-v' || first === '--version') {
    out.write(`${pkg.version}\n`);
    return 0;
  }

  if (first === 'list') {
    out.write(formatList(TOOLS));
    return 0;
  }

  err.write(`sol-kit: unknown command "${first}"\n`);
  err.write('Run "sol-kit --help" to see what is available.\n');
  return 1;
}

module.exports = { run, HELP, formatList };