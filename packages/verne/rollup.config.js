import typescript from 'rollup-plugin-typescript';
import pkg from './package.json';

export default [
  {
    input: 'src/index.ts',
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.browser, format: 'umd', name: 'Verne' },
      { file: pkg.module, format: 'es' },
    ],
    plugins: [
      typescript(),
    ],
  },
];
