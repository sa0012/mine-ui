<template>
  <div>
    <demo-title>警示框</demo-title>
    <ml-cell title="警示 Alert">
      <ml-button size="small" @click="showToast1">开启</ml-button>
    </ml-cell>
    <ml-cell title="带标题 Alert">
      <ml-button size="small" @click="showToast2">开启</ml-button>
    </ml-cell>

    <demo-title>消息确认</demo-title>
    <ml-cell title="确认框 Confirm">
      <ml-button size="small" @click="showToastsuccess">开启</ml-button>
    </ml-cell>

    <demo-title>带有icon图标的alert弹窗</demo-title>
    <ml-cell title="确认框 success">
      <ml-button size="small" @click="showToast1({
        icon: 'success'
      })">开启</ml-button>
    </ml-cell>
    <ml-cell title="确认框 fail">
      <ml-button size="small" @click="showToast1({
        icon: 'fail'
      })">开启</ml-button>
    </ml-cell>
    <ml-cell title="确认框 warn">
      <ml-button size="small" @click="showToast1({
        icon: 'warn'
      })">开启</ml-button>
    </ml-cell>
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
    showToast1 ({ icon }) {
      this.$dialog.alert({
        title: '',
        icon,
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
