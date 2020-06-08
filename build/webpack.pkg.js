const path = require('path')
const merge = require('webpack-merge')
const config = require('./webpack.base.conf')
const { isMinify } = require('./utils')

console.log('pkg')
module.exports = merge(config, {
  mode: 'production',
  entry: {
    mine: './es/index.js'
  },
  output: {
    path: path.join(__dirname, '../lib'),
    library: 'mine-ui',
    libraryTarget: 'umd',
    filename: isMinify ? '[name].min.js' : '[name].js',
    umdNamedDefine: true,
    // https://github.com/webpack/webpack/issues/6522
    globalObject: 'typeof self !== \'undefined\' ? self : this'
  },
  externals: {
    vue: {
      root: 'Vue',
      commonjs: 'vue',
      commonjs2: 'vue',
      amd: 'vue'
    }
  },
  performance: false,
  optimization: {
    minimize: isMinify
  }
})
