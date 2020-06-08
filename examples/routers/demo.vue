<template>
  <div class="demo-index-wrap">
    <p
      class="demo-index-title"
      @click="onShow"
      :style="{
        'opacity': isShow ? '0.5' : '',
        'borderBottom': !isShow ? '0' : ''
      }"
    >
      {{ title }}
    </p>
    <div class="demo-index-ul-wrap" :style="{'height': isShow ? 'auto' : '0'}">
      <div class="demo-index-ul" :style="{'transform': isShow ? 'translateY(0)' : 'translateY(-50%)'}">
        <router-link class="demo-index-item" :to="item.to" v-for="(item, index) in list" :key="index">{{ item.name }}</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'sq-demo',
  props: {
    value: {
      type: Boolean
    },
    title: {
      type: String
    },
    list: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      isShow: this.value
    }
  },
  methods: {
    onShow () {
      this.$emit('input', !this.isShow)
    }
  },
  watch: {
    value (val) {
      this.isShow = val
    }
  }
}
</script>

<style lang="scss">
a {
  color: #000;
  text-decoration: none;
}
.demo-index-wrap {
  background-color: #fff;
  box-shadow: 0px 2px 4px #e5e5e5;
  border-radius: 4px;
  .demo-index-title {
    margin: 0;
    padding: 20px 0;
    margin: 0 20px;
    border-bottom: 1px solid #d5d5d5;
    font-size: 16px;
  }
  .demo-index-ul-wrap {
    overflow: hidden;
    .demo-index-ul {
      margin: 0;
      list-style: none;
      padding: 0 20px;
      overflow: hidden;
      transition: transform .2s ease-out;
      .demo-index-item {
        display: block;
        border-bottom: 1px solid #e5e5e5;
        line-height: 1.5;
        padding: 10px 0;
        position: relative;
        font-size: 16px;
        &::after {
          content: " ";
          display: inline-block;
          height: 6px;
          width: 6px;
          border-width: 2px 2px 0 0;
          border-color: #C8C8CD;
          border-style: solid;
          transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
          position: absolute;
          top: 50%;
          margin-top: -4px;
          right: 2px;
        }
        &:last-child {
          border: 0;
          padding-bottom: 20px;
        }
        &:last-child::after {
          margin-top: -8px;
        }
      }
    }
  }
  &~.demo-index-wrap {
    margin-top: 16px;
  }
}
</style>
