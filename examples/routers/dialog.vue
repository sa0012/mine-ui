<template>
  <div>
    <demo-title>警示框</demo-title>
    <sq-cell title="警示 Alert">
      <sq-button size="small" @click="showToast1">开启</sq-button>
    </sq-cell>
    <sq-cell title="带标题 Alert">
      <sq-button size="small" @click="showToast2">开启</sq-button>
    </sq-cell>

    <demo-title>消息确认</demo-title>
    <sq-cell title="确认框 Confirm">
      <sq-button size="small" @click="showToastsuccess">开启</sq-button>
    </sq-cell>
  </div>
</template>

<script>
export default {
  name: '',

  data () {
    return {
    }
  },

  methods: {
    showToast1 () {
      this.$dialog.alert({
        title: '',
        message: '测试~~message',
        onConfirm: () => {
          console.log('点击了alert确认按钮')
          this.$dialog.hide()
        }
      })
    },
    showToast2 () {
      this.$dialog.alert({
        title: '系统提示',
        message: '测试~~message',
        onConfirm: () => {
          console.log('点击了alert确认按钮')
          this.$dialog.hide()
        }
      })
    },
    showToastsuccess () {
      this.$dialog.confirm({
        title: '测试~~标题',
        message: '测试~~message',
        onConfirm: () => {
          console.log('点击了confirm确认按钮')
          this.$dialog.hide()
        },
        onCancel: () => {
          console.log('点击了confirm取消按钮')
          this.$dialog.hide()
        }
      })
    }
  }
}
</script>

<style lang="css">
</style>
