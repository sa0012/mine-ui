<template>
  <div class="neon-narbar">
    <div class="neon-narbar_title">{{ title }}</div>
    <div class="neon-narbar_right"></div>
  </div>
</template>

<script>
export default {
  props: ['title']
}
</script>

<style lang="sass">
.neon-narbar
  height: 46px
  display: flex
  align-items: center
  justify-content: center
  &_left-arrow
    position: relative
    display: inline-block
    width: 14px
    height: 0px
    margin-left: 12px
    &::after
      content: ""
      display: block
      position: absolute
      width: 10px
      left: 0
      top: 50%
      margin-top: -10px
      height: 10px
      border-right: 2px solid #4A90E2
      border-top: 2px solid #4A90E2
      box-sizing: border-box
      transform: rotate(-135deg)
  &_back
    width: 70px
    box-sizing: border-box
    z-index: 1
    position: absolute
    left: 0
    top: 0
    bottom: 0
    line-height: 46px
  &_back-text
    color: #4A90E2
  &_title
    flex: 1
    display: flex
    align-items: center
    justify-content: center
    font-size: 16px
    font-weight: 600
</style>
