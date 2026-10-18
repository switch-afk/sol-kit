'use strict';

const test = require('node:test');
const assert = require('node:assert');
const { run } = require('../src/cli');
const { TOOLS } = require('../src/tools');
const { fakeSpawn } = require('./helpers/fake-spawn');
const pkg = require('../package.json');

async function capture(args, extra) {
  let out = '';
  let err = '';
  const code = await run(args, {
    stdout: { write: (s) => { out += s; } },
    stderr: { write: (s) => { err += s; } },
    ...extra,
  });
  return { code, out, err };
}

test('no arguments shows help', async () => {
  const r = await capture([]);
  assert.strictEqual(r.code, 0);
  assert.match(r.out, /Usage:/);
});

test('--help shows help', async () => {
  const r = await capture(['--help']);
  assert.strictEqual(r.code, 0);
  assert.match(r.out, /sol-kit <command>/);
});

test('help command shows help', async () => {
  const r = await capture(['help']);
  assert.strictEqual(r.code, 0);
  assert.match(r.out, /Commands:/);
});

test('help mentions the list command and running a tool', async () => {
  const r = await capture(['--help']);
  assert.match(r.out, /list\s+List the available tools/);
  assert.match(r.out, /sol-kit <tool>/);
});

test('--version prints the package version', async () => {
  const r = await capture(['--version']);
  assert.strictEqual(r.code, 0);
  assert.strictEqual(r.out.trim(), pkg.version);
});

test('-v prints the package version', async () => {
  const r = await capture(['-v']);
  assert.strictEqual(r.code, 0);
  assert.strictEqual(r.out.trim(), pkg.version);
});

test('list prints every tool with its alias and description', async () => {
  const r = await capture(['list']);
  assert.strictEqual(r.code, 0);
  assert.match(r.out, /Available tools:/);
  for (const tool of TOOLS) {
    assert.ok(r.out.includes(tool.name), `missing ${tool.name}`);
    assert.ok(r.out.includes(tool.description), `missing description for ${tool.name}`);
  }
  assert.strictEqual(r.err, '');
});

test('a tool alias runs the tool through npx with the extra arguments', async () => {
  const spawn = fakeSpawn({ code: 0 });
  const r = await capture(['tx', 'SIGNATURE', '--json'], { spawn, platform: 'linux' });
  assert.strictEqual(r.code, 0);
  assert.strictEqual(spawn.calls.length, 1);
  assert.strictEqual(spawn.calls[0].command, 'npx');
  assert.deepStrictEqual(spawn.calls[0].args, ['--yes', 'sol-tx-explain', 'SIGNATURE', '--json']);
  assert.strictEqual(spawn.calls[0].options.stdio, 'inherit');
});

test('the full tool name works too', async () => {
  const spawn = fakeSpawn({ code: 0 });
  await capture(['sol-epoch'], { spawn, platform: 'linux' });
  assert.deepStrictEqual(spawn.calls[0].args, ['--yes', 'sol-epoch']);
});

test('the exit code of the tool is passed through', async () => {
  const spawn = fakeSpawn({ code: 3 });
  const r = await capture(['pda'], { spawn, platform: 'linux' });
  assert.strictEqual(r.code, 3);
});

test('a missing npx gives a clear error and exit code 1', async () => {
  const spawn = fakeSpawn({ error: new Error('spawn npx ENOENT') });
  const r = await capture(['fee'], { spawn, platform: 'linux' });
  assert.strictEqual(r.code, 1);
  assert.match(r.err, /could not start npx/);
});

test('unknown command exits 1 with a hint on stderr', async () => {
  const spawn = fakeSpawn({ code: 0 });
  const r = await capture(['nope'], { spawn });
  assert.strictEqual(r.code, 1);
  assert.match(r.err, /unknown command "nope"/);
  assert.match(r.err, /--help/);
  assert.strictEqual(r.out, '');
  assert.strictEqual(spawn.calls.length, 0);
});