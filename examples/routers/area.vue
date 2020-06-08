<template>
  <div>
    <sq-cell title="选择省市区">
      <sq-switch v-model="isShow"></sq-switch>
    </sq-cell>
    <sq-cell
      title="当前值"
      :value="`${result[0] && result[0].name || ''}
      ${result[1] && result[1].name || ''}
      ${result[2] && result[2].name || ''}`"
    ></sq-cell>
    <br>
    <sq-button type="primary" size="small" @click="code = '330382'">设置code为330382</sq-button>
    <br>
    {{ code }}
    <sq-popup v-model="isShow" position="bottom">
      <sq-area
        v-model="code"
        title="选择地区"
        :area-data="areaData"
        :loading="loading"
        @on-confirm="onConfirm"
        @on-cancel="onCancel"
        @on-change="onChange"
      />
    </sq-popup>
  </div>
</template>

<script>
import areaData from '../mock/districts.js'

export default {
  name: '',

  data () {
    return {
      areaData,
      isShow: false,
      loading: false,
      result: {},
      code: '110113'
    }
  },

  methods: {
    onConfirm (value) {
      console.log(JSON.stringify(value))
      this.result = value
      this.isShow = !this.isShow
    },
    onCancel () {
      this.isShow = !this.isShow
    },
    onChange (value) {
      console.log(JSON.stringify(value))
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
