const { merge } = require('webpack-merge')
const dev = require('../config/dev')
const webpackConfig = require('./webpack.base')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')

const Development = 'development'

const devWebpackConfig = merge(webpackConfig(Development), {
  mode: Development,
  performance: {
    hints: false,
  },
  devtool: 'eval-source-map',
  plugins: [
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: [`You application is running here http://${dev.host}:${process.env.PORT || dev.port}`],
      },
      clearConsole: true,
    }),
  ],
})

module.exports = devWebpackConfig
