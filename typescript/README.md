# `typescript`

This task adds TypeScript support to your project by adding the latest `typescript` package from
`npm` to your `devDependencies` and adding a basic `tsconfig.json` file. If these already exist the
task will merge its settings in with yours.

If your project also depends on `@babel/core`, this task configures Babel to compile your TypeScript
by installing the Babel TypeScript preset and adding it to the presets in your `.babelrc`. It also
sets your `tsconfig.json` to not emit, which essentially makes TypeScript's compiler, `tsc`, just
provide type checking for you, which Babel's TypeScript compiler does not.

A script is also added to your `package.json` called `typecheck` which will run the TypeScript
compiler against your code and log any errors or warnings to `stdout`. **It intentionally will not
actually produce any compiled JavaScript during this.**
