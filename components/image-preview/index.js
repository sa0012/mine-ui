import { createNamespace } from '../../src/utils'
import { range } from '../../src/utils/format/number'
import { TouchMixin } from '../../src/mixins/touch'
import Swiper from '../swiper'
import SwiperItem from '../swiper-item'
import Overlay from '../overlay'

const [createComponent, bem] = createNamespace('image-preview')

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
      touching: false
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
        transitionDuration: '.3s'
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
    },

    onTouchWrapperStart (event) {
      console.log(event, 'start')
      this.touchStartTime = Date.now()
    },

    onTouchWrapperMove (event) {
      event.preventDefault()
    },

    onTouchWrapperEnd (event) {
      event.preventDefault()
      const timeStamp = Date.now() - this.touchStartTime
      const { offsetX = 0, offsetY = 0 } = this.$refs.swiper || {}
      if (timeStamp < 300 && offsetX < 10 && offsetY < 10) {
        if (!this.doubleClickTimer) {
          this.doubleClickTimer = setTimeout(() => {
            this.doubleClickTimer = null
            // this.visible = false
            // this.$emit('input', false)
          }, 300)
        } else {
          clearTimeout(this.doubleClickTimer)
          this.doubleClickTimer = null
          this.toScale()
          this.touchable = !!(this.scale === 1)
          this.touching = !!(this.scale === 1)
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

    onImageTouchStart (event) {
      console.log(event.target, 'target')
      // event.stopPropagation()
      if (this.scale === 1) return
      console.log(1222)
      this.startMove(event)
      this.touchStart(event)
    },

    onImageTouchMove (event) {
      if (this.scale === 1) return
      if (this.moving) {
        this.touchMove(event)
        this.deltaX += this.startMoveX
        this.deltaY += this.startMoveY
        this.rangeX = range(this.deltaX, -this.maxMoveX, this.maxMoveX)
        this.rangeY = range(this.deltaY, -this.maxMoveY, this.maxMoveY)
      }
    },

    onImageTouchEnd (event) {
      this.moving = false
    },

    onChange (index) {
      console.log(index, 'index')
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
                  onTouchCancel={this.onImageTouchEnd}
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
