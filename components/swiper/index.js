import { createNamespace } from '../../src/utils'
import { doubleRaf } from '../../src/utils/raf'
import { TouchMixin } from '../../src/mixins/touch'

const [createComponent, bem] = createNamespace('swiper')
function range (num, min, max) {
  return Math.min(Math.max(num, min), max)
}

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
      type: [String, Number],
      default: 3000
    },
    // 动画持续时间
    duration: {
      type: [String, Number],
      default: 500
    },
    // 默认显示的位置
    defaultSwiper: {
      type: Number,
      default: 0
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
    },
    // 是否开启循环播放
    loop: {
      type: Boolean,
      default: true
    },
    // 滑动切换阈值
    threshold: {
      type: [String, Number],
      default: 1 / 5,
      validator (value) {
        return value > 0 && value < 1
      }
    }
  },

  data () {
    return {
      computedWidth: 0,
      computedHeight: 0,
      translateX: 0,
      offset: 0,
      currentIndex: 0,
      deltaX: 0,
      deltaY: 0,
      swipers: [],
      timer: null,
      // 标记动画是否结束
      swiping: false
    }
  },

  mixins: [TouchMixin],

  computed: {
    wrapStyles () {
      const mainAxis = this.vertical ? 'height' : 'width'
      const crossAxis = this.vertical ? 'width' : 'height'
      return {
        'transform': `translate${this.vertical ? 'Y' : 'X'}(${this.offset}px)`,
        'transition': `transform ${this.swiping ? 0 : this.duration}ms`,
        [mainAxis]: `${this.trackSize}px`,
        [crossAxis]: this[crossAxis] ? `${this[crossAxis]}px` : ''
      }
    },
    trackSize () {
      return this.count * this.size
    },
    // 轮播卡片数量
    count () {
      return this.swipers.length
    },
    // 方向参数取值
    delta () {
      return this.vertical ? this.deltaY : this.deltaX
    },
    // 根据方向设置宽高计算值
    size () {
      return this[this.vertical ? 'computedHeight' : 'computedWidth']
    },
    // 可滑动距离阈值
    touchThreshold () {
      return this.threshold * this.size
    },
    // 获取当前方向
    isCorrectDirection () {
      const expect = this.vertical ? 'vertical' : 'horizontal'
      return this.direction === expect
    },
    // 第一张到最后一张的运动距离
    minOffset () {
      const rect = this.$el.getBoundingClientRect()
      return (this.vertical ? rect.height : rect.width) - this.size * this.count
    }
  },

  watch: {
    defaultSwiper (val) {
      this.initialize(val)
    },

    swipers () {
      this.initialize()
    }
  },

  methods: {
    autoPlay () {
      const { autoplay, count } = this

      if (autoplay && count > 1) {
        this.clear()
        this.timer = setTimeout(() => {
          this.swiping = true
          this.resetTouchStatus()
          this.correctPosition()

          doubleRaf(() => {
            this.swiping = false
            this.moveTo({
              pace: 1,
              emitChange: true
            })
            this.autoPlay()
          })
        }, autoplay)
      }
    },

    correctPosition () {
      if (this.currentIndex <= -1) {
        this.moveTo({ pace: this.count })
      }

      if (this.currentIndex >= this.count) {
        this.moveTo({ pace: -this.count })
      }
    },

    // 界面初始化
    initialize (active = this.defaultSwiper) {
      clearTimeout(this.timer)
      if (this.$el) {
        const rect = this.$el.getBoundingClientRect()
        this.computedWidth = this.width || rect.width
        this.computedHeight = this.height || rect.height
      }

      this.swiping = true
      this.active = active
      this.offset = this.count > 1 ? -this.size * this.active : 0
      this.swipers.forEach(swiper => {
        swiper.offset = 0
      })

      this.autoPlay()
    },

    getTargetIndex (pace) {
      const { currentIndex, count } = this

      if (pace) {
        if (this.loop) {
          return range(currentIndex + pace, -1, count)
        }

        return range(currentIndex + pace, 0, count - 1)
      }

      return currentIndex
    },

    getTargetOffset (targetActive, offset) {
      let currentPosition = targetActive * this.size
      if (!this.loop) {
        currentPosition = Math.min(currentPosition, -this.minOffset)
      }

      let targetOffset = Math.round(offset - currentPosition)
      if (!this.loop) {
        targetOffset = range(targetOffset, this.minOffset, 0)
      }

      return targetOffset
    },

    // 运动
    moveTo ({ pace = 0, offset = 0, emitChange }) {
      const { loop, count, currentIndex, swipers, trackSize, minOffset } = this

      if (count <= 1) {
        return
      }

      const targetActive = this.getTargetIndex(pace)
      const targetOffset = this.getTargetOffset(targetActive, offset)

      if (loop) {
        if (swipers[0]) {
          const outRightBound = targetOffset < minOffset
          swipers[0].offset = outRightBound ? trackSize : 0
        }

        if (swipers[count - 1]) {
          const outLeftBound = targetOffset > 0
          swipers[count - 1].offset = outLeftBound ? -trackSize : 0
        }
      }

      this.currentIndex = targetActive
      this.offset = targetOffset

      if (emitChange && targetActive !== currentIndex) {
        this.$emit('change', this.activeIndicator)
      }
    },

    onTouchStart (event) {
      if (!this.touchable) return

      this.clear()
      this.swiping = true
      this.touchStart(event)
      this.correctPosition()
    },

    onTouchMove (event) {
      if (!this.touchable || !this.swiping) return

      this.touchMove(event)
      if (this.isCorrectDirection) {
        event.preventDefault()
        event.stopPropagation()
        this.moveTo({
          offset: this.delta
        })
      }
    },

    onTouchEnd (event) {
      if (!this.touchable || !this.swiping) return
      if (this.delta && this.isCorrectDirection) {
        const offset = this.vertical ? this.offsetY : this.offsetX
        this.moveTo({
          pace: offset > this.touchThreshold ? (this.delta > 0 ? -1 : 1) : 0,
          emitChanage: true
        })
      }

      this.swiping = false
      this.autoPlay()
    },

    clear () {
      clearTimeout(this.timer)
    },

    resize () {
      this.initialize()
    }
  },

  mounted () {
    this.initialize()
    this.autoPlay()
    window.addEventListener('resize', this.resize, false)
  },

  destroyed () {
    this.clear()
    window.removeEventListener('resize', this.resize)
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
            bem('wrap', {
              vertical: this.vertical
            })
          }
          style={this.wrapStyles}
          onTouchstart={this.onTouchStart}
          onTouchmove={this.onTouchMove}
          onTouchend={this.onTouchEnd}
          onTouchcancel={this.onTouchEnd}
          scopedSlots={$slots}
        >
          {$slots && $slots.default}
        </div>
        {indicators()}
      </div>
    )
  }
})
