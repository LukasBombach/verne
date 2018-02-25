const path = require('path');
const typescript = require('rollup-plugin-typescript-ts-update');
const pkg = require('./package.json');

module.exports = [
  {
    input: path.join('packages', 'verne', 'src', 'index.ts'),
    output: [
      { file: path.join('packages', 'verne', pkg.main), format: 'cjs' },
      { file: path.join('packages', 'verne', pkg.browser), format: 'umd', name: 'Verne' },
      { file: path.join('packages', 'verne', pkg.module), format: 'es' },
    ],
    plugins: [
      typescript(),
    ],
  },
];
