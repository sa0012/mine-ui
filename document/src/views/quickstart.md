### 快速上手

#### 安装

NPM

```bash
npm i @insaic/neon -S
```

CDN

```html
<!-- 引入样式 -->
<link rel="stylesheet" href="https://unpkg.com/@insaic/neon/lib/style.min.css">

<!-- 引入组件 -->
<script src="https://unpkg.com/vue/dist/vue.min.js"></script>
<script src="https://unpkg.com/@insaic/neon/lib/index.min.js"></script>
```

#### 引入组件

#### 1.按需引入（推荐）

使用 [babel-plugin-import](https://github.com/ant-design/babel-plugin-import#readme)，该插件是一款 babel 插件，它会在编译过程中将
```js
import { Button } from '@insaic/neon'
```
 的写法自动转换为按需引入的方式 
 ```js
const button = require('@insaic/neon/lib/button')
require('@insaic/neon/lib/button/style')
 ```

 ```bash
 # 安装 babel-plugin-import 插件
 npm i babel-plugin-import -D
 ```

 在`.babelrc`里添加插件配置
 ```js
 "plugins": [
  [
    "import",
    {
      "libraryName": "@insaic/neon",
      "style": true
    }
  ]
]
 ```

 安装和配置好插件后，即可使用
 ```js
 import { Style, Button } from '@insaic/neon'
 Vue.use(Style).use(Button)
 ```
 的方式引入需要的组件

::: warning 注意： 按需引入组件 也需引入基础样式 
```js
import { Style } from '@insaic/neon'
Vue.use(Style)
```
:::


#### 2.全局引入

```js
import Neon from '@insaic/neon'
Vue.use(Neon)
```

::: warning 注意
全局引入已包含了基础样式
:::