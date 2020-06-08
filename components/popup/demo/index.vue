<template>
  <div class="button">
    <img src="./logo.png" alt="">
    <!-- <demo-title>基本</!-->
    <!-- <ml-button @click="clickHandle">普通按钮</ml-button>
    <ml-button size="large">块级按钮</ml-button>
    <ml-button size="large" disabled>禁用状态的按钮</ml-button> -->

    <!-- <demo-title>不同 type</demo-title>
    <ml-button @click="clickHandle">default</ml-button>
    <ml-button type="primary">primary</ml-button>
    <ml-button type="ghost">ghost</ml-button>
    <ml-button type="info">info</ml-button>
    <ml-button type="danger">danger</ml-button>
    <ml-button type="warning">warning</ml-button>

    <demo-title>不同 size</demo-title>
    <ml-button type="primary" size="small">small</ml-button>
    <ml-button type="primary">默认size</ml-button>
    <ml-button type="primary" size="large">large</ml-button>

    <demo-title>带 icon 或 img</demo-title>
    <ml-button type="ghost">默认</ml-button>
    <ml-button type="ghost" icon="loading">较小</ml-button> -->
    <ml-button type="ghost">
      <div slot="icon">
        <img src="./logo.png" alt="">
        具名插槽
      </div>
    </ml-button>
    <!-- <ml-popup
      v-model="showTop"
      position="center"
      :style="{ height: '20%' }" /> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      icon: require('./logo.png')
    }
  },

  methods: {
    clickHandle () {
      alert('clickHandle')
    }
  }
}
</script>

<style scoped lang="scss">
.button {
  padding: 10px;
  box-sizing: border-box;

  /deep/ .ml-button {
    margin: 5px;
  }
}
</style>
