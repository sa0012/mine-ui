<template>
  <div>
    <demo-title>基础用法</demo-title>
    <sq-cell title="基础用法">
      <sq-stepper v-model="val1" min="6" max="8"/>
    </sq-cell>

    <demo-title>禁用输入框</demo-title>
    <sq-cell title="readonly-input">
      <sq-stepper readonly-input v-model="val2" step=".5" min="2" />
    </sq-cell>
  </div>
</template>

<script>
export default {
  name: '',

  data () {
    return {
      val1: 8,
      val2: 3
    }
  },

  methods: {}
}
</script>

<style lang="scss">
</style>
