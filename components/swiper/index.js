import { createNamespace } from '../../src/utils'

const [createComponent, bem] = createNamespace('swiper')

export default createComponent({
  props: {
    // 卡片宽度
    width: [Number, String],
    // 卡片高度
    height: [Number, String],
    // 是否纵向滚动
    vertical: Boolean,
    // 自动轮播间隔
    autoplay: {
      type: [ String, Number ],
      default: 3000
    },
    // 动画持续时间
    duration: {
      type: [ String, Number ],
      default: 300
    },
    // 是否显示指示器
    showIndicators: {
      type: Boolean,
      default: true
    },
    // 是否允许手势滑动
    touchable: {
      type: Boolean,
      default: true
    }
  },

  data () {
    return {
      computedWidth: 0,
      computedHeight: 0,
      currentIndex: 0,
      offsetWidth: 0,
      translateX: 0,
      firstWrap: 0,
      lastWrap: 0,
      offset: 0,
      timer: null,
      startPosition: 0,
      savePosition: 0,
      moveValue: 0,
      swipers: []
    }
  },

  computed: {
    wrapStyles () {
      return {
        'transform': `translateX(${this.translateX}px)`,
        'transition': `transform ${this.duration}ms`,
        'width': `${this.offsetWidth * this.swipers.length}px`
      }
    },
    count () {
      return this.swipers.length
    }
  },

  methods: {
    autoPlay () {
      const { autoplay, count } = this
      if (autoplay && count > 1) {
        this.clear()

        this.timer = setInterval(() => {
          if (this.currentIndex === count - 1) {
            this.firstWrap = this.offsetWidth * count
          }
          if (this.currentIndex === count - 1 && this.translateX === this.offsetWidth) {
            this.duration = 0
            this.lastWrap = 0
            this.translateX = -this.offsetWidth * this.currentIndex
          }
  
          if (this.currentIndex === count) {
            this.currentIndex = 0
  
            this.firstWrap = 0
  
            this.duration = 0
            this.translateX = 0
  
            setTimeout(() => {
              this.duration = 300
              this.translateX = -this.offsetWidth * ++this.currentIndex
            }, 100)
            return
          }
  
          if (this.duration === 0) {
            this.duration = 300
          }
          this.translateX = -this.offsetWidth * ++this.currentIndex
        }, autoplay)
      }
    },

    onTouchStart (event) {
      if (!this.touchable) return

      this.clear()
      if (this.currentIndex === this.count) {
        this.currentIndex = 0
        this.firstWrap = 0
        this.duration = 0
        this.translateX = 0
      }
      if (this.currentIndex === this.count - 1 && this.translateX === this.offsetWidth) {
        this.duration = 0
        this.lastWrap = 0
        this.translateX = -this.offsetWidth * this.currentIndex
      }

      this.startPosition = event.changedTouches[0].pageX
      this.savePosition = this.translateX
    },

    onTouchMove (event) {
      if (!this.touchable) return

      this.moveValue = event.changedTouches[0].pageX - this.startPosition
      this.translateX = this.savePosition + this.moveValue

      const { count } = this
      if (this.currentIndex === count - 1) {
        this.firstWrap = this.offsetWidth * count
      }
      // first to last, move last position
      if (this.moveValue > 0 && this.currentIndex === 0) {
        this.lastWrap = this.offsetWidth * count * -1
      }
      event.preventDefault()
      event.stopPropagation()
    },

    onTouchEnd (event) {
      if (!this.touchable) return

      if (Math.abs(this.moveValue) > 50) {
        let direction = 1
        if (this.moveValue > 0) { // 2 -> 1 左移
          direction = -1
        }

        const { count } = this

        if (this.currentIndex === count - 1) {
          this.firstWrap = this.offsetWidth * count
        }
        // 重置this.firstWrap
        if (this.currentIndex === 0) {
          this.firstWrap = 0
        }

        if (this.currentIndex === count) {
          this.currentIndex = 0

          this.firstWrap = 0

          this.duration = 0
          this.translateX = 0

          setTimeout(() => {
            this.duration = 300
            direction === 1 ? ++this.currentIndex : --this.currentIndex
            if (this.currentIndex < 0) {
              this.currentIndex = count - 1
            }
            this.translateX = -this.offsetWidth * this.currentIndex
          }, 100)
          return
        }

        if (this.duration === 0) {
          this.duration = 300
        }

        direction === 1 ? ++this.currentIndex : --this.currentIndex
        if (this.currentIndex < 0) {
          this.currentIndex = count - 1
        }
        if (this.currentIndex === count - 1 && direction !== 1) {
          this.translateX = this.offsetWidth
        } else {
          this.translateX = -this.offsetWidth * this.currentIndex
        }
      } else {
        if (this.duration === 0) {
          this.duration = 300
        }
        this.translateX = this.savePosition
      }
      this.autoPlay()
    },

    clear() {
      clearInterval(this.timer);
    },

    offsetWidthResize () {
      this.offsetWidth = this.$el.offsetWidth
    }
  },

  mounted () {
    this.offsetWidth = this.$el.offsetWidth
    this.autoPlay()
    window.addEventListener('resize', this.offsetWidthResize, false)
  },

  destroyed () {
    this.clear()
    window.removeEventListener('resize', this.offsetWidthResize)
  },

  render () {
    const {
      showIndicators,
      currentIndex,
      count,
      swipers,
      $slots
    } = this

    const indicators = () => {
      if (!showIndicators) return
      return (
        <div
          class={bem('point-wrap', { vertical: this.vertical })}
        >
          {
            swipers.map((item, index) => (
              <div
                class={
                  bem('point-item', {
                    'point-active': index === currentIndex || (index === 0 && currentIndex === count)
                  })
                }
              ></div>
            ))
          }
        </div>
      )
    }
    return (
      <div
        class={bem()}
      >
        <div
          class={
            bem('wrap')
          }
          style={this.wrapStyles}
          onTouchstart={this.onTouchStart}
          onTouchmove={this.onTouchMove}
          onTouchend={this.onTouchEnd}
          onTouchcancel={this.onTouchEnd}
        >
          {$slots && $slots.default}
        </div>
        {indicators()}
      </div>
    )
  }
})
