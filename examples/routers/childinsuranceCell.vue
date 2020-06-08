<template>
  <div class="childinsuranceCell-page">
    <demo-title left>基础用法</demo-title>
    {{exemptSelected}}
    <sq-button type="primary" size="small" @click="disabled = !disabled">disabled</sq-button>
    <sq-childinsurance-cell
      :has-exempt-clause="hasExemptClause"
      label="司机责任险"
      middle-text="不计免赔"
      right-text="投保"
      v-model="exemptSelected"
      :checkbox-disabled="disabled"
      @click="click"
    />
    <sq-childinsurance-cell
      :has-exempt-clause="hasExemptClause"
      label="司机责任险"
      middle-text="不计免赔"
      right-text="投保"
      border-type="square"
      v-model="exemptSelected"
      :checkbox-disabled="disabled"
      @click="click"
    />
  </div>
</template>

<script>
export default {
  name: '',

  data () {
    return {
      exemptSelected: false,
      hasExemptClause: true,
      disabled: false
    }
  },

  methods: {
    click () {
      this.exemptSelected = !this.exemptSelected
    }
  }
}
</script>

<style lang="scss">
</style>
