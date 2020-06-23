import { createNamespace } from '../../src/utils'

const [createComponent, bem] = createNamespace('swiper-item')

export default createComponent({
  data () {
    return {
      offset: 0
    }
  },

  computed: {
    index () {
      return this.$parent.swipers.indexOf(this)
    }
  },

  beforeCreate () {
    // 收集轮播卡片
    this.$parent.swipers.push(this)
  },

  destroyed () {
    this.$parent.swipers.splice(this.$parent.swipers.indexOf(this), 1)
  },

  render () {
    const {
      vertical,
      computedWidth,
      computedHeight
    } = this.$parent

    const style = {
      width: computedWidth + 'px',
      height: vertical ? computedHeight + 'px' : '100%',
      transform: `translate${vertical ? 'Y' : 'X'}(${this.offset}px)`
    }

    return (
      <div
        class={
          bem()
        }
        style={style}
        {...{ on: this.$listeners }}
      >
        {this.$slots && this.$slots.default}
      </div>
    )
  }
})
