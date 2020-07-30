const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const config = require('../config')
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
    filename: '[name].[hash:7].js',
    chunkFilename: isProd ? '[name].[hash:7].js' : '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.(c|sa|sc)ss$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader'],
        exclude: /node_modules/
      }
    ]
  },
  devServer: {
    host: '0.0.0.0',
    port: 8085,
    publicPath: '/',
    hot: true,
    useLocalIp: true
  },
  performance: {
    hints: false
  },
  stats: {
    children: false
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
    new webpack.HotModuleReplacementPlugin(),
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
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new ProgressBarPlugin(),
    new webpack.LoaderOptionsPlugin(
      {
        minimize: true,
        debug: false,
        options: {
          context: __dirname
        },
        vue: {
          compilerOptions: {
            preserveWhitespace: false
          }
        }
      }
    )
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
