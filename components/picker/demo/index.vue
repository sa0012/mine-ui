<template>
  <div class="picker">
    <demo-title>基础用法</demo-title>
    <ml-picker
      show-toolbar
      title="标题"
      ref="pickerRef1"
      :columns="list1"
    />
  </div>
</template>

<script>
export default {
  data () {
    return {
      list1: ['北京', '上海', '广州', '深圳', '重庆', '杭州', '天津', '南京', '温州']
    }
  }
}
</script>

<style>

</style>
