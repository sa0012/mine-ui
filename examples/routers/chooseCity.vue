<template>
  <div class="choose-city">
    <sq-cell-group title="选择城市">
      <sq-cell title="选择城市" is-link :value="cityData.name" @click.native="chooseCity"></sq-cell>
    </sq-cell-group>
    <!--:showCity.sync="showChooseCity"-->
    <!--v-model="showChooseCity"-->
    <choose-city :chooseCityData="chooseCityData" @cityNameCode="getCityData" v-model="showChooseCity" :currentCity="currentCity"></choose-city>
  </div>
</template>

<script>
import chooseCity from '../mock/chooseCity.json'
export default {
  data() {
    return {
      chooseCityData: chooseCity.result,
      cityData: {},
      currentCity: '上海',
      showChooseCity: false
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


