const { json, packageJson, install } = require('mrm-core');

const devPackages = ['typescript'];

function task() {
  const pkg = packageJson();
  const usesBabel = pkg.get('devDependencies.@babel/core') !== undefined;

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
      outDir: 'dist',
      ...(usesBabel && { noEmit: true })
    }
  });

  // package.json
  pkg.appendScript('typecheck', `tsc --noEmit`);
  pkg.appendScript('build:types', `tsx --emitDeclarationOnly`);

  if (usesBabel) {
    devPackages.push('@babel/preset-typescript');
    devPackages.push('@babel/plugin-proposal-class-properties');
    devPackages.push('@babel/plugin-proposal-object-rest-spread');

    json('.babelrc')
      .merge({
        presets: ['@babel/typescript'],
        plugins: [
          '@babel/proposal-class-properties',
          '@babel/proposal-object-rest-spread'
        ]
      })
      .save();
  }

  tsconfig.save();
  pkg.save();

  // Dependencies
  install(devPackages);
}

task.description =
  'Adds TypeScript, using Babel compiler if the project uses Babel.';

module.exports = task;
