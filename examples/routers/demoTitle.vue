<template>
  <div class="demo-title" :class="classes">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'demo-title',

  props: {
    left: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    classes () {
      return {
        'demo-pdleft-15': this.left
      }
    }
  }
}
</script>

<style lang="scss">
.demo-title {
  padding: 25px 15px 7px;
  font-size: 14px;
  color: #666;
}
.demo-pdleft-15 {
  padding-left: 15px;
}
</style>
