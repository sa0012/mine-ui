<template>
  <div>
    <demo-title>基础用法</demo-title>
    <sq-cell title="普通键盘">
      <sq-switch v-model="isShow0"></sq-switch>
    </sq-cell>
    <sq-cell title="身份证键盘">
      <sq-switch v-model="isShow1"></sq-switch>
    </sq-cell>
    <sq-cell title="含小数点键盘">
      <sq-switch v-model="isShow2"></sq-switch>
    </sq-cell>
    <sq-number-keyboard
      v-model="isShow0"
      @delete="onDelete"
      @confirm="onConfirm"
      @key-click="onKeyClick"
    />
    <sq-number-keyboard
      v-model="isShow1"
      type="idcard"
      @delete="onDelete"
      @confirm="onConfirm"
      @key-click="onKeyClick"
    />
    <sq-number-keyboard
      v-model="isShow2"
      type="amount"
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
    onDelete () {
      console.log('on-delete')
    },
    onConfirm () {
      console.log('on-confirm')
    },
    onKeyClick (key) {
      console.log('key:', key)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
