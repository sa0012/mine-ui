<template>
  <div class="choose-city">
    <!-- <ml-cell-group title="选择城市">
      <ml-cell title="选择城市" is-link :value="cityData.name" @click.native="chooseCity"></ml-cell>
    </ml-cell-group> -->
    <!-- <choose-city :chooseCityData="chooseCityData" @cityNameCode="getCityData" v-model="showChooseCity" :currentCity="currentCity"></choose-city> -->
    <!-- <ml-indexbar
      :indexList="chooseCityData"
    /> -->
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
  </div>
</template>

<script>
import chooseCity from '../../../src/mock/chooseCity'
export default {
  data() {
    const indexList = [];
    const charCodeOfA = 'A'.charCodeAt(0);
    for (let i = 0; i < 26; i++) {
      indexList.push(String.fromCharCode(charCodeOfA + i));
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
    chooseCity() {
      this.showChooseCity = true
    },
    getCityData(city) {
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
  mounted() {
  }
}
</script>

<style lang="scss">
</style>


