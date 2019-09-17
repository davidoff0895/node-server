const path = require('path');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  mode: 'development',
  resolve: {
    modules: [
      'node_modules',
      path.resolve('./src'),
    ],
    extensions: ['.js', '.vue']
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: {
          loader: 'vue-loader'
        }
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader'
      }
    ]
  },
  devtool: '#eval-source-map',
  plugins: [
    new VueLoaderPlugin(),
    new webpack.DefinePlugin([
      'NODE_ENV',
      'BABEL_ENV'
    ].reduce((s, n) => Object.assign(s, { ['process.env.' + n]: JSON.stringify(process.env[n]) })))
  ]
}
