import path from 'path';
import merge from 'webpack-merge';
import nodeExternals from 'webpack-node-externals';
import baseConfig from './webpack.config';
import VueSSRServerPlugin from 'vue-server-renderer/server-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default merge(baseConfig, {
  entry: './src/server/index.ts',
  target: 'node',
  devtool: 'source-map',
  output: {
    libraryTarget: 'commonjs2',
    path: path.resolve(__dirname, '../../dist/server'),
    publicPath: '/',
    filename: 'bundle.server.js'
  },
  externals: nodeExternals({
    whitelist: /\.css$/
  }),
  module: {
    rules: [
      {
        test: /\.css$/
      },
      {
        test: /\.scss$/
      }
    ]
  },
  plugins: [
    new VueSSRServerPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: '[id].[hash].css'
    })
  ]
});
