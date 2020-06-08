<template>
  <div>
    <demo-title left>基础用法</demo-title>
    <sq-notice-bar text="为了确保您的资金安全，请设置支付密码"/>

    <demo-title left>通知模式</demo-title>
    <sq-notice-bar text="为了确保您的资金安全，请设置支付密码" mode="close"/>
    <br>
    <sq-notice-bar
      text="为了确保您的资金安全，请设置支付密码。。。为了确保您的资金安全，请设置支付密码。。。为了确保您的资金安全，请设置支付密码"
      mode="link"
    />
  </div>
</template>

<script>
export default {
  name: '',

  data () {
    return {
    }
  },

  methods: {}
}
</script>

<style lang="scss">
</style>
