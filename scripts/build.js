'use strict'

const webpack = require('webpack')
const webpackProdConfig = require('../build/webpack.prod')

const compiler = webpack(webpackProdConfig)

compiler.run((err, stats) => {
  if (!err) {
    console.log(
      stats.toString({
        colors: true,
        modules: false,
        children: false,
      })
    )
  } else {
    process.exit(1)
  }
})
