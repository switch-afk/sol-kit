'use strict';

const { spawn: nodeSpawn } = require('node:child_process');

const SAFE_WIN_ARG = /^[A-Za-z0-9_\-./:=@,]+$/;

function quoteWin(arg) {
  if (SAFE_WIN_ARG.test(arg)) return arg;
  return `"${arg.replace(/"/g, '\\"')}"`;
}

function buildCommand(tool, args, platform, env) {
  const npxArgs = ['--yes', tool.name, ...args];
  if (platform === 'win32') {
    const comspec = (env && env.ComSpec) || 'cmd.exe';
    const line = ['npx', ...npxArgs].map(quoteWin).join(' ');
    return {
      command: comspec,
      args: ['/d', '/s', '/c', `"${line}"`],
      options: { stdio: 'inherit', windowsVerbatimArguments: true },
    };
  }
  return { command: 'npx', args: npxArgs, options: { stdio: 'inherit' } };
}

function runTool(tool, args, io) {
  const spawn = (io && io.spawn) || nodeSpawn;
  const platform = (io && io.platform) || process.platform;
  const env = (io && io.env) || process.env;
  const err = (io && io.stderr) || process.stderr;
  const { command, args: cmdArgs, options } = buildCommand(tool, args, platform, env);

  return new Promise((resolve) => {
    let child;
    try {
      child = spawn(command, cmdArgs, options);
    } catch (e) {
      err.write(`sol-kit: could not start npx (${e.message})\n`);
      resolve(1);
      return;
    }
    child.on('error', (e) => {
      err.write(`sol-kit: could not start npx (${e.message}). Is Node.js with npm installed?\n`);
      resolve(1);
    });
    child.on('close', (code) => {
      resolve(code === null ? 1 : code);
    });
  });
}

module.exports = { runTool, buildCommand, quoteWin };