### 内置样式

内置样式以
```js
import { Style } from '@insaic/neon'
Vue.use(Style)
```
的形式引入并使用。

其中包含了icon图标、1px css。可直接在项目里引用。
```css
.sq-1px-top {
  @include mix-1px($top: 1);
}
.sq-1px-bottom {
  @include mix-1px($bottom: 1);
}
```