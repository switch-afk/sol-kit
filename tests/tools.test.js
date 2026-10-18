'use strict';

const test = require('node:test');
const assert = require('node:assert');
const { TOOLS, findTool } = require('../src/tools');

test('registry has the 10 tools', () => {
  assert.strictEqual(TOOLS.length, 10);
});

test('every tool has a sol- name, a lowercase alias and a description', () => {
  for (const tool of TOOLS) {
    assert.match(tool.name, /^sol-[a-z-]+$/);
    assert.match(tool.alias, /^[a-z]{2,10}$/);
    assert.ok(tool.description.length > 0);
    assert.ok(!tool.description.endsWith('.'), `${tool.name} description ends with a period`);
  }
});

test('names and aliases are unique', () => {
  const names = TOOLS.map((t) => t.name);
  const aliases = TOOLS.map((t) => t.alias);
  assert.strictEqual(new Set(names).size, names.length);
  assert.strictEqual(new Set(aliases).size, aliases.length);
});

test('aliases do not clash with built-in commands', () => {
  const reserved = ['list', 'help'];
  for (const tool of TOOLS) {
    assert.ok(!reserved.includes(tool.alias), `${tool.alias} is reserved`);
  }
});

test('findTool matches by alias and by full name', () => {
  assert.strictEqual(findTool('tx').name, 'sol-tx-explain');
  assert.strictEqual(findTool('sol-holders').alias, 'holders');
});

test('findTool returns null for unknown names', () => {
  assert.strictEqual(findTool('nope'), null);
  assert.strictEqual(findTool(undefined), null);
});