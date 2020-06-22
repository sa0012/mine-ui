import { createNamespace } from '../../src/utils'

const [createComponent, bem] = createNamespace('swiper-item')

export default createComponent({
  data () {
    return {
      offset: 0
    }
  },

  computed: {
    wrapStyles () {
      return {
        'transform': (this.index === 0 && this.$parent.currentIndex >= (this.$parent.count - 1))
          ? `translateX(${this.$parent.firstWrap}px)`
          : (
            (this.index === this.$parent.count - 1 && (this.$parent.currentIndex === 0 || this.$parent.currentIndex === this.index))
          ) ? `translateX(${this.$parent.lastWrap}px)` : ''
      }
    },
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

    // const style = {
    //   width: computedWidth + 'px',
    //   height: vertical ? computedHeight + 'px' : '100%',
    //   transform: `translate${vertical ? 'Y' : 'X'}(${this.offset}px)`
    // }

    console.log(this.$slots, 'slots')
    return (
      <div
        class={
          bem()
        }
        style={this.wrapStyles}
        {...{ on: this.$listeners }}
      >
        {this.$slots && this.$slots.default}
      </div>
    )
  }
})
