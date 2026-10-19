'use strict';

const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');
const pkg = require('../package.json');

const changelog = fs.readFileSync(path.join(__dirname, '..', 'CHANGELOG.md'), 'utf8');

test('the changelog has an entry for the current package version', () => {
  assert.ok(
    changelog.includes(`## [${pkg.version}] - `),
    `CHANGELOG.md has no entry for ${pkg.version}`
  );
});

test('the newest changelog entry is the current package version', () => {
  const match = changelog.match(/^## \[(\d+\.\d+\.\d+)\]/m);
  assert.ok(match, 'CHANGELOG.md has no released version');
  assert.strictEqual(
    match[1],
    pkg.version,
    'package.json version and the newest CHANGELOG.md entry differ'
  );
});