module.exports = function (api) {
  const { BABEL_MODULE, NODE_ENV } = process.env
  const useESModules = BABEL_MODULE !== 'commonjs' && NODE_ENV !== 'test'

  api && api.cache(false)

  return {
    presets: [
      [
        '@babel/preset-env',
        {
          loose: true,
          modules: useESModules ? false : 'commonjs'
        }
      ],
      // 解析jsx语法， 没有babel编译的时候jsx转换成的代码格式有问题
      [
        '@vue/babel-preset-jsx',
        {
          functional: false
        }
      ],
      '@babel/preset-typescript'
    ],
    plugins: [
      [
        '@babel/plugin-transform-runtime',
        {
          corejs: false,
          helpers: false,
          regenerator: NODE_ENV === 'test',
          useESModules
        }
      ],
      '@babel/plugin-transform-object-assign',
      '@babel/plugin-proposal-optional-chaining'
    ]
  }
}
