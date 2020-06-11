<template>
  <div>
    <demo-title left>基础用法</demo-title>
    <ml-cell>
      <template slot="title">
        <ml-radio-group v-model="value1" @change="change">
          <ml-radio name="pt">普通</ml-radio>
        </ml-radio-group>
      </template>
    </ml-cell>

    <ml-cell>
      <template slot="title">
        <ml-radio-group v-model="value2" @change="change">
          <ml-radio name="mrxz">默认选中</ml-radio>
        </ml-radio-group>
      </template>
    </ml-cell>

    <ml-cell>
      <template slot="title">
        <ml-radio-group v-model="value3" disabled @change="change">
          <ml-radio name="jy">禁用</ml-radio>
        </ml-radio-group>
      </template>
    </ml-cell>

    <ml-cell>
      <template slot="title">
        <ml-radio-group v-model="value4" disabled @change="change">
          <ml-radio name="xzqjy">选中且禁用</ml-radio>
        </ml-radio-group>
      </template>
    </ml-cell>
    
    <demo-title left>禁用状态</demo-title>
    <ml-cell>
      <template slot="title">
        <ml-radio-group v-model="radioValue" @change="change" :disabled="radioDisabled">
          <ml-radio name="pg">苹果</ml-radio>
          <ml-radio name="xj">香蕉</ml-radio>
          <ml-radio name="hmg">哈密瓜</ml-radio>
        </ml-radio-group>
      </template>
    </ml-cell>

    <demo-title left>列表 cell 样式</demo-title>
    <ml-radio-group v-model="value5" type="cell" @change="change">
      <ml-radio name="pg">苹果</ml-radio>
      <ml-radio name="xj">香蕉</ml-radio>
      <ml-radio name="hmg" disabled>哈密瓜</ml-radio>
    </ml-radio-group>

    <demo-title left>列表 cell-between 样式</demo-title>
    <ml-radio-group v-model="value5" type="cell-between" @change="change">
      <ml-radio name="pg">苹果</ml-radio>
      <ml-radio name="xj">香蕉</ml-radio>
      <ml-radio name="hmg" disabled>哈密瓜</ml-radio>
    </ml-radio-group>

    <demo-title left>列表禁用状态</demo-title>
    <ml-radio-group v-model="value5" type="cell" @change="change" :disabled="radioDisabled">
      <ml-radio name="pg">苹果</ml-radio>
      <ml-radio name="xj">香蕉</ml-radio>
      <ml-radio name="hmg">哈密瓜</ml-radio>
    </ml-radio-group>
  </div>
</template>

<script>
export default {
  name: '',

  data () {
    return {
      value1: '',
      value2: 'mrxz',
      value3: '',
      value4: 'xzqjy',
      value5: 'hmg',
      radioValue: 'hmg',
      radioDisabled: true
    }
  },

  methods: {
    change (name) {
      console.log(name, 'name')
      // this.$toast.text(`当前选中的值为${name}`, 2000)
    }
  }
}

</script>
<style lang='scss'>
</style>
