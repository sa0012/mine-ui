<template>
  <div>
    <demo-title>基础用法</demo-title>
    <ml-tabs active="name1" line-scale="0.6" font-size="14" title-height="40">
      <ml-tabpane title="第一年" name="name1">
        标签一的内容
      </ml-tabpane>
      <ml-tabpane title="第二年" name="name2">标签二的内容</ml-tabpane>
      <ml-tabpane title="第三年" name="name3">
        <p>标签三的内容</p><p>标签三的内容</p>
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
    }
  }
}

</script>
<style lang='scss' scoped>
.aaa {
  width: 100%;
  height: 100%;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: column;
  p {
    margin: 0;
    padding: 0;
  }
}
</style>
