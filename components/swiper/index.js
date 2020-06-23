import { createNamespace } from '../../src/utils'
import { RAF } from '../../src/utils/raf'
import { TouchMixin } from '../../src/mixins/touch'

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
    }
  },

  data () {
    return {
      computedWidth: 0,
      computedHeight: 0,
      translateX: 0,
      offset: 0,
      active: 0,
      deltaX: 0,
      deltaY: 0,
      swipers: [],
      timer: null,
      // 标记动画是否结束
      swiping: false,
      directionOps: {
        vertical: 'X',
        horizontal: 'Y'
      }
    }
  },

  mixins: [TouchMixin],

  computed: {
    wrapStyles () {
      const mainAxis = this.vertical ? 'height' : 'width'
      const crossAxis = this.vertical ? 'width' : 'height'
      console.log(this.trackSize, mainAxis, 'trackSize')
      return {
        'transform': `translate${this.directionOps[this.direction]}(${this.offset}px)`,
        'transition': `transform ${this.swiping ? 0 : this.duration}ms`,
        [mainAxis]: `${this.trackSize}px`,
        [crossAxis]: this[crossAxis] ? `${this[crossAxis]}px` : ''
      }
    },
    trackSize () {
      console.log(this.size, 'size')
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
    // 获取当前方向
    isCorrectDirection () {
      const expect = this.vertical ? 'vertical' : 'horizontal'
      return this.direction === expect
    }
  },

  watch: {
    defaultSwiper (val) {
      this.initialize(val)
    }
  },

  methods: {
    autoPlay () {
      const { autoplay, count } = this

      if (autoplay && count > 1) {
        this.clear()
        this.timer = RAF.setTimeout(() => {
          this.swiping = true
          this.resetTouchStatus()

          RAF.setInterval(() => {
            this.swiping = false
            // this.autoPlay()
          }, autoplay)
        })
      }
    },

    // 界面初始化
    initialize (active = this.defaultSwiper) {
      clearTimeout(this.timer)
      if (this.$el) {
        const rect = this.$el.getBoundingClientRect()
        console.log(rect, 'rect')
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

    // 运动
    moveTo ({ pace = 0, offset = 0, emitChage }) {
      const {
        loop,
        count,
        active,
        swipers,
        trackSize
      } = this

      if (count <= 1) return

      if (loop) {
        if (swipers[0]) {}
      }
    },

    onTouchStart (event) {
      if (!this.touchable) return

      this.clear()
      this.swiping = true
      this.touchStart(event)
    },

    onTouchMove (event) {
      if (!this.touchable) return

      event.preventDefault()
      event.stopPropagation()
    },

    onTouchEnd (event) {
      if (!this.touchable) return

      this.autoPlay()
    },

    clear () {
      RAF.cancelRaf(this.timer)
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
