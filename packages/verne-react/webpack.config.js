const path = require('path');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

module.exports = {
  entry: {
    index: path.join(__dirname, 'src', 'index.ts')
  },
  output: {
    path: path.join(__dirname, 'lib'),
    filename: 'verne-react.js',
    library: 'verne-react',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.ts', '.tsx', '.json']
  },
  module: {
    loaders: [
      { test: /\.tsx?$/, loader: 'awesome-typescript-loader', exclude: /node_modules/ }
    ]
  },
  plugins: [
    new FriendlyErrorsWebpackPlugin()
  ]
};
