<template>
  <div>
    <demo-title>基础用法</demo-title>
    <ml-cell title="从中间弹出" value="显示" @click="isShowDefault = true" />

    <demo-title>自定义位置</demo-title>
    <ml-cell title="从上方弹出" value="显示" @click="isShowTop = true" />
    <ml-cell title="从下方弹出" value="显示" @click="isShowBottom = true" />
    <ml-cell title="从左侧弹出" value="显示" @click="isShowLeft = true" />
    <ml-cell title="从右侧弹出" value="显示" @click="isShowRight = true" />
    <ml-cell title="hideMask" value="显示" @click="isShowHide = true" />

    <ml-popup v-model="isShowDefault">default</ml-popup>
    <ml-popup v-model="isShowLeft" :close-on-click-overlay="false" position="left">
      <ml-button type="primary" size="small" @click="isShowLeft = !isShowLeft">关闭</ml-button>
    </ml-popup>
    <ml-popup v-model="isShowRight" position="right">右侧弹出</ml-popup>
    <ml-popup v-model="isShowTop" position="top">
       <div style="padding: 40px;">
        上部弹出
        </div>
    </ml-popup>
    <ml-popup v-model="isShowBottom" position="bottom">
      <div style="padding: 40px;">
        底部弹出
      </div>
    </ml-popup>
    <ml-popup v-model="isShowHide" :hide-mask="true" position="bottom">
      <div style="padding: 40px;">
        没有遮罩层
      </div>
    </ml-popup>
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
      isShowBottom: false,
      isShowHide: false
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
