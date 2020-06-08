/**
 * fs的扩展模块， 继承了fs， 并提供更多好用的api
 * copy 复制文件 copy(src, dest, [option],callback)
 * copySync() 同步

 * emptyDir 清空目录
 * emptydir() 异步
 * emptyDirSync(), emptydirSync() 同步

 * ensureFile 创建文件
 * createFile() 异步
 * createFileSync(),ensureFileSync() 同步

 * ensureDir 创建目录
 * ensureDirSync() 同步
 */
const fs = require('fs-extra')
const path = require('path')
const babel = require('@babel/core')

// 打包为es加载模式的目录路径
const esDir = path.join(__dirname, '../es')
// lib目录路径(配合babel-import-plugin插件会将import转换为require加载模式)
const libDir = path.join(__dirname, '../lib')
// 组件目录路径
const srcDir = path.join(__dirname, '../components')
// babel配置文件路径
const babelConfig = {
  configFile: path.join(__dirname, '../babel.config.js')
}

const scriptRegExp = /\.(js|ts|jsx)$/
// 接收一个文件路径， 返回一个fs.Status()实例， 判断文件是否存在
// isDirectory是否是目录
const isDir = dir => fs.lstatSync(dir).isDirectory()
const isCode = path => !/(demo|test|\.md)$/.test(path)
const isScript = path => scriptRegExp.test(path)

// 对需要打包的组件文件进行 babel 编译
function compile (dir) {
  const files = fs.readdirSync(dir)

  files.forEach(file => {
    const filePath = path.join(dir, file)

    if (!isCode(file)) {
      return fs.removeSync(filePath)
    }

    // 递归遍历目录中的文件
    if (isDir(filePath)) {
      return compile(filePath)
    }

    if (isScript(file)) {
      const { code } = babel.transformFileSync(filePath, babelConfig)
      fs.removeSync(filePath)
      // 输入的文件为 '*.js' 文件
      fs.outputFileSync(filePath.replace(scriptRegExp, '.js'), code)
    }
  })
}

// 每次构建之前先清空（同步）es, lib两个目录的文件
fs.emptyDirSync(esDir)
fs.emptyDirSync(libDir)

// 编译工作开始之前会先将src下的组件文件拷贝到es/lib目录下， 然后在进行构建
// 编译es目录的文件
fs.copySync(srcDir, esDir)
compile(esDir)

// 编译lib目录的文件
process.env.BABEL_MODULE = 'commonjs'
fs.copySync(srcDir, libDir)
compile(libDir)
