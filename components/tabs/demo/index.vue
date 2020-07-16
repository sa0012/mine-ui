<template>
  <div class="tabs">
    <demo-title>基础用法</demo-title>
    <ml-tabs
      active="name1"
      font-size="14"
      title-height="40"
      sticky
      @change="handleChange"
      @disabled="handleDisabled"
    >
      <ml-tabpane title="第一年" name="name1">
        <div class="swiper">标签一的内容</div>
      </ml-tabpane>
      <ml-tabpane title="第二年" name="name2">
        <div class="swiper">标签二的内容</div>
      </ml-tabpane>
      <ml-tabpane title="第三年" name="name3">
        <div class="swiper">标签三的内容</div>
      </ml-tabpane>
      <ml-tabpane disabled title="第四年" name="name4">
        <div class="swiper">标签四的内容</div>
      </ml-tabpane>
      <ml-tabpane title="第五年" name="name5">
        <div class="swiper">标签五的内容</div>
      </ml-tabpane>
      <ml-tabpane title="第六年" name="name6">
        <div class="swiper">标签六的内容</div>
      </ml-tabpane>
      <ml-tabpane title="第七年" name="name7">
        <div class="swiper">标签七的内容</div>
      </ml-tabpane>
      <ml-tabpane title="第八年" name="name8">
        <div class="swiper">标签八的内容</div>
      </ml-tabpane>
    </ml-tabs>

    <demo-title>sticky</demo-title>
    <ml-tabs
      active="name1"
      font-size="14"
      animated
      sticky
      @change="handleChange"
      @disabled="handleDisabled"
    >
      <ml-tabpane title="第一年" name="name1">
        <div class="swiper">标签一的内容</div>
      </ml-tabpane>
      <ml-tabpane title="第二年" name="name2">
        <div class="swiper">标签二的内容</div>
      </ml-tabpane>
      <ml-tabpane title="第三年" name="name3">
        <div class="swiper">标签三的内容</div>
      </ml-tabpane>
    </ml-tabs>

    <demo-title>切换动画</demo-title>
    <ml-tabs
      active="name1"
      font-size="14"
      animated
      @change="handleChange"
      @disabled="handleDisabled"
    >
      <ml-tabpane title="第一年" name="name1">
        <div class="swiper">标签一的内容</div>
      </ml-tabpane>
      <ml-tabpane title="第二年" name="name2">
        <div class="swiper">标签二的内容</div>
      </ml-tabpane>
      <ml-tabpane title="第三年" name="name3">
        <div class="swiper">标签三的内容</div>
      </ml-tabpane>
    </ml-tabs>

    <demo-title>滑动切换</demo-title>
    <ml-tabs
      active="name1"
      font-size="14"
      animated
      swipeable
      @change="handleChange"
      @disabled="handleDisabled"
    >
      <ml-tabpane title="第一年" name="name1">
        <div class="swiper">标签一的内容</div>
      </ml-tabpane>
      <ml-tabpane title="第二年" name="name2">
        <div class="swiper">标签二的内容</div>
      </ml-tabpane>
      <ml-tabpane title="第三年" name="name3">
        <div class="swiper">标签三的内容</div>
      </ml-tabpane>
      <ml-tabpane disabled title="第四年" name="name4">
        <div class="swiper">标签四的内容</div>
      </ml-tabpane>
      <ml-tabpane disabled title="第五年" name="name5">
        <div class="swiper">标签五的内容</div>
      </ml-tabpane>
      <ml-tabpane title="第六年" name="name6">
        <div class="swiper">标签六的内容</div>
      </ml-tabpane>
      <ml-tabpane title="第七年" name="name7">
        <div class="swiper">标签七的内容</div>
      </ml-tabpane>
      <ml-tabpane title="第八年" name="name8">
        <div class="swiper">标签八的内容</div>
      </ml-tabpane>
    </ml-tabs>
  </div>
</template>

<script>
export default {
  name: '',

  data () {
    return {
      value: ''
    }
  },

  methods: {
    click (name, index) {
      console.log(name, index)
      this.$toast.loading('请求中...', -1)
      setTimeout(() => {
        this.$toast.hide()
        this.$refs.tabRef.setActivePane(index)
      }, 3000)
    },

    handleChange ({ name, index }) {
      this.$toast.text(name)
      console.log(name, index, 'index')
    },

    handleDisabled ({ name, index }) {
      this.$toast.text(`标题${name}被禁用了`)
    }
  }
}

</script>
<style lang='scss' scoped>
.tabs {
  p {
    margin: 0;
    padding: 0;
  }

  .swiper {
    width: 100%;
    height: 200px;
    line-height: 200px;
    text-align: center;
    font-size: 16px;
  }
}
</style>
