<template>
  <div>
    <demo-title>基础使用</demo-title>
    <ml-dropdown-menu>
      <ml-dropdown-item v-model="value1" :options="option1" />
      <ml-dropdown-item v-model="value2" :options="option2" />
    </ml-dropdown-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value1: 0,
      value2: 'a',
      option1: [
        { text: '全部商品', value: 0 },
        { text: '新款商品', value: 1 },
        { text: '活动商品', value: 2 }
      ],
      option2: [
        { text: '默认排序', value: 'a' },
        { text: '好评排序', value: 'b' },
        { text: '销量排序', value: 'c' }
      ]
    };
  },

  methods: {
    onConfirm() {
      this.$refs.item.toggle();
    }
  }
};
</script>
