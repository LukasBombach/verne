import path from 'path';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import typescript  from 'rollup-plugin-typescript2';
import pkg  from './package.json';

const basePath = process.env.USE_VERNE_PACKAGES ? path.join('packages', 'verne') : '';

export default [
  {
    input: path.join(basePath, 'src', 'index.ts'),
    output: {
      file: path.join(basePath, pkg.browser),
      format: 'umd',
      name: 'Verne',
      exports: 'named',
    },
    plugins: [
      resolve(),
      commonjs(),
      typescript({ typescript: require('typescript') }),
    ],
    onwarn: (warning, next) => {
      if (warning.code === 'THIS_IS_UNDEFINED') return;
      next(warning);
    },
  },
  {
    input: path.join(basePath, 'src', 'index.ts'),
    output: [
      { exports: 'named', file: path.join(basePath, pkg.main), format: 'cjs' },
      { exports: 'named', file: path.join(basePath, pkg.module), format: 'es' },
    ],
    plugins: [
      typescript({ typescript: require('typescript') }),
    ],
    onwarn: (warning, next) => {
      if (warning.code === 'THIS_IS_UNDEFINED') return;
      next(warning);
    },
  },
];
