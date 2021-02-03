'use strict'

const inquirer = require('inquirer')

const Inquirer = (name) => {
  inquirer.prompt([{ type: 'input', name: '创建项目名称', default: name }]).then((res) => {
    console.log(res)
    console.log('wancheng')
  })
}

module.exports = Inquirer
