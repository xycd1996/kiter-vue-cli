#! /usr/bin/env node

'use strict'

const ora = require('ora')

const spinner = ora('打包编译中').start()

setTimeout(() => {
  spinner.succeed()
}, 3000)
