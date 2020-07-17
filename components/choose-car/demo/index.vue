<template>
  <div class="choose-car">
    <demo-title>基础用法</demo-title>
    <ml-choose-car
      :brand="brand"
      :category="category"
      :mode="mode"
      :index-list="indexList"
      :carIcon="carIcon"
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
      category,
      mode,
      carIcon: {}
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
  },

  mounted () {
    this.getImageUrl(brand.result)
    console.log(this.carIcon, 'car-icon')
  }
}
</script>

<style>

</style>