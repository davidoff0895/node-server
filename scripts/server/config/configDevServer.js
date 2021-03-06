const path = require('path');
const MFS = require('memory-fs');
const webpack = require('webpack');
const webpackServerConfig = require('../../webpack/webpack.server.config');

module.exports = (app, onServerUpdate) => {
  const serverCompiler = webpack(webpackServerConfig);
  const mfs = new MFS();
  serverCompiler.outputFileSystem = mfs;
  serverCompiler.watch({}, (err, stats) => {
    if (err) {
      return console.error(err);
    }
    stats = stats.toJson();
    if (stats.errors.length) return console.error(stats.errors);

    console.log('ssr rebuild complete');

    const manifestFilePath = path.join(webpackServerConfig.output.path, 'vue-ssr-server-bundle.json');
    const bundleFile = mfs.readFileSync(manifestFilePath, 'utf-8');
    const bundle = JSON.parse(bundleFile);
    onServerUpdate({ bundle });
  })
};
