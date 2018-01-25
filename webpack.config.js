const path = require('path');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
// const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: {
    index: ['./src/index.tsx'],
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    library: 'write-js',
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.json', '.ts', '.tsx'],
  },
  module: {
    loaders: [
      { test: /\.tsx?$/, loader: 'awesome-typescript-loader', exclude: /node_modules/ },
      { test: /\.jsx?$/, loader: 'babel-loader', exclude: /node_modules/ },
    ],
  },
  plugins: [
    new FriendlyErrorsWebpackPlugin(),
  ],
  devServer: {
    quiet: true,
    contentBase: path.join(__dirname, "public"),
    open: true,
    overlay: true,
    clientLogLevel: 'none',
  },
};
