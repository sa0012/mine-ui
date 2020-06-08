const shell = require('shelljs')
const signale = require('signale')
const fs = require('fs-extra')
const path = require('path')
const libDir = path.join(__dirname, '../lib')

const { Signale } = signale

const tasks = [
  // eslint 代码检查
  // 'cross-env NODE_ENV=production npm run lint',
  // 生成 index.js 入口文件
  'node build/build-entry',
  // 生成style引入入口文件
  'node build/build-style-entry',
  'node build/build-components.js',
  // 全局引入模式
  'cross-env NODE_ENV=production webpack -p --color --config build/webpack.pkg.js',
  // 每个组件单独打包
  'cross-env NODE_ENV=production webpack --color --config build/webpack.pkg.js'
]
fs.emptyDirSync(libDir)

tasks.every(task => {
  signale.start(task)

  const interactive = new Signale({ interactive: true })

  const result = shell.exec(`${task} --silent`)

  if (result.code !== 0) {
    interactive.error(task)
    return false
  }

  interactive.success(task)
  return true
})
