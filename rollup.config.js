import commonjs from 'rollup-plugin-commonjs';
import async from 'rollup-plugin-async';
import jsx from 'rollup-plugin-jsx';
import pkg from './package.json';

export default [
  {
    input: 'src/write_editor.jsx',
    output: {
      file: pkg.browser,
      format: 'umd',
      name: 'WriteEditor',
    },
    plugins: [
      commonjs(),
      async(),
      jsx({ factory: 'React.createElement' }),
    ],
  },
  {
    input: 'src/write_editor.jsx',
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' },
    ],
  },
];
