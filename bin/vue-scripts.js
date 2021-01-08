#! /usr/bin/env node

'use strict'

const concurrently = require('concurrently')
const ora = require('ora')
const args = process.argv
const scripts = args[2]

switch (scripts) {
  case 'start':
    // require.resolve 解析完整路径
    concurrently([{ command: `node ${require.resolve('../scripts/start')}`, name: 'dev-server' }])
    break
  case 'build':
    const spinner = ora('正在打包编译中...').start()

    concurrently([{ command: `node ${require.resolve('../scripts/build')}`, name: 'build' }])
      .then(() => spinner.succeed('打包完成'))
      .catch(() => spinner.fail('编译失败'))
    break
  default:
    break
}
