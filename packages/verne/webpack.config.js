const path = require('path');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

module.exports = {
  entry: {
    index: path.join(__dirname, 'src', 'index.ts')
  },
  output: {
    path: path.join(__dirname, 'lib'),
    filename: 'verne.js',
    library: 'verne',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.ts', '.json']
  },
  module: {
    loaders: [
      { test: /\.ts$/, loader: 'awesome-typescript-loader', exclude: /node_modules/ }
    ]
  },
  plugins: [
    new FriendlyErrorsWebpackPlugin()
  ]
};
