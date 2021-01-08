const { HtmlPath, OutPutPath, EntryPath, AppPath } = require('../config/paths')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')

const webpackConfig = (webpackDev) => {
  const isDev = webpackDev === 'development'
  const isProd = webpackDev === 'production'

  return {
    entry: EntryPath,
    output: {
      path: OutPutPath,
      filename: isDev ? '[name].js' : isProd && 'static/js/[name].js',
      chunkFilename: isDev ? '[name].js' : isProd && 'static/js/[name].[chunkhash:5].chunk.js',
      publicPath: '/',
    },
    plugins: [
      new VueLoaderPlugin(),
      new HtmlWebpackPlugin({
        template: HtmlPath,
      }),
    ].filter(Boolean),
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader',
          include: AppPath,
        },
        {
          test: /\.m?js/,
          resolve: {
            fullySpecified: false,
          },
        },
        {
          test: /\.js$/,
          loader: 'babel-loader',
          include: AppPath,
          exclude: /node_modules/,
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  useBuiltIns: 'usage', // 会根据配置的浏览器兼容，以及你代码中用到的 API 来进行 polyfill，按需加载
                  targets: {
                    browsers: '> 0.25%, last 2 versions, not dead, not ie <= 8',
                  },
                  corejs: {
                    version: 3,
                    proposals: true, // 提案
                  },
                },
              ],
              '@vue/babel-preset-app',
            ],
          },
        },
        {
          test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.svg$/],
          loader: 'url-loader',
          options: {
            limit: 10000,
            esModule: false,
            name: 'static/img/[name].[hash:8].[ext]',
          },
        },
        {
          test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 10000,
            esModule: false,
            name: 'static/media/[name].[hash:8].[ext]',
          },
        },
        {
          test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 10000,
            esModule: false,
            name: 'static/fonts/[name].[hash:8].[ext]',
          },
        },
        {
          test: /\.css$/,
          use: [
            isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
              },
            },
          ],
        },
      ].filter(Boolean),
    },
    resolve: {
      alias: {
        '@static': path.resolve(process.cwd(), 'static'),
      },
    },
  }
}

module.exports = webpackConfig
