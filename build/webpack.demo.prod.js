const path = require('path')
const utils = require('./utils')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.demo')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

let expandPlugin = []

// if (process.env.analyzer) {
//   expandPlugin.push(new BundleAnalyzerPlugin({
//     analyzerPort: 8888
//   }))
// }

module.exports = merge(baseConfig, {
  mode: 'production',
  entry: path.resolve(__dirname, '../examples/main.js'),
  output: {
    path: path.resolve(__dirname, '../dist'), // 必须是绝对路径
    filename: utils.assetsPath('js/[name].[hash:8].js'),
    // 这个可以用来配置CDN路径
    chunkFilename: utils.assetsPath('js/[name].[hash:8].js')
  },
  // module: {
  //   rules: utils.styleLoaders({
  //     sourceMap: true,
  //     extract: true
  //   })
  // },
  performance: {
    hints: process.env.NODE_ENV === 'production' ? 'error' : false,
    maxAssetSize: 512000,
    maxEntrypointSize: 512000,
    assetFilter: function (assetFilename) {
      return assetFilename.endsWith('.js')
    }
  },
  optimization: {
    minimizer: [
      new OptimizeCSSAssetsPlugin({
        assetNameRegExp: /\.optimize\.css$/g,
        cssProcessor: require('cssnano'),
        cssProcessorPluginOptions: {
          preset: ['default', { discardComments: { removeAll: true } }]
        },
        // 是否将插件信息打印到控制台
        canPrint: true
      })
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, '../examples/index.html'),
      version: utils.getVersion(),
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      }
    }),

    new MiniCssExtractPlugin({
      filename: utils.assetsPath('css/[name].[contenthash:8].css')
    }),

    ...expandPlugin
  ]
})
