<template>
  <div class="infinite">
    <ml-infinite-scroll>
      <ml-cell
        v-for="item in count"
        :key="item"
        :title="`标题${item}`"
      />
    </ml-infinite-scroll>
  </div>
</template>

<script>
export default {
  data () {
    return {
      count: 15
    }
  }
}
</script>

<style>

</style>