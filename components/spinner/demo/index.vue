<template>
  <div class="spinner">
    <div v-for="item in 8" :key="item">
      <demo-title>模式-{{item}}</demo-title>
      <ml-spinner slot="right-icon" :type="item" />
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.spinner {}
</style>
