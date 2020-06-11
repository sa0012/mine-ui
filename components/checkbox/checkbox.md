### Checkbox - 多选框
---
#### 按需引入

```js
import { Checkbox, CheckboxGroup } from '@insaic/neon'
Vue.use(Checkbox).use(CheckboxGroup)
```

#### 例子 [demo源码](https://github.com/insaic/neon/blob/dev/examples/routers/checkbox.vue)
- 普通形式

```html
<sq-checkbox-group v-model="value" @change="change">
  <sq-checkbox name="pg">苹果</sq-checkbox>
</sq-checkbox-group>
```
- 列表 cell-between 形式

```html
<sq-checkbox-group v-model="value" type="cell-between" @change="change">
  <sq-checkbox name="pg">苹果</sq-checkbox>
  <sq-checkbox name="xj">香蕉</sq-checkbox>
  <sq-checkbox name="hmg" disabled>哈密瓜</sq-checkbox>
</sq-checkbox-group>
```
---
#### Props
- checkbox-group

 名称      | 类型        | 说明                         | 默认值   | 可选值      
:--------  |:-----------|:-----------------------------|:------- |:-------
 value     | `Array`    | 选中值，对应checkbox里的name  | --       | --             
 disabled  | `Boolean`  | 选择组是否为禁用状态           | false    | true
 type      | `String`   | 显示样式类型                  | --       | cell，cell-between

- checkbox

 名称       | 类型                 | 说明              | 默认值          | 可选值
:--------   |:---------           |:---------         |:-------        |:-------
 name       | `String`、`Number`  | 标识名称           | --             | --          
 disabled   | `Boolean`           | 选项是否为禁用状态  | false          | true
 type | `String`            | 选框形状           | 'round'（圆形） | 'square'（方形）<br>'square-border'（方形圆角）

---

#### Slot
- checkbox

 名称 |  描述
:---- | :-------
 --   | 自定义内容

 ---
 #### Event
- checkbox-group

 名称   |  描述
:----   | :-------
 change | 改变选值时触发事件