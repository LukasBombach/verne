import path from 'path';
import typescript  from 'rollup-plugin-typescript2';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import serve from 'rollup-plugin-serve';
import pkg  from './package.json';

const basePath = process.env.USE_VERNE_PACKAGES ? path.join('packages', 'verne') : '';

export default [
  {
    input: path.join(basePath, 'src', 'index.ts'),
    output: {
      file: path.join(basePath, pkg.main),
      format: 'umd',
    },
    plugins: [
      resolve(),
      commonjs(),
      typescript({ typescript: require('typescript') }),
      serve({
        open: true,
        verbose: true,
        contentBase: ['lib', 'public'],
        historyApiFallback: false,
        host: 'localhost',
        port: 3000,
      }),
    ],
    onwarn: (warning, next) => {
      if (warning.code === 'THIS_IS_UNDEFINED') return;
      next(warning);
    },
  }
];
