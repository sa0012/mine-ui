<template>
  <div>
    <demo-title>基础用法</demo-title>
    <sq-cell title="从中间弹出">
      <sq-switch v-model="isShowDefault"></sq-switch>
    </sq-cell>

    <demo-title>自定义位置</demo-title>
    <sq-cell title="从上方弹出">
      <sq-switch v-model="isShowTop"></sq-switch>
    </sq-cell>
    <sq-cell title="从下方弹出">
      <sq-switch v-model="isShowBottom"></sq-switch>
    </sq-cell>
    <sq-cell title="从左侧弹出">
      <sq-switch v-model="isShowLeft"></sq-switch>
    </sq-cell>
    <sq-cell title="从右侧弹出">
      <sq-switch v-model="isShowRight"></sq-switch>
    </sq-cell>

    <sq-popup v-model="isShowDefault">default</sq-popup>
    <sq-popup v-model="isShowLeft" :close-on-click-overlay="false" position="left">
      <sq-button type="primary" size="small" @click="isShowLeft = !isShowLeft">关闭</sq-button>
    </sq-popup>
    <sq-popup v-model="isShowRight" position="right">右侧弹出</sq-popup>
    <sq-popup v-model="isShowTop" :hide-mask="true" position="top">
      <sq-notice-bar text="为了确保您的资金安全，请设置支付密码"/>
    </sq-popup>
    <sq-popup v-model="isShowBottom" position="bottom">
      <div style="padding: 40px;">
        底部弹出
      </div>
    </sq-popup>
  </div>
</template>

<script>
export default {
  name: '',

  data () {
    return {
      isShowDefault: false,
      isShowLeft: false,
      isShowRight: false,
      isShowTop: false,
      isShowBottom: false
    }
  },

  methods: {
    onShowTop () {
      this.isShowTop = !this.isShowTop
      setTimeout(() => {
        this.isShowTop = !this.isShowTop
      }, 3000)
    }
  }
}
</script>

<style lang="css">
</style>
