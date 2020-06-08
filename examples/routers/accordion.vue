<template>
  <div>
    <demo-title left>普通形式</demo-title>
    <sq-accordion v-model="active1">
      <sq-accordion-item title="选项一" :name="1">
        <div>我是内容</div><div>我是内容</div><div>我是内容</div><div>我是内容</div>
      </sq-accordion-item>
      <sq-accordion-item title="选项二" :name="2">
       <div>我是内容</div><div>我是内容</div><div>我是内容</div><div>我是内容</div>
      </sq-accordion-item>
      <sq-accordion-item title="选项三" :name="3">
        <div>我是内容</div><div>我是内容</div><div>我是内容</div><div>我是内容</div>
      </sq-accordion-item>
    </sq-accordion>

    <demo-title left>手风琴形式</demo-title>
    <sq-accordion v-model="active2" accordion>
      <sq-accordion-item title="选项一" :name="1">
       <div>我是内容</div><div>我是内容</div><div>我是内容</div><div>我是内容</div>
      </sq-accordion-item>
      <sq-accordion-item title="选项二" :name="2">
        <div>我是内容</div><div>我是内容</div><div>我是内容</div><div>我是内容</div>
      </sq-accordion-item>
      <sq-accordion-item title="选项三" :name="3">
        <div>我是内容</div><div>我是内容</div><div>我是内容</div><div>我是内容</div>
      </sq-accordion-item>
    </sq-accordion>

    <!-- <div class="demo-title demo-pdleft-15">手动触发展开项</div>
    <sq-checkbox-group v-model="active3">
      <sq-checkbox :name="1">选项一</sq-checkbox>
      <sq-checkbox :name="2">选项二</sq-checkbox>
      <sq-checkbox :name="3">选项三</sq-checkbox>
    </sq-checkbox-group>

    <sq-accordion v-model="active3">
      <sq-accordion-item title="选项一" :name="1">
        <div>我是内容</div><div>我是内容</div><div>我是内容</div><div>我是内容</div>
      </sq-accordion-item>
      <sq-accordion-item title="选项二" :name="2">
        <div>我是内容</div><div>我是内容</div><div>我是内容</div><div>我是内容</div>
      </sq-accordion-item>
      <sq-accordion-item title="选项三" :name="3">
        <div>我是内容</div><div>我是内容</div><div>我是内容</div><div>我是内容</div>
      </sq-accordion-item>
    </sq-accordion> -->
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
