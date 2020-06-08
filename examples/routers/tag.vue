<template>
  <div class="demo-page-wrap">
    <demo-title>基础样式</demo-title>
    <div>
      <sq-tag>标签</sq-tag>
      <sq-tag type="primary">标签</sq-tag>
      <sq-tag type="success">标签</sq-tag>
      <sq-tag type="error">标签</sq-tag>
    </div>

    <demo-title>圆角样式</demo-title>
    <div>
      <sq-tag shape="circle">标签</sq-tag>
      <sq-tag shape="circle" type="primary">标签</sq-tag>
      <sq-tag shape="circle" type="success">标签</sq-tag>
      <sq-tag shape="circle" type="error">标签</sq-tag>
    </div>

    <demo-title>空心样式</demo-title>
    <div>
      <sq-tag plain>标签</sq-tag>
      <sq-tag plain type="primary">标签</sq-tag>
      <sq-tag plain type="success">标签</sq-tag>
      <sq-tag plain type="error">标签</sq-tag>
    </div>

    <demo-title>空心圆角样式</demo-title>
    <div>
      <sq-tag plain shape="circle">标签</sq-tag>
      <sq-tag plain shape="circle" type="primary">标签</sq-tag>
      <sq-tag plain shape="circle" type="success">标签</sq-tag>
      <sq-tag plain shape="circle" type="error">标签</sq-tag>
    </div>
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
