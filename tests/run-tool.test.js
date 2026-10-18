'use strict';

const test = require('node:test');
const assert = require('node:assert');
const { buildCommand, quoteWin, runTool } = require('../src/run-tool');
const { fakeSpawn } = require('./helpers/fake-spawn');

const tool = { name: 'sol-pda', alias: 'pda', description: 'x' };

test('posix command runs npx directly without a shell', () => {
  const c = buildCommand(tool, ['a', 'b'], 'linux', {});
  assert.strictEqual(c.command, 'npx');
  assert.deepStrictEqual(c.args, ['--yes', 'sol-pda', 'a', 'b']);
  assert.strictEqual(c.options.shell, undefined);
});

test('windows command runs cmd.exe with verbatim arguments and no shell option', () => {
  const c = buildCommand(tool, ['--seed', 'hello world'], 'win32', {});
  assert.strictEqual(c.command, 'cmd.exe');
  assert.deepStrictEqual(c.args.slice(0, 3), ['/d', '/s', '/c']);
  assert.strictEqual(c.args[3], '"npx --yes sol-pda --seed "hello world""');
  assert.strictEqual(c.options.shell, undefined);
  assert.strictEqual(c.options.windowsVerbatimArguments, true);
  assert.strictEqual(c.options.stdio, 'inherit');
});

test('windows command uses ComSpec when it is set', () => {
  const comspec = 'C:\\Windows\\System32\\cmd.exe';
  const c = buildCommand(tool, [], 'win32', { ComSpec: comspec });
  assert.strictEqual(c.command, comspec);
});

test('quoteWin leaves safe arguments alone and quotes empty ones', () => {
  assert.strictEqual(quoteWin('--rpc=https://example.com/x'), '--rpc=https://example.com/x');
  assert.strictEqual(quoteWin(''), '""');
  assert.strictEqual(quoteWin('say "hi"'), '"say \\"hi\\""');
});

test('a spawn that throws gives exit code 1', async () => {
  let err = '';
  const code = await runTool(tool, [], {
    spawn: () => { throw new Error('boom'); },
    stderr: { write: (s) => { err += s; } },
    platform: 'linux',
  });
  assert.strictEqual(code, 1);
  assert.match(err, /boom/);
});

test('a child closed without an exit code gives exit code 1', async () => {
  const code = await runTool(tool, [], {
    spawn: fakeSpawn({ code: null }),
    platform: 'linux',
  });
  assert.strictEqual(code, 1);
});