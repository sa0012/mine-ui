<template>
  <div>
    <demo-title left>基础用法</demo-title>
    <sq-submit-bar
      label="保费："
      price="3000"
      button-text="立即投保"
      @submit="onSubmit"
    />
    <demo-title left>禁止提交状态</demo-title>
    <sq-submit-bar
      disabled
      label="保费："
      price="3000"
      button-text="立即投保"
      @submit="onSubmit"
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

  methods: {
    onSubmit () {
      alert('onSubmit')
    }
  }
}
</script>

<style lang="scss">
</style>
