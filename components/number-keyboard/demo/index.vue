<template>
  <div>
    <demo-title>基础用法</demo-title>
    <ml-cell title="普通键盘">
      <ml-switch v-model="isShow0"></ml-switch>
    </ml-cell>
    <ml-cell title="身份证键盘">
      <ml-switch v-model="isShow1"></ml-switch>
    </ml-cell>
    <ml-cell title="含小数点键盘">
      <ml-switch v-model="isShow2"></ml-switch>
    </ml-cell>
    <ml-number-keyboard
      v-model="isShow0"
      @delete="onDelete"
      @confirm="onConfirm"
      @key-click="onKeyClick"
    />
    <ml-number-keyboard
      v-model="isShow1"
      title="键盘输入"
      title-right-text="完成"
      type="idcard"
      @delete="onDelete"
      @confirm="onConfirm"
      @key-click="onKeyClick"
    />
    <ml-number-keyboard
      v-model="isShow2"
      type="amount"
      right-bar
      title="键盘输入"
      title-right-text="完成"
      @setValue="onSetValue"
      @delete="onDelete"
      @confirm="onConfirm"
      @key-click="onKeyClick"
    />
  </div>
</template>

<script>
export default {
  name: '',

  mixins: [],

  components: {},

  props: {},

  data () {
    return {
      isShow0: false,
      isShow1: false,
      isShow2: false
    }
  },

  computed: {},

  watch: {},

  created () {},

  mounted () {},

  destroyed () {},

  methods: {
    show (type) {
      this[`isShow${type}`] = !this[`isShow${type}`]
    },
    onDelete ({key, value}) {
      console.log('on-delete', key, value)
    },
    onConfirm (value) {
      console.log('on-confirm', value)
    },
    onKeyClick (key) {
      console.log('key:', key)
    },
    onSetValue ({key, value}) {
      console.log('key-value: ', key, value)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
