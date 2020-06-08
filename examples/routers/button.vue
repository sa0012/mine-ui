<template>
  <div class="demo-page-wrap">
    <demo-title>基本</demo-title>
    <sq-button @click="clickHandle">普通按钮</sq-button>
    <sq-button size="large">块级按钮</sq-button>
    <sq-button size="large" disabled>禁用状态的按钮</sq-button>

    <demo-title>不同 type</demo-title>
    <sq-button @click="clickHandle">default</sq-button>
    <sq-button type="primary">primary</sq-button>
    <sq-button type="ghost">ghost</sq-button>

    <demo-title>不同 size</demo-title>
    <sq-button type="primary" size="small">small</sq-button>
    <sq-button type="primary">默认size</sq-button>
    <sq-button type="primary" size="large">large</sq-button>

    <demo-title>带 icon 或 img</demo-title>
    <sq-button type="ghost">默认</sq-button>
    <sq-button type="ghost" icon="loading">较小</sq-button>
    <sq-button type="ghost"><img src="../assets/logo.png" alt="" slot="icon" width="14px" height="14px">取消</sq-button>
  </div>
</template>

<script>
export default {
  name: '',

  data () {
    return {
    }
  },

  methods: {
    clickHandle () {
      alert('clickHandle')
    }
  }
}

</script>
<style lang='scss'>
</style>
