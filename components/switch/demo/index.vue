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
    <ml-cell title="size=20">
      <ml-switch v-model="isChecked5" size="20"/>
    </ml-cell>
    <ml-cell title="size=40">
      <ml-switch v-model="isChecked6" size="40"/>
    </ml-cell>

    <demo-title>调整大小</demo-title>
    <ml-cell title="animation">
      <ml-switch animation v-model="isChecked5" />
    </ml-cell>
    <ml-cell title="animation">
      <ml-switch animation v-model="isChecked6" size="40"/>
    </ml-cell>

    <demo-title>设置背景色</demo-title>
    <ml-cell title="设置背景色">
      <ml-switch
        open-color="red"
        close-color="blue"
        v-model="isChecked7" />
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
      isChecked5: false,
      isChecked6: false,
      isChecked7: false
    }
  },

  methods: {}
}
</script>

<style lang="scss">
</style>
