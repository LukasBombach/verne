const serve = require('rollup-plugin-serve');
const verneConfig = require('./packages/verne/rollup.config');
const verneReactConfig = require('./packages/verne-react/rollup.config');

const serveConfig = serve({
  open: true,
  verbose: true,
  contentBase: ['development_server', 'packages/verne/lib', 'packages/verne-react/lib'],
  historyApiFallback: false,
  host: 'localhost',
  port: 3000,
});

verneReactConfig[0].plugins = verneReactConfig[0].plugins || [];
verneReactConfig[0].plugins.push(serveConfig);

module.exports = [...verneConfig, ...verneReactConfig];
