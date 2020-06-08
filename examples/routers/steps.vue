<template>
  <div class="demo-page-wrap">
    <sq-steps :active="active">
      <sq-step-item>登录登录</sq-step-item>
      <sq-step-item>开通开通</sq-step-item>
      <sq-step-item>验证验证</sq-step-item>
      <sq-step-item>成功成功</sq-step-item>
    </sq-steps>

    <p>
      <sq-button @click="next" type="primary" size="small">next</sq-button>
    </p>
  </div>
</template>

<script>
export default {
  name: '',

  data () {
    return {
      active: 1
    }
  },

  methods: {
    next () {
      this.active = ++this.active % 4
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
