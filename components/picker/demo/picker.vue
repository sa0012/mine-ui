<template>
  <div class="box">
    <div class="picker">
      <div class="picker-wrapper">
        <ul
          class="select-list"
          style="transform: translate3d(0px, 0px, -138.496px) rotateX(360deg);"
        >
          <li
            v-for="(picker, pIndex) in list1"
            :key="pIndex"
            class="select-option"
            :style="{
              ...setStyles(pIndex)
            }"
          >{{ picker }}</li>
        </ul>
        <div class="highlight">
          <ul class="highlight-list">
            <li
              class="highlight-item"
              v-for="(hl, hIndex) in list1"
              :key="hIndex"
            >{{ hl }}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isVisible2: true,
      defaultValueData: '',
      list1: ['北京', '上海', '广州', '深圳', '重庆', '杭州', '天津', '南京', '温州']
    }
  },

  methods: {
    setStyles (index) {
      return {
        top: '-22.5px',
        transform: `rotateX(${90 - 18 * index}deg) translate3d(0px, 0px, 138.496px)`,
        visibility: 'visible'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.picker {
  position: absolute;
  left: 0;
  top: 0;
  perspective: 2000px;
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  width: 100%;
  height: 300px;
  &-wrapper {
    position: relative;
    height: 100%;
    text-align: center;
    overflow: hidden;
    font-size: 20px;
    color: #ddd;
    flex: 1;

    &:before,
    &:after {
      position: absolute;
      z-index: 1;
      display: block;
      content: '';
      width: 100%;
      height: 50%;
    }

    &:before {
      top: 0;
      background-image: linear-gradient(to bottom, rgba(1, 1, 1, 0.5), rgba(1, 1, 1, 0));
    }

    &:after {
      bottom: 0;
      background-image: linear-gradient(to top, rgba(1, 1, 1, 0.5), rgba(1, 1, 1, 0));
    }
  }

  &-list {
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    height: 0;
    transform-style: preserve-3d;
    margin: 0 auto;
    display: block;
    transform: translateZ(-150px) rotateX(0deg);
    -webkit-font-smoothing: subpixel-antialiased;
    color: #666;
  }

  &-item {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 50px;
    -webkit-font-smoothing: subpixel-antialiased;
  }
}

.highlight {
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
  width: 100%;
  background-color: #000;
  border-top: 1px solid #333;
  border-bottom: 1px solid #333;
  font-size: 24px;
  overflow: hidden;
  height: 45px;
  line-height: 45px;

  &-list {
    position: absolute;
    width: 100%;
  }
}
</style>
