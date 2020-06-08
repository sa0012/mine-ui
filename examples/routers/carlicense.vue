<template>
  <div class="demo-page-wrap">
    <demo-title>基础用法  {{ provName1 }}{{ carNumber1 }}</demo-title>
    <sq-carlicense
      :province-name.sync="provName1"
      :car-number.sync="carNumber1"
      placeholder="请输入车牌号"
    />

    <demo-title>新能源标识</demo-title>
    <sq-carlicense
      :province-name.sync="provName2"
      :car-number.sync="carNumber2"
      placeholder="请输入车牌号"
    />
    
  </div>
</template>

<script>
export default {
  name: 'carlicense',

  data () {
    return {
      provName1: '沪',
      carNumber1: '',
      provName2: '沪',
      carNumber2: 'AF12345',
    }
  },

  methods: {}
}
</script>

<style>

</style>
