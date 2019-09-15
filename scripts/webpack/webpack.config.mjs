import path from 'path';
import VueLoaderPlugin from 'vue-loader/lib/plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import ForkTsCheckerNotifierWebpackPlugin from 'fork-ts-checker-notifier-webpack-plugin';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const includePath = path.resolve(__dirname, '..');

export default {
  mode: 'development',
  resolve: {
    modules: [
      'node_modules',
      path.resolve('./src'),
    ],
    extensions: ['.ts', '.js', '.vue'],
    alias: {
      vue$: 'vue/dist/vue.esm.js'
    }
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        include: includePath,
        use: [
          'vue-style-loader'
        ],
      },
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          'sass-loader'
        ],
      },
      {
        test: /\.sass$/,
        use: [
          'vue-style-loader',
          'sass-loader?indentedSyntax'
        ],
      },
      {
        test: /\.vue$/,
        use: {
          loader: 'vue-loader',
          options: {
            loaders: {
              'scss': [
                'vue-style-loader',
                'sass-loader'
              ],
              'sass': [
                'vue-style-loader',
                'sass-loader?indentedSyntax'
              ]
            }
          }
        }
      },
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          appendTsSuffixTo: [/\.vue$/],
          transpileOnly: true
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
    new ForkTsCheckerWebpackPlugin({
      reportFiles: ['src/**/*.{ts,tsx}', '!src/skip.ts'],
      checkSyntacticErrors: true,
      tslint: true,
      tsconfig: './tsconfig.json',
      async: true
    }),
    new ForkTsCheckerNotifierWebpackPlugin({ excludeWarnings: true })
  ]
}
