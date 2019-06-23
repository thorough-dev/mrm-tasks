const {json, packageJson, install} = require('mrm-core');

const devPackages = ['typescript'];

function task() {
  const pkg = packageJson();
  const usesBabel = pkg.get('devDependencies')['@babel/core'] !== undefined;

  // tsconfig.json
  const tsconfig = json('tsconfig.json');

  tsconfig.merge({
    compilerOptions: {
      allowSyntheticDefaultImports: true,
      esModuleInterop: true,
      target: 'es6',
      moduleResolution: 'node',
      strict: true,
      experimentalDecorators: true,
      lib: ['esnext'],
      ...(usesBabel && {noEmit: true}),
    },
  });

  // package.json
  pkg.appendScript('pretest', `tsc${usesBabel ? ' --noEmit' : ''}`);

  if (usesBabel) {
    devPackages.push('@babel/preset-typescript');
    json('.babelrc')
      .merge({presets: ['@babel/preset-typescript']})
      .save();
  }

  tsconfig.save();
  pkg.save();

  // Dependencies
  install(devPackages);
}

task.description =
  'Adds TypeScript, using Babel compiler if the project uses Babel';

module.exports = task;
