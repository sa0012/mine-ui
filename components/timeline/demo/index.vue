<template>
  <div class="timeline">
    <demo-title>基础用法</demo-title>
    <ml-timeline
      :timeList="timeList"
    />
  </div>
</template>

<script>
export default {
  name: 'timeline',
  data () {
    return {
      timeList: [
        {
          date: '07-21 08:00',
          message: '保司审核通过'
        },
        {
          date: '07-21 08:00',
          message: '保司审核通过'
        },
        {
          date: '07-21 08:00',
          message: '保司审核通过'
        },
        {
          date: '07-21 08:00',
          message: '保司审核通过'
        },
        {
          date: '07-21 08:00',
          message: '保司审核通过'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.timeline {
  background: #fff;
}
</style>
