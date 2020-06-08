<template>
  <div>
    <sq-cell-group title="选车组件">
      <sq-cell title="选车组件" is-link :value="modelName" @click.native="chooseCar"></sq-cell>
    </sq-cell-group>
    <!--:showChooseCar.sync="showChooseCar"-->
    <!--v-model="showChooseCar"-->
    <brand-cars 
      :loadMoreArr="loadMoreArr" 
      :carsData="carsData" 
      :selectCar="selectCar" 
      :selectModel="selectModel"
      :imgConfig="imgConfig"
      v-model="showChooseCar"
      @brandCategoryCode="getBrandCategoryCode" 
      @brandModelId="getBrandModelId" 
      @loadMore="getLoadMore" 
      @carDetail="getCarDetail"
      @searchOption="getSearchOption"
      @searchLoadMore="getSearchLoadMore">
    </brand-cars>
  </div>
</template>

<script>
import carsData from '../mock/chooseCar.json'
import selectCar from '../mock/selectCar.json'
import selectModel from '../mock/selectModel.json'
import searchCar from '../mock/searchCar.json'
// import imgUrl from '../filter/imgConfig.js'

console.log(carsData.result, 233444)

export default {
  name: 'chooseCar',

  data() {
    return {
      showChooseCar: false,
      carsData: carsData.result,
      searchCarArr: searchCar.result.content,
      selectCar: [],
      selectModel: [],
      brandCategoryCode: '',
      code: '',
      loadMoreArr: [],
      modelName: '',
      searchLoadMoreArr: [],
      imgConfig: {}
    }
  },
  methods: {
    // 动态加载图片资源
    getImageUrl (carsData) {
      for (let key in carsData) {
        carsData[key].forEach((item, index) => {
          import(`../assets/images/car-logo/${key}/${item.brandCategoryCode}.jpg`)
            .then(res => {
              this.imgConfig[item.brandCategoryCode] = res
            })
        })
      }
    },
    // 获取车系数据的方法
    getSelectCar(code) {
      this.selectCar = selectCar.result
    },
    // 获取车型数据的方法
    getSelectModel(brandId, familyId) {
      this.selectModel = selectModel.result.content
    },
    // 点击品牌后$emit抛出的方法， 在此处传递车系数据
    getBrandCategoryCode(code) {
      this.brandCategoryCode = code
      this.getSelectCar(code)
    },
    // 点击车系后$emit抛出的方法， 在此处传递车型数据
    getBrandModelId({ brandId, familyId }) {
      this.getSelectModel(brandId, familyId)
    },
    // 车型页面分页函数
    getLoadMore(callback) {
      console.log('this is a loadmore function')
      this.loadMoreArr = selectModel.result.content
      setTimeout(() => {
        callback(this.loadMoreArr)
        // callback([])
      }, 200)
      // callback(this.loadMoreArr)
    },
    // 搜索页面分页函数
    getSearchLoadMore (callback) {
      this.searchLoadMoreArr = this.searchCarArr
      callback(this.searchLoadMoreArr)
    },
    // 流程执行完毕返回数据对象
    getCarDetail(detail) {
      console.log(detail)
      this.modelName = detail.modelName
    },
    // 选车弹窗弹起
    chooseCar() {
      this.showChooseCar = true
    },
    // 搜索车型品牌的方法
    searchCar(option, callback) {
      if (option === 'aaaaa') {
        callback([])
      } else {
        callback(this.searchCarArr)
      }
      // callback(this.searchCarArr)
    },
    // 获取用户输入的车型品牌字段
    getSearchOption(option, callback) {
      console.log(option, 1234)
      this.searchCar(option, callback)
    }
  },
  // 从弹窗返回时避免直接返回到上一页面
  beforeRouteLeave (to, from, next) {
    if (this.showChooseCar) {
      this.showChooseCar = false
        next(false)
      } else {
        next()
    }
  },
  mounted () {
    this.getImageUrl(this.carsData)
  }
}
</script>

<style lang="scss" scoped>
.button {
  width: 100%;
  height: 40px;
  border-radius: 3px;
  line-height: 40px;
  text-align: center;
  background: #fff;
}
</style>

