const path = require('path');
const typescript = require('rollup-plugin-typescript');
const pkg = require('./package.json');

module.exports = [
  {
    input: path.join('src', 'index.ts'),
    output: [
      { file: path.join(pkg.main), format: 'cjs' },
      { file: path.join(pkg.browser), format: 'umd', name: 'Verne' },
      { file: path.join(pkg.module), format: 'es' },
    ],
    plugins: [
      typescript(),
    ],
  },
];
