<template>
  <div class="demo-icon-page">
    <div class="demo-icon-row">
      <div class="demo-icon-item" v-for="(item, index) in iconArray" :key="index">
        <ml-icon class="demo-icon" :name="item" size="30" />
        <p class="icon-name" v-if="item">{{ `ml-icon-${item}` }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import iconList from '@/common/font/iconfont.json'
export default {
  name: '',

  data () {
    return {
      iconArray: iconList
    }
  },

  methods: {}
}
</script>

<style lang="scss">
@import '~@/common/styles/variables';

.demo-icon-page {
  user-select: text;
  background-color: #ffffff;
}
.demo-icon-row {
  display: flex;
  flex-wrap: wrap;
  overflow-x: hidden;
  &:first-child {
    border: 0;
  }
  .demo-icon-item {
    box-sizing: border-box;
    width: 33.33%;
    padding-top: 14px;
    text-align: center;
    border-left: 1px solid #e5e5e5;
    border-top: 1px solid #e5e5e5;
    &:first-child {
      border: 0;
    }
  }
}
.demo-icon {
  display: inline-block;
  font-size: 30px !important;
  color: $theme-color;
}
.icon-name {
  font-size: 12px;
}
</style>
