<template>
  <div>
    <demo-title>基础使用</demo-title>
    <ml-dropdown-menu>
      <ml-dropdown-item v-model="value1" :options="option1" />
      <ml-dropdown-item v-model="value2" :options="option2" />
      <!-- <ml-dropdown-item v-model="value3" :options="option3" /> -->
    </ml-dropdown-menu>
  </div>
</template>

<script>
export default {
  data () {
    return {
      value1: 'all',
      value2: 'a',
      value3: 'one',
      option1: [
        { text: '全部商品', value: 'all' },
        { text: '新款商品', value: 'new' },
        { text: '活动商品', value: 'active' }
      ],
      option2: [
        { text: '默认排序', value: 'a' },
        { text: '好评排序', value: 'b' },
        { text: '销量排序', value: 'c' }
      ],
      option3: [
        { text: '菜单一', value: 'one' },
        { text: '菜单二', value: 'two' },
        { text: '菜单三', value: 'three' }
      ]
    }
  },

  methods: {
    onConfirm () {
      this.$refs.item.toggle()
    }
  }
}
</script>
