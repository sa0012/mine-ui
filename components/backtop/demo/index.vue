<template>
<div class="backtop">
  <ml-tabs
    active="name1"
    sticky
  >
    <ml-tabpane title="window测试" name="name1">
      <ml-cell-group label="backtop">
        <ml-cell
          v-for="item in 40"
          :key="item"
          :title="`基础测试内容${item}`"
        />

        <ml-backtop />
        <ml-backtop
          type="square"
          bottom="80"
        />
      </ml-cell-group>
    </ml-tabpane>
    <ml-tabpane title="容器测试" name="name2">
      <section
        ref="scroller"
        class="box">
        <ml-cell
          v-for="item in 40"
          :key="item"
          :title="`基础测试内容${item}`"
        />

        <ml-backtop
          :scroller="`.box`"
        />
        <ml-backtop
          type="square"
          bottom="80"
          :scroller="getScroller"
        />
      </section>
    </ml-tabpane>
  </ml-tabs>
</div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  mounted () {},

  methods: {
    getScroller () {
      return this.$refs.scroller
    }
  }
}
</script>

<style lang="scss" scoped>
.box {
  height: 400px;
  overflow: auto;
}
</style>
