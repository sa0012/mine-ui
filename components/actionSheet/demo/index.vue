<template>
  <div>
    <demo-title>基础用法</demo-title>
    <ml-cell title="含取消按钮">
      <ml-switch v-model="isShowAction1"></ml-switch>
    </ml-cell>

    <demo-title>其他</demo-title>
    <ml-cell title="不含取消按钮">
      <ml-switch v-model="isShowAction2"></ml-switch>
    </ml-cell>

    <demo-title>包含Title</demo-title>
    <ml-cell title="不含取消按钮">
      <ml-switch v-model="isShowAction3"></ml-switch>
    </ml-cell>

    <ml-actionSheet
      v-model="isShowAction1"
      :action-list="list"
      @on-confirm="action"
    />
    <ml-actionSheet
      v-model="isShowAction2"
      :action-list="list"
      @on-confirm="action"
      :show-cancel-button="false"
    />
    <ml-actionSheet
      v-model="isShowAction3"
      :action-list="list1"
      title="证件信息"
      @on-confirm="action"
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
      isShowAction3: false,
      list: [
        {
          name: '身份证',
          value: 'sfz'
        },
        {
          name: '护照',
          value: 'hz'
        }
      ],
      list1: [
        {
          name: '身份证',
          value: 'sfz'
        },
        {
          name: '护照',
          value: 'hz'
        },
        {
          name: '驾照',
          value: 'jz',
          disabled: true
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
