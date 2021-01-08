const { merge } = require('webpack-merge')
const webpackConfig = require('./webpack.base')

const Development = 'development'

const devWebpackConfig = merge(webpackConfig(Development), {
  mode: Development,
  performance: {
    hints: false,
  },
  devtool: 'eval-source-map',
})

module.exports = devWebpackConfig
