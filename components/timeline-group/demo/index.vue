<template>
  <div class="timeline">
    <demo-title>基础用法</demo-title>
    <ml-timeline-group>
      <ml-timeline
        v-for="(item, tIndex) in timeList"
        :key="tIndex"
        :timeline="item"
        :message="item.message"
        :timeStatus="item.date"
        :showLine="!!(timeList.length - 1 !== tIndex)"
      />
    </ml-timeline-group>

    <demo-title>自定义用法</demo-title>
    <ml-timeline-group>
      <ml-timeline
        v-for="(item, tIndex) in timeList1"
        :key="tIndex"
        :timeline="item"
        :dotType="item.dotType"
        :message="item.message"
        :timeStatus="item.date"
        :showLine="!!(timeList.length - 1 !== tIndex)"
      />
    </ml-timeline-group>
    <demo-title>插槽用法</demo-title>
    <ml-timeline-group
      :color="green"
      borderStyle="dashed"
      borderColor="green"
    >
      <ml-timeline
        v-for="(item, tIndex) in timeList1"
        :key="tIndex"
        :timeline="item"
        :dotType="item.dotType"
        iconColor="green"
        :showLeft="false"
        :message="item.message"
        :timeStatus="item.date"
        :showLine="!!(timeList.length - 1 !== tIndex)"
      >
        <template slot="right">
          <div>{{ item.message }}</div>
          <div style="padding-top: 10px;">{{ item.date }}</div>
        </template>
      </ml-timeline>
    </ml-timeline-group>
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
      ],
      timeList1: [
        {
          date: '07-21 08:00',
          message: '保司审核通过',
          dotType: 'aixin'
        },
        {
          date: '07-21 08:00',
          message: '保司审核通过',
          dotType: 'all'
        },
        {
          date: '07-21 08:00',
          message: '保司审核通过'
        },
        {
          date: '07-21 08:00',
          message: '保司审核通过',
          dotType: 'home'
        },
        {
          date: '07-21 08:00',
          message: '保司审核通过',
          dotType: 'emoji'
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
