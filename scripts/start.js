'use strict'

const webpack = require('webpack')
const webpackDevConfig = require('../build/webpack.dev')
const webpackDevServer = require('webpack-dev-server')
const dev = require('../config/dev')
const logSymbols = require('log-symbols')
const chalk = require('chalk')
const open = require('open')
const portfinder = require('portfinder')

const compiler = webpack(webpackDevConfig)

const devServer = new webpackDevServer(compiler, dev)

portfinder.basePort = dev.port
portfinder
  .getPortPromise()
  .then((port) => {
    process.env.PORT = port
    devServer.listen(port, dev.host, (err) => {
      if (err) {
        return console.log(logSymbols.error, chalk.red(err))
      }
      const url = `http://${dev.host}:${port}`
      console.log(chalk.cyan('正在启动开发服务...\n'))
      open(url).then((res) => {
        console.log(logSymbols.success, chalk.cyan(`开发服务已在 ${url} 启动`))
      })
    })
  })
  .catch((err) => {
    console.log(logSymbols.error, chalk.red(err))
  })
