// import commonjs from 'rollup-plugin-commonjs';
// import async from 'rollup-plugin-async';
// import jsx from 'rollup-plugin-jsx';
import typescript from 'rollup-plugin-typescript';
import pkg from './package.json';

export default [
  {
    input: 'src/write_editor.tsx',
    output: {
      file: pkg.browser,
      format: 'umd',
      name: 'WriteEditor',
    },
    plugins: [
      typescript(),
    ],
  },
  {
    input: 'src/write_editor.tsx',
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' },
    ],
    plugins: [
      typescript(),
    ],
  },
];
