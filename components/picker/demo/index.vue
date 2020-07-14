<template>
  <div class="picker">
    <demo-title>基础用法</demo-title>
    <ml-picker
      show-toolbar
      title="标题"
      ref="pickerRef1"
      :columns="list1"
    />

    <nut-picker
      :is-visible="isVisible2"
      title="请选择城市"
      :default-value-data="defaultValueData"
      :list-data="listData0"
    ></nut-picker>
  </div>
</template>

<script>
import NutPicker from './picker'
export default {
  data () {
    return {
      isVisible2: true,
      defaultValueData: '',
      list1: ['北京', '上海', '广州', '深圳', '重庆', '杭州', '天津', '南京', '温州'],
      listData0: [
        [
          '2010',
          '2011',
          '2012',
          '2013',
          '2014',
          '2015',
          '2016',
          '2017',
          '2018',
          '2019',
          '2020',
          '2021',
          '2022',
          '2023',
          '2024',
          '2025',
          '2026',
          '2027',
          '2028',
          '2029',
          '2030',
          '2031',
          '2032',
          '2033',
          '2034',
          '2035',
          '2036',
          '2037',
          '2038',
          '2039'
        ],
        ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
      ]
    }
  },

  components: {
    NutPicker
  }
}
</script>

<style>

</style>
