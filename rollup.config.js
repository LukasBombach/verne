const verneConfig = require('./packages/verne/rollup.config.monorepo');
const verneReactConfig = require('./packages/verne-react/rollup.config.monorepo');

module.exports = [...verneConfig, ...verneReactConfig];
