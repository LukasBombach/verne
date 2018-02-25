const path = require('path');
const typescript = require('rollup-plugin-typescript-ts-update');
const pkg = require('./package.json');

module.exports = [
  {
    input: path.join('packages', 'verne', 'src', 'index.ts'),
    output: [
      { exports: 'named', file: path.join('packages', 'verne', pkg.main), format: 'cjs' },
      { exports: 'named', file: path.join('packages', 'verne', pkg.browser), format: 'umd', name: 'Verne' },
      { exports: 'named', file: path.join('packages', 'verne', pkg.module), format: 'es' },
    ],
    plugins: [
      typescript(),
    ],
    onwarn: ( warning, next ) => {
      if ( warning.code === 'THIS_IS_UNDEFINED' ) return; // you can do this now btw
      next( warning );
    },
  },
];
