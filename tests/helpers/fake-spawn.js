'use strict';

const { EventEmitter } = require('node:events');

function fakeSpawn(result) {
  const calls = [];
  const fn = (command, args, options) => {
    calls.push({ command, args, options });
    const child = new EventEmitter();
    process.nextTick(() => {
      if (result.error) child.emit('error', result.error);
      else child.emit('close', result.code === undefined ? 0 : result.code);
    });
    return child;
  };
  fn.calls = calls;
  return fn;
}

module.exports = { fakeSpawn };