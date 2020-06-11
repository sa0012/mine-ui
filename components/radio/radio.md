### Radio - 单选框

---
#### 按需引入

```js
import { Radio, RadioGroup } from '@insaic/neon'
Vue.use(Radio).use(RadioGroup)
```

#### 例子 [demo源码](https://github.com/insaic/neon/blob/dev/examples/routers/radio.vue)
- 普通形式

```html
<sq-radio-group v-model="value" @change="change">
  <sq-radio name="pg">苹果</sq-radio>
</sq-radio-group>
```
- 列表 cell-between 形式

```html
<sq-radio-group v-model="value" type="cell-between" @change="change">
  <sq-radio name="pg">苹果</sq-radio>
  <sq-radio name="xj">香蕉</sq-radio>
  <sq-radio name="hmg" disabled>哈密瓜</sq-radio>
</sq-radio-group>
```
---
#### Props
- radio-group

 名称      | 类型        | 说明                          | 默认值   | 可选值      
:--------  |:-----------|:----------------------------- |:-------  |:-------
 value     | `String`   | 选中值，对应radio里的name，必传 | --       | --             
 disabled  | `Boolean`  | 选择组是否为禁用状态            | false    | true
 type      | `String`   | 显示样式类型                   | --       | cell，cell-between

- radio

 名称     | 类型               | 说明              | 默认值         | 可选值
:-------- |:---------         |:---------        |:-------        |:-------
 name     | `String`、`Number`| 标识名称，必传     | --             | --          
 disabled | `Boolean`         | 选项是否为禁用状态 | false          | true
 type     | `String`          | 勾选图标样式类型   | 'round'（圆形） | 'square'（方形）<br>'square-border'（方形圆角）

---

#### Slot
- radio

 名称 |  描述
:---- | :-------
 --   | 自定义内容

 ---
 #### Event
- radio-group

 名称   |  描述
:----   | :-------
 change | 改变选值时触发事件