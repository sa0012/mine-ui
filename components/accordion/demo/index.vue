<template>
  <div>
    <demo-title left>普通形式</demo-title>
    <ml-accordion v-model="active1">
      <ml-accordion-item title="选项一" :name="1">
        <div>我是内容</div><div>我是内容</div><div>我是内容</div><div>我是内容</div>
      </ml-accordion-item>
      <ml-accordion-item title="选项二" :name="2">
       <div>我是内容</div><div>我是内容</div><div>我是内容</div><div>我是内容</div>
      </ml-accordion-item>
      <ml-accordion-item title="选项三" :name="3">
        <div>我是内容</div><div>我是内容</div><div>我是内容</div><div>我是内容</div>
      </ml-accordion-item>
    </ml-accordion>

    <demo-title left>手风琴形式</demo-title>
    <ml-accordion v-model="active2" accordion>
      <ml-accordion-item title="选项一" :name="1">
       <div>我是内容</div><div>我是内容</div><div>我是内容</div><div>我是内容</div>
      </ml-accordion-item>
      <ml-accordion-item title="选项二" :name="2">
        <div>我是内容</div><div>我是内容</div><div>我是内容</div><div>我是内容</div>
      </ml-accordion-item>
      <ml-accordion-item title="选项三" label="描述" disabled :name="3">
        <div>我是内容</div><div>我是内容</div><div>我是内容</div><div>我是内容</div>
      </ml-accordion-item>
    </ml-accordion>

    <!-- <div class="demo-title demo-pdleft-15">手动触发展开项</div>
    <ml-checkbox-group v-model="active3">
      <ml-checkbox :name="1">选项一</ml-checkbox>
      <ml-checkbox :name="2">选项二</ml-checkbox>
      <ml-checkbox :name="3">选项三</ml-checkbox>
    </ml-checkbox-group>

    <ml-accordion v-model="active3">
      <ml-accordion-item title="选项一" :name="1">
        <div>我是内容</div><div>我是内容</div><div>我是内容</div><div>我是内容</div>
      </ml-accordion-item>
      <ml-accordion-item title="选项二" :name="2">
        <div>我是内容</div><div>我是内容</div><div>我是内容</div><div>我是内容</div>
      </ml-accordion-item>
      <ml-accordion-item title="选项三" :name="3">
        <div>我是内容</div><div>我是内容</div><div>我是内容</div><div>我是内容</div>
      </ml-accordion-item>
    </ml-accordion> -->
  </div>
</template>

<script>
export default {
  name: '',

  data () {
    return {
      active1: [3],
      active2: [],
      active3: []
    }
  },

  methods: {}
}
</script>

<style lang="scss">
</style>
