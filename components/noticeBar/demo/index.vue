<template>
  <div>
    <demo-title left>基础用法</demo-title>
    <ml-notice-bar
      :scrollable="false"
      message="为了确保您的资金安全，请设置支付密码"
    />
    <br>
    <ml-notice-bar
      :scrollable="false"
      left-icon="alert-full"
      type="success"
      message="为了确保您的资金安全，请设置支付密码"
      mode="close"
    />
    <br>
    <ml-notice-bar
      :scrollable="false"
      type="danger"
      left-icon="alert-full"
      message="为了确保您的资金安全，请设置支付密码"
      mode="close"
    />
    <br>
    <ml-notice-bar
      :scrollable="false"
      type="warning"
      left-icon="alert-full"
      message="为了确保您的资金安全，请设置支付密码"
      mode="close"
    />
    <br>
    <ml-notice-bar
      :scrollable="false"
      background="#d0eefb"
      color="#1989fa"
      left-icon="alert-full"
      right-icon="error-empty"
      message="为了确保您的资金安全，请设置支付密码"
    />
    <br>
    <demo-title>文本溢出、多行文本模式</demo-title>
    <ml-notice-bar
      type="warning"
      :scrollable="false"
      message="为了确保您的资金安全，请设置支付密码，为了确保您的资金安全，请设置支付密码，为了确保您的资金安全，请设置支付密码"
    />
    <br>
    <ml-notice-bar
      type="warning"
      wrapable
      :scrollable="false"
      message="为了确保您的资金安全，请设置支付密码，为了确保您的资金安全，请设置支付密码，为了确保您的资金安全，请设置支付密码"
    />
    <br>

    <demo-title left>滚动模式</demo-title>
    <ml-notice-bar
      scrollable
      message="为了确保您的资金安全，请设置支付密码"
      mode="link"
    />
    <br>
    <ml-notice-bar
      left-icon="alert-full"
      message="为了确保您的资金安全，请设置支付密码。。。为了确保您的资金安全，请设置支付密码。。。为了确保您的资金安全，请设置支付密码"
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
