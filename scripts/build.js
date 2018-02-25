const path = require('path');
const fs = require('fs');
const chalk = require('chalk');
const { rollup } = require('rollup');

const packageDir = path.join(__dirname, '..', 'packages');
const params = getParams(packageDir);
const rollupConfigs = getRollupConfigs(params, packageDir);

startBuild(params, rollupConfigs);

function getParams(packageDir) {
  const argv = process.argv.slice(2);
  const watch = argv.indexOf('-w') !== -1;
  const packageParams = argv.filter(arg => !arg.startsWith('-'));
  const packages = packageParams.length === 0 || packageParams.indexOf('all') !== -1 ? getPackageNames(packageDir) : packageParams;
  return { watch, packages };
}

function getPackageNames(packageDir) {
  return fs.readdirSync(packageDir)
    .filter(file => fs.statSync(path.join(packageDir, file)).isDirectory());
}

function getRollupConfigs(params, packageDir) {
  const configs = params.packages.map(packageName => {
    const pathToPackage = path.join(packageDir, packageName);
    const configFile = path.join(pathToPackage, 'rollup.config.js');
    const configArray = require(configFile);
    configArray.forEach(config => {
      config.input = path.join('packages', packageName, config.input);
      config.output.forEach(output => output.file = path.join('packages', packageName, output.file));
    });
    return configArray;
  });
  return [].concat(...configs)
}

function startBuild(params, rollupConfigs) {
  console.log(chalk.dim('Building packages'), chalk.blue(params.packages.join(' ')), params.watch ? `${chalk.dim('in')} ${chalk.yellow('watch mode')}` : '');
  console.log(JSON.stringify(rollupConfigs, null, 2));
  rollupConfigs.forEach(config => rollup(config));
}