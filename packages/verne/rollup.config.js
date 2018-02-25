const path = require('path');
const typescript = require('rollup-plugin-typescript-ts-update');
const pkg = require('./package.json');

const basePath = process.env.USE_VERNE_PACKAGES ? path.join('packages', 'verne') : '';

module.exports = [
  {
    input: path.join(basePath, 'src', 'index.ts'),
    output: [
      { exports: 'named', file: path.join(basePath, pkg.main), format: 'cjs' },
      { exports: 'named', file: path.join(basePath, pkg.browser), format: 'umd', name: 'Verne' },
      { exports: 'named', file: path.join(basePath, pkg.module), format: 'es' },
    ],
    plugins: [
      typescript(),
    ],
    onwarn: (warning, next) => {
      if (warning.code === 'THIS_IS_UNDEFINED') return;
      next(warning);
    },
  },
];
