<template>
  <div>
    <demo-title>基础用法</demo-title>
    <sq-cell title="选中状态">
      <sq-switch v-model="isChecked1"/>
    </sq-cell>
    <sq-cell title="未选中状态">
      <sq-switch v-model="isChecked2"/>
    </sq-cell>
    <sq-cell title="选中下的禁用状态">
      <sq-switch v-model="isChecked3" disabled/>
    </sq-cell>
    <sq-cell title="未选中下的禁用状态">
      <sq-switch v-model="isChecked4" disabled/>
    </sq-cell>

    <demo-title>调整大小</demo-title>
    <sq-cell title="size=20px">
      <sq-switch v-model="isChecked5" size="20px"/>
    </sq-cell>
    <sq-cell title="size=40px">
      <sq-switch v-model="isChecked5" size="40px"/>
    </sq-cell>

  </div>
</template>

<script>
export default {
  name: '',

  data () {
    return {
      isChecked1: true,
      isChecked2: false,
      isChecked3: true,
      isChecked4: false,
      isChecked5: false
    }
  },

  methods: {}
}
</script>

<style lang="scss">
</style>
