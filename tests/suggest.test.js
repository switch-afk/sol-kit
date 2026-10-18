'use strict';

const test = require('node:test');
const assert = require('node:assert');
const { suggest, distance } = require('../src/suggest');

test('distance counts edits and treats a swap as one edit', () => {
  assert.strictEqual(distance('abc', 'abc'), 0);
  assert.strictEqual(distance('tx', 'xt'), 1);
  assert.strictEqual(distance('kitten', 'sitting'), 3);
});

test('suggest returns the closest candidate', () => {
  assert.strictEqual(suggest('epcoh', ['list', 'epoch', 'pda']), 'epoch');
  assert.strictEqual(suggest('tz', ['tx', 'pda']), 'tx');
});

test('suggest returns null when nothing is close', () => {
  assert.strictEqual(suggest('banana', ['list', 'epoch', 'pda', 'tx']), null);
  assert.strictEqual(suggest('', ['tx', 'pda']), null);
});

test('suggest ignores case in the input', () => {
  assert.strictEqual(suggest('EPOCH', ['epoch']), 'epoch');
});

test('suggest prefers the candidate with the lowest distance', () => {
  assert.strictEqual(suggest('holdres', ['holdresxx', 'holders']), 'holders');
});