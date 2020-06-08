/**
 * 样式文件
 */
const fs = require('fs-extra')
const path = require('path')

// 引入组件库文件
const Components = require('./get-components')()

// style 文件路径
const filePath = path.join(__dirname, '../components/index.scss')

function buildStyleEntry () {
  const importList = Components.map(name => `@import './${name}/index.scss';`)
  importList.unshift(`@import '../src/common/styles/base.scss';`)
  const content = `${importList.join('\n')}${'\n'}`
  console.log(importList, 'importList')
  fs.writeFileSync(filePath, content)
}

buildStyleEntry()
