<template>
  <div class="choose-city">
    <ml-tabs
      active="name1"
      font-size="14"
    >
      <ml-tabpane title="第一年" name="name1">
        <ml-index-bar>
          <div
            v-for="index in indexList"
            :key="index"
          >
            <ml-index-anchor :index="index" />
            <ml-cell title="文本" />
            <ml-cell title="文本" />
            <ml-cell title="文本" />
          </div>
        </ml-index-bar>
      </ml-tabpane>
      <ml-tabpane title="第二年" name="name2">
        <div class="swiper">标签二的内容</div>
      </ml-tabpane>
      <ml-tabpane title="第三年" name="name3">
        <div class="swiper">标签三的内容</div>
      </ml-tabpane>
    </ml-tabs>
    <!-- <ml-index-bar>
      <div
        v-for="index in indexList"
        :key="index"
      >
        <ml-index-anchor :index="index" />
        <ml-cell title="文本" />
        <ml-cell title="文本" />
        <ml-cell title="文本" />
      </div>
    </ml-index-bar> -->
  </div>
</template>

<script>
import chooseCity from '../../../src/mock/chooseCity'
export default {
  data () {
    const indexList = []
    const charCodeOfA = 'A'.charCodeAt(0)
    for (let i = 0; i < 26; i++) {
      indexList.push(String.fromCharCode(charCodeOfA + i))
    }
    return {
      chooseCityData: chooseCity.result,
      cityData: {},
      currentCity: '上海',
      showChooseCity: false,
      indexList
    }
  },
  methods: {
    chooseCity () {
      this.showChooseCity = true
    },
    getCityData (city) {
      this.cityData = city
    }
  },
  beforeRouteLeave (to, from, next) {
    if (this.showChooseCity) {
      this.showChooseCity = false
      next(false)
    } else {
      next()
    }
  },
  mounted () {
  }
}
</script>

<style lang="scss">
</style>
