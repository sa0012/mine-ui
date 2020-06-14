const fs = require('fs')
const path = require('path')

// 排除的文件
const EXCLUDES = ['base', 'index.ts', 'index.js', 'toast', 'index.scss', 'style', 'style.js', 'mixins', 'utils', '.DS_Store']

module.exports = function () {
  // 组件存放目录
  const src = path.resolve(__dirname, '../components')
  // 同步读取该目录下所有的文件
  const dirs = fs.readdirSync(src)
  // 排除非组件文件
  const includeDirs = dirs.filter(dir => !EXCLUDES.includes(dir))
  return includeDirs
}
