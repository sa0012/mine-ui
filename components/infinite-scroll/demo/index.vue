<template>
  <div class="infinite">
    <ml-tabs
      active="name1"
      font-size="14"
      title-height="40"
      sticky
    >
      <ml-tabpane title="基础用法" name="name1">
        <ml-infinite-scroll
          @loadmore="onInfinite"
          :is-show-mod="true"
          :has-more="isHasMore"
          :is-loading="isLoading"
          :error.sync="isErr"
          :threshold="200"
        >
          <ml-cell
            v-for="item in count"
            :key="item"
            :title="`标题${item}`"
          />
        </ml-infinite-scroll>
      </ml-tabpane>
      <ml-tabpane title="包裹在容器内" name="name2">
        <section class="container">
          <ml-infinite-scroll
            @loadmore="onInfinite1"
            :is-show-mod="true"
            :has-more="isHasMore1"
            :use-window="false"
            :is-loading="isLoading1"
            :threshold="100"
          >
            <ml-cell
              v-for="item in count1"
              :key="item"
              :title="`内置容器${item}`"
            />
          </ml-infinite-scroll>
        </section>
      </ml-tabpane>
    </ml-tabs>
  </div>
</template>

<script>
export default {
  data () {
    return {
      count: 15,
      count1: 10,
      page: 1,
      page1: 1,
      isHasMore: true,
      isHasMore1: true,
      isLoading: false,
      isLoading1: false,
      isErr: false,
      isErr1: false,
      timer: null,
      timer1: null
    }
  },

  methods: {
    onInfinite () {
      this.isLoading = true
      this.timer = setTimeout(() => {
        if (this.page <= 5) {
          this.count += 15
          this.page += 1
          if (this.page === 2) {
            this.isErr = true
          }
        } else {
          this.isHasMore = false
        }
        this.isLoading = false
      }, 1000)
    },

    onInfinite1 () {
      this.isLoading1 = true
      this.time1 = setTimeout(() => {
        if (this.page1 <= 5) {
          this.count1 += 10
          this.page1 += 1
        } else {
          this.isHasMore1 = false
        }
        this.isLoading1 = false
      }, 1000)
    }
  },

  destroyed () {
    clearTimeout(this.timer)
    clearTimeout(this.timer1)
  }
}
</script>

<style lang="scss" scoped>
.container {
  height: 200px;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}
</style>
