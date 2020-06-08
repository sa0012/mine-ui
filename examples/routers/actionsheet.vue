<template>
  <div>
    <demo-title>基础用法</demo-title>
    <sq-cell title="含取消按钮">
      <sq-switch v-model="isShowAction1"></sq-switch>
    </sq-cell>

    <demo-title>其他</demo-title>
    <sq-cell title="不含取消按钮">
      <sq-switch v-model="isShowAction2"></sq-switch>
    </sq-cell>

    <sq-actionsheet
      v-model="isShowAction1"
      :action-list="list"
      @on-item-click="action"
    />
    <sq-actionsheet
      v-model="isShowAction2"
      :action-list="list"
      @on-item-click="action"
      :show-cancel-button="false"
    />
  </div>
</template>

<script>
export default {
  name: '',

  data () {
    return {
      isShowAction1: false,
      isShowAction2: false,
      list: [
        {
          name: '身份证',
          value: 'sfz'
        },
        {
          name: '护照',
          value: 'hz'
        }
      ]
    }
  },

  computed: {
    stateText () {
      return this.isShowAction ? '显示' : '隐藏'
    }
  },

  methods: {
    action (item) {
      console.log(item)
      this.$toast.text(`${item.name} -- ${item.value}`)
    }
  }
}
</script>

<style lang="css">
</style>
