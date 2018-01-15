const path = require('path');
// const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: {
    index: ['./src/index.ts'],
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    library: 'write-js',
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
  devtool: 'source-map',
  module: {
    loaders: [
      // Process JS with Babel.
      { test: /\.tsx?$/, loader: require.resolve('awesome-typescript-loader') },
      { test: /\.jsx?$/, loader: 'babel-loader', exclude: /node_modules/ },
    ],
  },
};
