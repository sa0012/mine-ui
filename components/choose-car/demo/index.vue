<template>
  <div class="choose-car">
    <!-- <demo-title>基础用法</demo-title> -->
    <ml-choose-car
      :brand="brand"
      :category="category"
      :mode="mode"
      :index-list="indexList"
      :carIcon="carIcon"
      @loadmore="onInfinite"
      :is-show-mod="true"
      :has-more="isHasMore"
      :is-loading="isLoading"
      :error.sync="isErr"
      :threshold="200"
      :use-window="false"
      @selectCategory="selectCategoryHandler"
      @selectMode="selectModeHandler"
    />
  </div>
</template>

<script>
import brand from '../../../src/mock/chooseCar'
import category from '../../../src/mock/selectCar'
import mode from '../../../src/mock/selectModel'
export default {
  data () {
    return {
      category: [],
      mode: [],
      carIcon: {},
      isLoading: false,
      count: 15,
      count1: 10,
      page: 1,
      isHasMore: true,
      isErr: false,
      timer: null
    }
  },

  computed: {
    brand () {
      let result = brand.result || {}
      const brandList = Object.values(result)
      return brandList
    },
    indexList () {
      let result = brand.result || {}
      const indexList = Object.keys(result)
      return indexList
    }
  },

  methods: {
    // 动态加载图片资源
    getImageUrl (carsData) {
      console.log(carsData, 'cars')
      for (let key in carsData) {
        carsData[key].forEach((item, index) => {
          let img = require(`../../../examples/assets/images/car-logo/${key}/${item.brandCategoryCode}.jpg`)
          this.$set(this.carIcon, item.brandCategoryCode, img)
        })
      }
    },

    selectCategoryHandler (options = {}) {
      // 执行车系分类数据请求
      this.category = category.result
    },

    selectModeHandler (options = {}) {
      this.mode.push(...mode.result.content)
    },

    onInfinite () {
      this.isLoading = true
      this.timer = setTimeout(() => {
        if (this.page <= 5) {
          console.log(12334455555)
          this.selectModeHandler()
          this.page += 1
        } else {
          this.isHasMore = false
        }
        this.isLoading = false
      }, 1000)
    }
  },

  mounted () {
    this.getImageUrl(brand.result)
  },

  destroyed () {
    clearTimeout(this.timer)
  }
}
</script>

<style>

</style>
