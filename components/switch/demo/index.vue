<template>
  <div>
    <demo-title>基础用法</demo-title>
    <ml-cell title="选中状态">
      <ml-switch v-model="isChecked1"/>
    </ml-cell>
    <ml-cell title="未选中状态">
      <ml-switch v-model="isChecked2"/>
    </ml-cell>
    <ml-cell title="选中下的禁用状态">
      <ml-switch v-model="isChecked3" disabled/>
    </ml-cell>
    <ml-cell title="未选中下的禁用状态">
      <ml-switch v-model="isChecked4" disabled/>
    </ml-cell>

    <demo-title>调整大小</demo-title>
    <ml-cell title="size=20px">
      <ml-switch v-model="isChecked5" size="20px"/>
    </ml-cell>
    <ml-cell title="size=40px">
      <ml-switch v-model="isChecked5" size="40px"/>
    </ml-cell>

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
