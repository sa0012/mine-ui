<template>
  <div class="sticky">
    <demo-title>基础用法</demo-title>
    <ml-sticky>
      <ml-button type="primary">测试图钉</ml-button>
    </ml-sticky>

    <demo-title>距离顶部50px吸顶</demo-title>
    <ml-sticky offsetTop="50">
      <ml-button type="primary" style="margin-left: 100px;">测试图钉</ml-button>
    </ml-sticky>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
.sticky {
  height: 1000px;
}
</style>
