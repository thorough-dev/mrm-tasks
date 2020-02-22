const path = require('path');
const { json, packageJson, install } = require('mrm-core');
const { getExtsFromCommand } = require('mrm-core');
const prettierConfig = require('@thorough/dev-configs/prettier.config');

// This file is adapted from the default `prettier` task available from MRM itself.

const defaultPattern = '**/*.{jsx,ts,tsx,css,md}';

function task(config) {
  const packages = ['prettier'];
  const pkg = packageJson();

  const { prettierPattern } = config
    .defaults({ prettierPattern: defaultPattern })
    .values();

  // .prettierrc
  json('.prettierrc')
    .merge(prettierConfig)
    .save();

  // Keep custom pattern
  let pattern = prettierPattern;
  const formatScript = pkg.getScript('format');
  if (formatScript) {
    const exts = getExtsFromCommand(formatScript);
    if (exts) {
      pattern = `**/*.{${exts}}`;
    }
  }

  pkg
    // Add format script
    // Double quotes are essential to support Windows:
    // https://github.com/prettier/prettier/issues/4086#issuecomment-370228517
    .setScript('format', `prettier --loglevel warn --write "${pattern}"`)
    // Add pretest script
    .appendScript('posttest', 'npm run format')
    .save();

  // Dependencies
  install(packages);
}

task.description = 'Adds Prettier';
module.exports = task;
