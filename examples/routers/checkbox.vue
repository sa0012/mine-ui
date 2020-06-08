<template>
  <div>
    <demo-title>基础用法</demo-title>
    <sq-cell>
      <template slot="title">
        <sq-checkbox-group v-model="value1" @change="change">
          <sq-checkbox name="pt">普通</sq-checkbox>
        </sq-checkbox-group>
      </template>
    </sq-cell>

    <sq-cell>
      <template slot="title">
        <sq-checkbox-group v-model="value2" @change="change">
          <sq-checkbox name="mrxz">默认选中</sq-checkbox>
        </sq-checkbox-group>
      </template>
    </sq-cell>

    <sq-cell>
      <template slot="title">
        <sq-checkbox-group v-model="value3" disabled @change="change">
          <sq-checkbox name="jy">禁用</sq-checkbox>
        </sq-checkbox-group>
      </template>
    </sq-cell>

    <sq-cell>
      <template slot="title">
        <sq-checkbox-group v-model="value4" disabled @change="change">
          <sq-checkbox name="xzqjy">选中且禁用</sq-checkbox>
        </sq-checkbox-group>
      </template>
    </sq-cell>
    
    <demo-title left>禁用状态</demo-title>
    <sq-cell>
      <template slot="title">
        <sq-checkbox-group v-model="checkboxValue" @change="change" :disabled="checkboxDisabled">
          <sq-checkbox name="pg">苹果</sq-checkbox>
          <sq-checkbox name="xj">香蕉</sq-checkbox>
          <sq-checkbox name="hmg">哈密瓜</sq-checkbox>
        </sq-checkbox-group>
      </template>
    </sq-cell>

    <demo-title left>列表 cell 样式</demo-title>
    <sq-checkbox-group v-model="value5" type="cell" @change="change">
      <sq-checkbox name="pg" border-type="square-border">苹果</sq-checkbox>
      <sq-checkbox name="xj" border-type="square-border">香蕉</sq-checkbox>
      <sq-checkbox name="hmg" border-type="square-border" disabled>哈密瓜</sq-checkbox>
    </sq-checkbox-group>

    <demo-title left>列表 cell-between 样式</demo-title>
    <sq-checkbox-group v-model="value5" type="cell-between" @change="change">
      <sq-checkbox name="pg">苹果</sq-checkbox>
      <sq-checkbox name="xj">香蕉</sq-checkbox>
      <sq-checkbox name="hmg" disabled>哈密瓜</sq-checkbox>
    </sq-checkbox-group>

    <demo-title left>列表禁用状态</demo-title>
    <sq-checkbox-group v-model="value5" type="cell" @change="change" :disabled="checkboxDisabled">
      <sq-checkbox name="pg">苹果</sq-checkbox>
      <sq-checkbox name="xj">香蕉</sq-checkbox>
      <sq-checkbox name="hmg">哈密瓜</sq-checkbox>
    </sq-checkbox-group>
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
      this.$toast.text(`当前选中的值为${name}`, 2000)
    }
  }
}

</script>
<style lang='scss'>
</style>
