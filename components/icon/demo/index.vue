<template>
  <div class="demo-icon-page">
    <div class="demo-icon-row" v-for="(item, index) in iconArray" :key="index">
      <div class="demo-icon-item" v-for="(icon, index) in item" :key="index">
        <ml-icon class="demo-icon" :name="icon.name" size="30" />
        <p class="icon-name" v-if="icon.name">{{ `ml-icon-${icon.name}` }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: '',

  data () {
    return {
      iconArray: [
        [
          { name: 'circle-left' },
          { name: 'circle-down' },
          { name: 'circle-right' }
        ],
        [
          { name: 'alert-empty' },
          { name: 'alert-full' },
          { name: 'alert' },
        ],
        [
          { name: 'checkmark-full' },
          { name: 'checkmark' },
          { name: 'error-full' },
        ],
        [
          { name: 'error' },
          { name: 'loading' },
          { name: 'arrow-left' }
        ],
        [
          { name: 'arrow-up' },
          { name: 'arrow-right' },
          { name: 'arrow-down' }
        ],
        [
          { name: 'error-empty' },
          { name: 'checkmark-empty' },
          { name: 'jia' }
        ],
        [
          { name: 'jian' },
          { name: 'shanchu' },
          { name: 'keyboard-down' }
        ],
        [
          { name: 'keyboard-xiangxia' },
          { name: 'keyboard-xiangshang' },
          { name: 'keyboard-delete' }
        ],
        [
          { name: 'keyboard-remove' },
          { name: 'yuandian' },
          { name: 'error-gap' }
        ],
        [
          { name: 'pentagram' },
          { name: '' },
          { name: '' }
        ]
      ]
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
  border-top: 1px solid #e5e5e5;
  &:first-child {
    border: 0;
  }
  .demo-icon-item {
    flex: 1;
    padding-top: 14px;
    text-align: center;
    border-left: 1px solid #e5e5e5;
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
