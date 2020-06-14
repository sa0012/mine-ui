<template>
  <div>
    <demo-title>基础用法</demo-title>
    <ml-cell title="显示弹层" value="显示" @click="showOverlay('show1')" />
    <ml-cell title="显示内容 " value="显示" @click="showOverlay('show2')" />
    <ml-overlay
      :show="show1"
      @click="show1 = false"
    />
    <ml-overlay
      :show="show2"
      @click="show2 = false"
    >
      <div class="overlay-content">这是内容区域</div>
    </ml-overlay>
  </div>
</template>

<script>
export default {
  name: 'demo-overlay',

  data () {
    return {
      show1: false,
      show2: false
    }
  },

  methods: {
    showOverlay (type) {
      console.log(type, 'type')
      this[type] = true
    }
  }
}
</script>

<style lang="scss" scoped>
.overlay {
  &-content {
    position: fixed;
    top: 50%;
    left: 50%;
    text-align: center;
    line-height: 120px;
    transform: translate3d(-50%, -50%, 0);
    width: 80%;
    height: 120px;
    background-color: #fff;
  }
}
</style>
