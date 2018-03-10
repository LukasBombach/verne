const verneConfig = require('./packages/verne/rollup.config');
const verneReactConfig = require('./packages/verne-react/rollup.config');

module.exports = [...verneConfig, ...verneReactConfig];
