<template>
  <div class="picker">
    <!-- <demo-title>基础用法</demo-title>
    <ml-picker
      show-toolbar
      title="标题"
      ref="pickerRef1"
      :columns="list1"
    />
    <demo-title>测试用例</demo-title> -->
    <tl-picker />
  </div>
</template>

<script>
import TlPicker from './picker'
export default {
  data () {
    return {
      isVisible2: true,
      defaultValueData: '',
      list1: ['北京', '上海', '广州', '深圳', '重庆', '杭州', '天津', '南京', '温州']
    }
  },

  components: {
    TlPicker
  }
}
</script>

<style lang="scss" scoped>
.picker {
  background: #fff;
  min-height: 100%;
}
</style>
