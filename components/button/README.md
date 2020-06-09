### Button - 按钮
---
#### 按需引入

```js
import { Button } from '@insaic/neon'
Vue.use(Button)
```

#### 例子 [demo源码](https://github.com/insaic/neon/blob/dev/examples/routers/button.vue)
```html
<!-- 改变样式 -->
<ml-button type="default">default</ml-button>
<ml-button type="primary">primary</ml-button>
<ml-button type="ghost">ghost</ml-button>
<!-- 改变大小 -->
<ml-button size="default">default</ml-button>
<ml-button size="large">large</ml-button>
<ml-button size="small">small</ml-button>
<!-- 绑定click事件-->
<ml-button @click="handleClick">click</ml-button>
```
---
#### Props
 名称     | 类型       | 说明     | 默认值   | 可选值         
:-------- |:--------- |:-------- |:------- |:-------------- 
 type     | `String`  | 类型     | default | default、primary、info、warning、danger 
 size     | `String`  | 大小     | default | large、small， normal， mini   
 disabled | `Boolean` | 禁用状态  | false   | true          
 tag | `Boolean` | 标签名  | button   | html合法标签名          
 htmlType | `Boolean` | type类型  | button   | --          

---

#### Slot
 名称 |  描述        
:---- | :---------- 
 --   | 显示文本内容 
 icon | 自定义图标   
