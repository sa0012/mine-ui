import { createNamespace } from '../../src/utils'
import { range } from '../../src/utils/format/number'
import { TouchMixin } from '../../src/mixins/touch'
import Swiper from '../swiper'
import SwiperItem from '../swiper-item'
import Overlay from '../overlay'

const [createComponent, bem] = createNamespace('image-preview')

function getDistance (touches) {
  return Math.sqrt(
    (touches[0].clientX - touches[1].clientX) ** 2 +
      (touches[0].clientY - touches[1].clientY) ** 2
  )
}

export default createComponent({
  props: {
    imgList: {
      type: Array,
      default: () => []
    },
    value: {
      type: Boolean,
      default: false
    },
    minZoom: {
      type: Number,
      default: 1 / 3
    },
    maxZoom: {
      type: Number,
      default: 3
    },
    showIndicators: Boolean,
    startPos: {
      type: Number,
      default: 0
    }
  },

  mixins: [TouchMixin],

  data () {
    return {
      visible: false,
      touchable: true,
      scale: 1,
      doubleClickTimer: null,
      touchStartTime: 0,
      currentIndex: this.startPos,
      imagePos: {
        transform: `translate3d(0, 0, 0)`
      },
      rangeX: 0,
      rangeY: 0,
      startMoveX: 0,
      startMoveY: 0,
      maxMoveX: 0,
      maxMoveY: 0,
      lastPos: {
        x: 0,
        y: 0
      },
      startScale: 1,
      moving: false,
      zooming: false
    }
  },

  watch: {
    value (val) {
      this.visible = val
    },

    visible (val) {
      this.$emit('input', val)
    }
  },

  computed: {
    wrapperStyles () {
      const style = {
        transform: `scale3d(${this.scale}, ${this.scale}, 1)`,
        transitionDuration: this.zooming || this.moving ? '0s' : '.3s'
      }

      return style
    },

    imageStyles () {
      const { scale } = this
      const style = {}

      if (scale !== 1) {
        style.transform = `translate3d(${this.rangeX /
          scale}px, ${this.rangeY / scale}px, 0)`
      }

      return style
    }
  },

  methods: {
    toScale () {
      this.scale = this.scale === 1 ? 2 : 1
      if (this.scale === 1) {
        this.reset()
      }
    },

    reset () {
      this.scale = 1
      this.rangeX = 0
      this.rangeY = 0
      this.moving = false
      this.touchable = !this.touchable
    },

    onTouchWrapperStart (event) {
      console.log(event, 'wrapper')
      this.touchStartTime = Date.now()
    },

    onTouchWrapperMove (event) {
      event.preventDefault()
    },

    onTouchWrapperEnd (event) {
      event.preventDefault()
      const timeStamp = Date.now() - this.touchStartTime
      // const { offsetX = 0, offsetY = 0 } = this.$refs.swiper || {}
      if (timeStamp < 300) {
        if (!this.doubleClickTimer) {
          this.doubleClickTimer = setTimeout(() => {
            this.doubleClickTimer = null
            this.visible = false
            this.$emit('input', false)
          }, 300)
        } else {
          clearTimeout(this.doubleClickTimer)
          this.doubleClickTimer = null
          console.log('scale-start')
          this.toScale()
          this.touchable = !!(this.scale === 1)
        }
      }
    },

    startMove (event) {
      const image = event.currentTarget
      const rect = image.getBoundingClientRect()
      const winWidth = window.innerWidth
      const winHeight = window.innerHeight

      this.moving = true
      this.startMoveX = this.rangeX
      this.startMoveY = this.rangeY
      this.maxMoveX = Math.max(0, (rect.width - winWidth) / 2)
      this.maxMoveY = Math.max(0, (rect.height - winHeight) / 2)
    },

    startZoom (event) {
      this.moving = false
      this.zooming = true
      this.startScale = this.scale
      this.startDistance = getDistance(event.touches)
    },

    onImageTouchStart (event) {
      // event.stopPropagation()
      const { touches } = event
      const { offsetX = 0 } = this.$refs.swiper
      this.touchStart(event)
      if (touches.length === 1 && this.scale !== 1) {
        this.startMove(event)
      } else if (touches.length === 2 && !offsetX) {
        this.startZoom(event)
      }
    },

    onImageTouchMove (event) {
      const { touches } = event
      if (this.moving || this.zooming) {
        event.preventDefault()
      }
      if (this.moving) {
        this.touchMove(event)
        this.deltaX += this.startMoveX
        this.deltaY += this.startMoveY
        this.rangeX = range(this.deltaX, -this.maxMoveX, this.maxMoveX)
        this.rangeY = range(this.deltaY, -this.maxMoveY, this.maxMoveY)
      }

      if (touches.length === 2) {
        this.touchable = !!(this.scale === 1)
        const distance = getDistance(touches)
        const scale = (this.startScale * distance) / this.startDistance
        this.scale = range(scale, this.minZoom, this.maxZoom)
      }
    },

    onImageTouchEnd (event) {
      this.moving = false
      this.zooming = false
      const { touches } = event
      // 手指离开时， 恢复默认值
      if (!touches.length) {
        this.startMoveX = 0
        this.startMoveY = 0
        this.startScale = 1
        console.log(this.rangeX, 'rangeX')
        console.log(this.maxMoveX, 'maxMoveX')
        // 缩小的回弹为正常大小
        if (this.scale <= 1) {
          this.reset()
        }
      }
    },

    onChange (index) {
      this.currentIndex = index
      this.scale = 1
    }
  },

  render () {
    const swiperSlot = () => {
      const { imgList } = this
      if (!this.visible) return
      if (!imgList || !imgList.length) {
        return new Error('imgList is array')
      }

      return (<Swiper
        class={
          bem('swiper')
        }
        ref="swiper"
        autoplay={false}
        loop={false}
        showIndicators={false}
        touchable={this.touchable}
        onChange={this.onChange}
      >
        {
          imgList.map((item, index) => (
            <SwiperItem
            >
              <div
                class={
                  bem('image')
                }
                style={
                  index === this.currentIndex ? this.wrapperStyles : null
                }
                ref={`image${index}`}
                onTouchstart={this.onTouchWrapperStart}
                onTouchmove={this.onTouchWrapperMove}
                onTouchend={this.onTouchWrapperEnd}
                onTouchcancel={this.onTouchWrapperEnd}
              >
                <img
                  src={item}
                  style={
                    index === this.currentIndex ? this.imageStyles : null
                  }
                  onTouchstart={this.onImageTouchStart}
                  onTouchmove={this.onImageTouchMove}
                  onTouchend={this.onImageTouchEnd}
                  onTouchcancel={this.onImageTouchEnd}
                  alt="" />
              </div>
            </SwiperItem>
          ))
        }
      </Swiper>)
    }
    return (
      <transition name="ml-fade">
        <div
          class={
            bem()
          }
          ref="wrapper"
          vShow={this.visible}
        >
          <Overlay
            show={this.visible}
          />
          {swiperSlot()}
        </div>
      </transition>
    )
  }
})
