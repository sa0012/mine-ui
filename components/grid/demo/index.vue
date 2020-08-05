<template>
  <div class="grid">
    <ml-grid-group
      padding="10px 0"
      :count="iconArray.length"
    >
      <ml-grid
        v-for="(item, index) in iconArray"
        :index="index"
        :key="index"
      >
        <ml-icon class="demo-icon" :name="item" size="30" />
        <p class="icon-name" v-if="item">{{ `ml-icon-${item}` }}</p>
      </ml-grid>
    </ml-grid-group>
  </div>
</template>

<script>
import iconList from '@/common/font/iconfont.json'
export default {
  name: 'grid',

  data () {
    return {
      iconArray: iconList
    }
  },

  methods: {}
}
</script>

<style lang="scss" scoped>
.demo-icon {
  display: inline-block;
  font-size: 30px !important;
}
.icon-name {
  font-size: 12px;
  padding: 0 10px;
  word-break: break-word;
  box-sizing: border-box;
  line-height: 1.5em;
  text-align: center;
}
</style>