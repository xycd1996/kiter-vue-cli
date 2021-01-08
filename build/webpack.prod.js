const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { merge } = require('webpack-merge')
const webpackConfig = require('./webpack.base')
const { StaticPath } = require('../config/paths')

const Production = 'production'

const webpackProdConfig = merge(webpackConfig(Production), {
  mode: Production,
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: true,
        },
      }),
    ],
    splitChunks: {
      automaticNameDelimiter: '-',
      chunks: 'all',
    },
    runtimeChunk: true,
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[chunkhash:5].css',
      chunkFilename: 'css/[name].[chunkhash:5].css',
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: StaticPath, to: 'static' }],
    }),
  ],
})

module.exports = webpackProdConfig
