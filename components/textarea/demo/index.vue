<template>
  <div class="textarea">
    <demo-title>基础用法</demo-title>
    <ml-textarea
      v-model="text"
      placeholder="请输入文本内容"
    />
    <demo-title>禁用状态</demo-title>
    <ml-textarea
      v-model="text"
      disabled
      placeholder="请输入文本内容"
    />
    <demo-title>设置背景色</demo-title>
    <ml-textarea
      v-model="text"
      text-bg-color="#84f8b2"
      placeholder="请输入文本内容"
    />
  </div>
</template>

<script>
export default {
  data () {
    return {
      text: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.textarea {
  padding: 0 16px;
  box-sizing: border-box;
}
</style>