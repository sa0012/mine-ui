### Rater - 评分
---
#### 按需引入

```js
import { Rater } from '@insaic/neon'
Vue.use(Rater)
```

#### 例子 [demo源码](https://github.com/insaic/neon/blob/dev/examples/routers/rater.vue)
```html
<template>
  <div class="demo-page-wrap">
    <div class="rater-wrap">
      <demo-title>set min</demo-title>
      <ml-rater :min="min" @getScore="getScore1">
      </ml-rater>
      <p>评分： {{ score1 }}</p>
    </div>
    <div class="rater-wrap">
      <demo-title>set max</demo-title>
      <ml-rater :max="max" @getScore="getScore2">
      </ml-rater>
      <p>评分： {{ score2 }}</p>
    </div>
    <div class="rater-wrap">
      <demo-title>set value</demo-title>
      <ml-rater :value="value" @getScore="getScore3">
      </ml-rater>
      <p>评分： {{ score3 || value }}</p>
    </div>
    <div class="rater-wrap">
      <demo-title>set fontSize</demo-title>
      <ml-rater :fontSize="fontSize" @getScore="getScore4">
      </ml-rater>
      <p>评分： {{ score4 }}</p>
    </div>
    <div class="rater-wrap">
      <demo-title>set disabled = true</demo-title>
      <ml-rater :disabled="disabled" :fontSize="fontSize">
      </ml-rater>
    </div>
    <div class="rater-wrap">
      <demo-title>set activeColor</demo-title>
      <ml-rater 
        :fontSize="fontSize" 
        :activeColor="activeColor">
      </ml-rater>
    </div>
    <div class="rater-wrap">
      <demo-title>set defaultColor</demo-title>
      <ml-rater 
        :fontSize="fontSize" 
        :defaultColor="defaultColor"
        :activeColor="activeColor">
      </ml-rater>
    </div>
    <div class="rater-wrap">
      <demo-title>set charsetIcon</demo-title>
      <ml-rater 
        :fontSize="fontSize" 
        :defaultColor="defaultColor"
        :activeColor="activeColor1"
        :charsetIcon="charsetIcon">
      </ml-rater>
      <ml-rater 
        :fontSize="fontSize" 
        :defaultColor="defaultColor"
        :activeColor="activeColor1"
        :charsetIcon="charsetIcon1">
      </ml-rater>
      <ml-rater 
        :fontSize="fontSize" 
        :defaultColor="defaultColor"
        :activeColor="activeColor1"
        :charsetIcon="charsetIcon2">
      </ml-rater>
    </div>
  </div>
</template>

<script>
export default {
  name: '',

  data() {
    return {
      min: 3,
      max: 10,
      fontSize: '40',
      disabled: true,
      activeColor: 'green',
      activeColor1: '#f31212',
      defaultColor: '#666',
      value: 2,
      score1: 0,
      score2: 0,
      score3: 0,
      score4: 0,
      charsetIcon: 'flower',
      charsetIcon1: 'love',
      charsetIcon2: 'smile'
    }
  },

  methods: {
    getScore1(score) {
      this.score1 = score
    },
    getScore2(score) {
      this.score2 = score
    },
    getScore3(score) {
      this.score3 = score
    },
    getScore4(score) {
      this.score4 = score
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
  width: 100%;
  height: 40px;
  line-height: 40px;
  background: #fff;
  color: #666;
  padding-left: 15px;
  margin-bottom: 15px;
}

.rater-wrap {
  margin-bottom: 15px;
}
</style>
```
---
#### Props
| 名称        | 类型       | 说明                | 默认值   | 可选值         |
|:----------- |:--------- |:------------------- |:------- |:-------------- |
| min       | `Number` | 设置最小值   |     0    |               |
| max        | `Number`   | 设置最大值             |   5      |               |
| value        | `Number`   | 设置默认值             |   --      |               |
| fontSize        | `Number`   | 设置字体大小             |   16      |               |
| disabled        | `Number`   | 是否禁用             |   false      |               |
| activeColor        | `String`   | 设置选中时的字体颜色             |   --      |               |
| defaultColor        | `String`   | 设置未选中时的字体颜色             |   --      |               |
| charsetIcon        | `String`   | 设置展示的字符类型（目前只支持四种）             |   `star`      |         `love, flower, smile`      |

---

#### Event
| 名称       | 参数  | 描述                             |
|:---------- |:---- |:-------------------------------- |
| getScore    | score | 返回对应所选的分数 |