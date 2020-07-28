const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const config = require('./config')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.conf')
const utils = require('./utils')

const isProd = process.env.NODE_ENV === 'production'

const webpackConfig = merge(baseConfig, {
  mode: process.env.NODE_ENV,
  devtool: '#eval-source-map',
  entry: {
    docs: './examples/main.js'
  },
  output: {
    path: path.join(__dirname, '../examples/dist/'),
    publicPath: '/',
    filename: utils.assetsPath('js/[name].[chunkhash:8].js'),
    chunkFilename: utils.assetsPath('js/[name].[chunkhash:8].js')
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: config.alias,
    modules: ['node_modules']
  },
  module: {
    rules: [
      {
        test: /\.(c|sa|sc)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              reloadAll: true
            }
          },
          // MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader'],
        exclude: /node_modules/
      }
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          name: `chunk-vendors`,
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          chunks: 'initial'
        },
        common: {
          name: `chunk-common`,
          minChunks: 2,
          priority: -20,
          chunks: 'initial',
          reuseExistingChunk: true
        }
      }
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'examples/index.html',
      inject: true,
      favicon: '',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency'
    }),
    new ProgressBarPlugin(),
    new MiniCssExtractPlugin({
      filename: utils.assetsPath('css/[name].[contenthash:8].css')
    }),

    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['**/*', '!dll', '!dll/**'] // 不删除dll目录下的文件
    })
  ]
})

if (isProd) {
  webpackConfig.externals = {
    'vue': 'Vue',
    'vue-router': 'VueRouter',
    'highlight.js': 'hljs'
  }

  webpackConfig.optimization.splitChunks = {
    cacheGroups: {
      vendor: {
        test: /\/src\//,
        name: 'mine-ui',
        chunks: 'all'
      }
    }
  }

  webpackConfig.devtool = false
}

module.exports = webpackConfig
