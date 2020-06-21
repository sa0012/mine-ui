### Switch - 开关

---
#### 按需引入

```js
import { Switch } from '@insaic/neon'
Vue.use(Switch)
```

#### 例子 [demo源码](https://github.com/insaic/neon/blob/dev/examples/routers/switch.vue)
```html
<!-- 普通形式 -->
<sq-switch v-model="isChecked"/>
<!-- 禁用状态 -->
<sq-switch v-model="isChecked" disabled/>
<!-- 调整大小 -->
<sq-switch v-model="isChecked" size="40px"/>
```
---
#### Props
 名称      | 类型        | 说明     | 默认值  | 可选值      
:--------  |:-----------|:---------|:-------|:------
 value     | `Boolean`  | 是否选中  | --    | --             
 disabled  | `Boolean`  | 是否禁用  | false | true
 size      | `String`   | 尺寸大小  | 30px  | --