'use strict';

const test = require('node:test');
const assert = require('node:assert');
const { run } = require('../src/cli');
const pkg = require('../package.json');

function capture(args) {
  let out = '';
  let err = '';
  const code = run(args, {
    stdout: { write: (s) => { out += s; } },
    stderr: { write: (s) => { err += s; } },
  });
  return { code, out, err };
}

test('no arguments shows help', () => {
  const r = capture([]);
  assert.strictEqual(r.code, 0);
  assert.match(r.out, /Usage:/);
});

test('--help shows help', () => {
  const r = capture(['--help']);
  assert.strictEqual(r.code, 0);
  assert.match(r.out, /sol-kit <command>/);
});

test('help command shows help', () => {
  const r = capture(['help']);
  assert.strictEqual(r.code, 0);
  assert.match(r.out, /Commands:/);
});

test('--version prints the package version', () => {
  const r = capture(['--version']);
  assert.strictEqual(r.code, 0);
  assert.strictEqual(r.out.trim(), pkg.version);
});

test('-v prints the package version', () => {
  const r = capture(['-v']);
  assert.strictEqual(r.code, 0);
  assert.strictEqual(r.out.trim(), pkg.version);
});

test('unknown command exits 1 with a hint on stderr', () => {
  const r = capture(['nope']);
  assert.strictEqual(r.code, 1);
  assert.match(r.err, /unknown command "nope"/);
  assert.match(r.err, /--help/);
  assert.strictEqual(r.out, '');
});