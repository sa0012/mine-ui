### Cell - 单元格
---
#### 按需引入

```js
import { Cell, CellGroup } from '@insaic/neon'
Vue.use(Cell).use(CellGroup)
```

#### 例子 [demo源码](https://github.com/insaic/neon/blob/dev/examples/routers/cell.vue)
```html
<sq-cell-group title="交强险">
  <sq-cell title="交强险" is-link value="投保" @click="show"></sq-cell>
  <sq-cell title="起保时间" is-link></sq-cell>
</sq-cell-group>

<sq-cell-group title="商业险" label="添加更多" @click="addMore">
  <sq-cell title="交强险" is-link value="投保"></sq-cell>
  <sq-cell title="起保时间" is-link></sq-cell>
</sq-cell-group>
```

:::warning 注意
当label不存在时，click事件不会执行，需改为@click.native
:::

---
#### Props
- cell-group

 名称        | 类型       | 说明         | 默认值   | 可选值
:----------- |:--------- |:--------     |:------- |:------
 title       | `String`  | 标题         |    --   | --       
 label       | `String`  | 标题右边文本  |    --   | --

- cell

 名称        | 类型       | 说明             | 默认值   | 可选值
:----------- |:--------- |:--------         |:------- |:-------
 title       | `String`  | 标题              |    --   |    --
 value       | `String`  | 右边内容文本      |    --   |    --
 is-link      | `Boolean` | 是否显示箭头符号  |  false   |  true

---
#### Slot
- cell-group

 名称    |  描述        
:----    | :---------- 
 --      | 自定义内容  

- cell

 名称       |  描述        
:----      | :---------- 
 --        | 自定义内容   
 title     | 自定义title  
 right-icon| 自定义右边icon