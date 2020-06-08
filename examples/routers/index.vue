<template>
  <div style="padding:20px;">
    <div style="text-align:right;">
      <a href="https://github.com/insaic/neon" target="_blank">
        <svg height="32" class="octicon octicon-mark-github" viewBox="0 0 16 16" version="1.1" width="32" aria-hidden="true">
          <path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path>
        </svg>
      </a>
    </div>
    <h5 class="title">上汽保险移动端Vue组件库</h5>
    <sq-demo title="基础组件" :list="base" v-model="isShow1"></sq-demo>
    <sq-demo title="表单组件" :list="form" v-model="isShow2"></sq-demo>
    <sq-demo title="操作反馈" :list="action" v-model="isShow3"></sq-demo>
    <!-- <sq-drop title="高阶组件" :list="list4" v-model="isShow4"></sq-drop> -->
    <sq-demo title="业务组件" :list="business" v-model="isShow5"></sq-demo>
  </div>
</template>

<script>
import menu from '../menu.js'

export default {
  name: 'App',
  data () {
    return {
      // 基础
      base: menu.base,
      // 表单
      form: menu.form,
      // 操作反馈
      action: menu.action,
      // // 高阶组件
      // list4: [
      //   { to: 'carLicense', name: 'carLicense22' },
      // ],
      // 业务组件
      business: menu.business,
      isShow1: false,
      isShow2: false,
      isShow3: false,
      isShow4: false,
      isShow5: false
    }
  },
  methods: {
    onChange () {
      window.sessionStorage.VMUI_INDEX_MENU_STATUS = JSON.stringify({
        isShow1: this.isShow1,
        isShow2: this.isShow2,
        isShow3: this.isShow3,
        isShow4: this.isShow4,
        isShow5: this.isShow5
      })
    }
  },
  watch: {
    isShow1 () {
      this.onChange()
    },
    isShow2 () {
      this.onChange()
    },
    isShow3 () {
      this.onChange()
    },
    isShow4 () {
      this.onChange()
    },
    isShow5 () {
      this.onChange()
    },
  },
  mounted () {
    if (window.sessionStorage.VMUI_INDEX_MENU_STATUS) {
      const {isShow1, isShow2, isShow3, isShow4, isShow5} = JSON.parse(window.sessionStorage.VMUI_INDEX_MENU_STATUS)
      this.isShow1 = isShow1
      this.isShow2 = isShow2
      this.isShow3 = isShow3
      this.isShow4 = isShow4
      this.isShow5 = isShow5
    }
  }
}
</script>

<style lang="scss">
.title {
  text-align:center;
  font-size: 16px;
  color: #455a64;
  margin-top: 0px;
}
</style>
