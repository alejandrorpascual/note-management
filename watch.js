/* eslint-disable @typescript-eslint/no-var-requires */
const {build} = require('esbuild');
const {dependencies, peerDependencies} = require('./package.json');
const {Generator} = require('npm-dts');

new Generator({
  entry: 'src/index.ts',
  output: 'dist/index.d.ts',
}).generate();

const sharedConfig = {
  entryPoints: ['src/index.ts'],
  bundle: true,
  minify: true,
  // external: Object.keys(dependencies).concat(Object.keys(peerDependencies)),
};

build({
  ...sharedConfig,
  platform: 'node', // for CJS
  outfile: 'dist/index.js',
  watch: {
    onRebuild(error, result) {
      if (error) console.error('watch build failed:', error);
      else console.log('watch build succeeded:', result);
    },
  },
});
//
// build({
//   ...sharedConfig,
//   outfile: 'dist/index.esm.js',
//   platform: 'neutral', // for ESM
//   format: 'esm',
//   watch: {
//     onRebuild(error, result) {
//       if (error) console.error('watch build failed:', error);
//       else console.log('watch build succeeded:', result);
//     },
//   },
// });
