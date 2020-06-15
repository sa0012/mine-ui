<template>
  <div>
    <demo-title>基本用法</demo-title>
    <ml-cell title="消息提示">
      <ml-button size="small" @click="showToast">开启</ml-button>
    </ml-cell>
    <ml-cell title="成功提示">
      <ml-button size="small" @click="showSuccess">开启</ml-button>
    </ml-cell>
    <ml-cell title="失败提示">
      <ml-button size="small" @click="showError">开启</ml-button>
    </ml-cell>
    <ml-cell title="警告提示">
      <ml-button size="small" @click="showWarn">开启</ml-button>
    </ml-cell>

    <demo-title>加载中</demo-title>
    <ml-cell title="加载提示">
      <ml-button size="small" @click="showLoading">开启</ml-button>
    </ml-cell>
    <ml-cell title="加载提示无文字">
      <ml-button size="small" @click="showLoading2">开启</ml-button>
    </ml-cell>

    <demo-title>自定义</demo-title>
    <ml-cell title="自定义iconClass">
      <ml-button size="small" @click="showDiy">开启</ml-button>
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
    showToast () {
      this.$toast.text('测试~~')
    },
    showSuccess () {
      this.$toast.success('操作成功', 2000)
    },
    showError () {
      this.$toast.error('5秒后关闭', -1)
      setTimeout(() => {
        this.$toast.hide(() => {
          console.log(22)
        })
      }, 5000)
    },
    showWarn () {
      this.$toast.warn('没有查到数据', 2000)
    },
    showLoading () {
      this.$toast.loading('加载中..')
    },
    showLoading2 () {
      this.$toast.loading('')
    },
    showDiy () {
      this.$toast.show({ message: '自定义icon', iconClass: 'pentagram' })
    }
  }
}
</script>

<style lang="css">
</style>
