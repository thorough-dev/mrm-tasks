const {json, packageJson, install} = require('mrm-core');

const devPackages = ['@babel/core', '@babel/preset-env'];

function task() {
  const pkg = packageJson();

  // Dependencies
  install(devPackages);

  // Create basic .babelrc file.
  const babelrc = json('.babelrc');

  babelrc.merge({
    presets: ['@babel/preset-env'],
  });

  babelrc.save();
}

task.description = 'Adds Babel to the project.';

module.exports = task;
