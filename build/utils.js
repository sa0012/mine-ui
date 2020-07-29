const path = require('path')
const fs = require('fs')
const config = require('../config')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

// 静态资源输出目录
exports.assetsPath = function (_path) {
  let assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory

  return path.posix.join(assetsSubDirectory, _path)
}

exports.cssLoaders = function (options) {
  options = options || {}

  // 生产环境css打包进行压缩和开启生产模式sourceMap
  let cssLoader = {
    loader: 'css-loader',
    options: {
      // minimize: process.env.NODE_ENV === 'production',
      sourceMap: options.sourceMap
    }
  }

  let postcssLoader = {
    loader: 'postcss-loader',
    options: {
      plugins: function () {
        return [
          require('autoprefixer')()
        ]
      }
    }
  }

  let miniCssExtractLoader = {
    loader: MiniCssExtractPlugin.loader,
    options: {
      hmr: false,
      reloadAll: true
    }
  }

  // 对于sass, less, stulys 需要配合各自对应的loader
  function generateLoaders (loader, loaderOptions) {
    let loaders = [cssLoader, postcssLoader]

    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    // 生产环境使用mini-css-extract-plugin 去拆解css文件
    if (options.extract) {
      return [
        miniCssExtractLoader
      ].concat(loaders)
    } else {
      // 开发环境可使用style-loader去插入css
      return ['vue-style-loader'].concat(loaders)
    }
  }

  // 引入scss全局变量
  function generateSassResourceLoader () {
    let loaders = [
      cssLoader,
      postcssLoader,
      'sass-loader',
      {
        loader: 'sass-resources-loader',
        options: {
          resources: [
            path.resolve(__dirname, '../src/assets/style/vars.scss')
          ]
        }
      }
    ]

    // 生产环境使用mini-css-extract-plugin 去拆解css文件
    if (options.extract) {
      return [
        miniCssExtractLoader
      ].concat(loaders)
    } else {
      // 开发环境可使用style-loader去插入css
      return ['style-loader'].concat(loaders)
    }
  }

  return {
    css: generateLoaders(),
    sass: generateLoaders('sass', {
      indentedSyntax: true,
      data: `@import "~@/common/styles/variables.scss";@import "~@/common/styles/mixins.scss";`
    }),
    scss: generateLoaders('sass', {
      data: `@import "~@/common/styles/variables.scss";@import "~@/common/styles/mixins.scss";`
    })
  }
}

// css 各种loader配置策略
exports.styleLoaders = function (options) {
  let output = []
  let loaders = exports.cssLoaders(options)
  for (let extension in loaders) {
    let loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader,
      include: path.resolve(__dirname, '../src')
    })
  }
  console.log(output, 'output')

  return output
}

exports.getVersion = function () {
  let date = new Date()
  date.setMinutes(date.getMinutes() - date.getTimezoneOffset()) // toJSON 的时区补偿
  return date.toJSON().substr(0, 19).replace(/[-T:]/g, '')
}

exports.modulesFunc = (filePath) => {
  var modules = {}
  var cPath = path.join(__dirname, filePath)
  var files = fs.readdirSync(cPath)
  if (files) {
    files.forEach(function (name) {
      var p = path.join(cPath, name)
      if (fs.statSync(p).isDirectory()) {
        modules[name] = p
      }
    })
  }

  return modules
}

exports.allBuild = (platType, filePath) => {
  return {
    [platType]: path.join(__dirname, filePath)
  }
}

exports.assetsPath = function (_path) {
  const assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory

  return path.posix.join(assetsSubDirectory, _path)
}

// 是否需要压缩成/\.min.js/文件
exports.isMinify = process.argv.indexOf('-p') !== -1
