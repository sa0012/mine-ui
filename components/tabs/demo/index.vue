<template>
  <div class="tabs">
    <demo-title>基础用法</demo-title>
    <ml-tabs
      active="name1"
      line-scale="0.6"
      font-size="14"
      title-height="40"
      @change="handleChange"
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
      <ml-tabpane title="第四年" name="name4">
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

    <!-- <demo-title>默认选中&手动切换tab</demo-title>
    <ml-tabs ref="tabRef" active="name3" :auto-active="false" hide-line @click="click">
      <ml-tabpane label="标签一" name="name1">标签一的内容</ml-tabpane>
      <ml-tabpane label="标签二" name="name2">标签二的内容</ml-tabpane>
      <ml-tabpane label="标签三" name="name3">标签三的内容</ml-tabpane>
      <ml-tabpane label="标签四" name="name4">
        <p>标签四的内容</p><p>标签四的内容</p>
      </ml-tabpane>
    </ml-tabs>

    <demo-title>type为block，自定义title为多行</demo-title>
    <ml-tabs active="name3" type="block">
      <ml-tabpane label="标签一" name="name1">
        <template slot="title">
          <div class="aaa">
            <p>123</p>
            <p>456</p>
          </div>
        </template>
        标签一的内容
      </ml-tabpane>
      <ml-tabpane label="标签二" name="name2">标签二的内容</ml-tabpane>
      <ml-tabpane label="标签三" name="name3">标签三的内容</ml-tabpane>
      <ml-tabpane label="标签四" name="name4">
        <p>标签四的内容</p><p>标签四的内容</p>
        <p>标签四的内容</p><p>标签四的内容</p>
        <p>标签四的内容</p><p>标签四的内容</p>
      </ml-tabpane>
    </ml-tabs> -->
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
