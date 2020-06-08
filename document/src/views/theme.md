### 主题定制

#### 样式变量
`Neon`样式基于`Sass`开发，可通过全局和组件的样式变量对主题样式进行调整

完整的样式变量列表可以查看 [默认样式变量](https://github.com/insaic/neon/blob/dev/src/common/styles/variables.scss)

#### 变量覆盖
可以通过引入组件源码(`components`目录下)，并覆盖样式变量的方式来实现主题定制

- 首先安装如下依赖： `babel-plugin-import`  `sass-loader`  `node-sass`

- 在 `.babelrc` 添加如下配置
```js
// .babelrc
{
  "plugins": [
    ["import", {"libraryName": "@insaic/neon", "libraryDirectory": "src/components"}],
  ]
}
```

- 在 `vue.config.js` 添加如下配置 `（基于vue-cli 3.0情况下）`
```js
// vue.config.js
module.exports = {
  // ...
  // 将neon源码包里的js进行babel-loader转译
  transpileDependencies: [
    '@insaic'
  ],
  // 将neon源码包里的scss变量引入，实现自定义样式主题
  css: {
    loaderOptions: {
      sass: {
        // @/ 是 src/ 的别名
        // 所以这里假设你有 `src/variables.scss` 这个文件
        data: `@import "@/variables.scss";`
      }
    }
  }
  // ...
}
```

- 最后在 `src` 下新建 `variables.scss` 添加如下配置
```scss
// src/variables.scss
// 下面两项须确保引入，不可省略
@import '~@insaic/neon/src/common/styles/variables';
@import '~@insaic/neon/src/common/styles/mixins';

// 以下为自定义内容，覆盖样式变量
// $theme-color:red;
// $button-primary-background-color: $theme-color;
```