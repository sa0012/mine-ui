<template>
  <div>
    <demo-title>基础用法</demo-title>
    <ml-cell>
      <template slot="title">
        <ml-checkbox-group v-model="value1" @change="change">
          <ml-checkbox name="pt">普通</ml-checkbox>
        </ml-checkbox-group>
      </template>
    </ml-cell>

    <ml-cell>
      <template slot="title">
        <ml-checkbox-group v-model="value2" @change="change">
          <ml-checkbox name="mrxz">默认选中</ml-checkbox>
        </ml-checkbox-group>
      </template>
    </ml-cell>

    <ml-cell>
      <template slot="title">
        <ml-checkbox-group v-model="value3" disabled @change="change">
          <ml-checkbox name="jy">禁用</ml-checkbox>
        </ml-checkbox-group>
      </template>
    </ml-cell>

    <ml-cell>
      <template slot="title">
        <ml-checkbox-group v-model="value4" disabled @change="change">
          <ml-checkbox name="xzqjy">选中且禁用</ml-checkbox>
        </ml-checkbox-group>
      </template>
    </ml-cell>

    <demo-title left>禁用状态</demo-title>
    <ml-cell>
      <template slot="title">
        <ml-checkbox-group v-model="checkboxValue" @change="change" :disabled="checkboxDisabled">
          <ml-checkbox name="pg">苹果</ml-checkbox>
          <ml-checkbox name="xj">香蕉</ml-checkbox>
          <ml-checkbox name="hmg">哈密瓜</ml-checkbox>
        </ml-checkbox-group>
      </template>
    </ml-cell>

    <demo-title left>列表 cell 样式</demo-title>
    <ml-checkbox-group v-model="value5" type="cell" @change="change">
      <ml-checkbox name="pg" type="square-border">苹果</ml-checkbox>
      <ml-checkbox name="xj" type="square-border">香蕉</ml-checkbox>
      <ml-checkbox name="hmg" type="square-border" disabled>哈密瓜</ml-checkbox>
    </ml-checkbox-group>

    <demo-title left>列表 cell-between 样式</demo-title>
    <ml-checkbox-group v-model="value5" type="cell-between" @change="change">
      <ml-checkbox name="pg">苹果</ml-checkbox>
      <ml-checkbox name="xj">香蕉</ml-checkbox>
      <ml-checkbox name="hmg" disabled>哈密瓜</ml-checkbox>
    </ml-checkbox-group>

    <demo-title left>列表禁用状态</demo-title>
    <ml-checkbox-group v-model="value5" type="cell" @change="change" :disabled="checkboxDisabled">
      <ml-checkbox name="pg">苹果</ml-checkbox>
      <ml-checkbox name="xj">香蕉</ml-checkbox>
      <ml-checkbox name="hmg">哈密瓜</ml-checkbox>
    </ml-checkbox-group>
  </div>
</template>

<script>
export default {
  name: '',

  data () {
    return {
      value1: [],
      value2: ['mrxz'],
      value3: [],
      value4: ['xzqjy'],
      value5: ['hmg'],
      checkboxValue: ['hmg'],
      checkboxDisabled: true
    }
  },

  methods: {
    change (name) {
      console.log(name, 'checkbox')
      // this.$toast.text(`当前选中的值为${name}`, 2000)
    }
  }
}

</script>
<style lang='scss'>
</style>
