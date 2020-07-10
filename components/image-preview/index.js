import { createNamespace } from '../../src/utils'
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

  data () {
    return {
      visible: false,
      touchable: true,
      scale: 1,
      doubleClickTimer: null,
      currentIndex: this.startPos
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
    imgStyles () {
      const style = {
        transform: `scale3d(${this.scale}, ${this.scale}, 1)`,
        transitionDuration: '.3s'
      }

      return style
    }
  },

  methods: {
    toScale () {
      console.log(1223333)
      this.scale = this.scale === 1 ? 2 : 1
    },

    onImageTouchStart (event) {
      if (!this.doubleClickTimer) {
        this.doubleClickTimer = setTimeout(() => {
          this.doubleClickTimer = null
        }, 300)
      } else {
        // this.touchable = false
        clearTimeout(this.doubleClickTimer)
        this.doubleClickTimer = null
        this.toScale()
      }
    },

    onImageTouchMove () {},

    onImageTouchEnd () {},

    onChange (index) {
      console.log(index, 'index')
      this.currentIndex = index
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
        autoplay={false}
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
                  index === this.currentIndex ? this.imgStyles : null
                }
                onTouchstart={this.onImageTouchStart}
                onTouchmove={this.onImageTouchMove}
                onTouchend={this.onImageTouchEnd}
                onTouchcancel={this.onImageTouchEnd}
              >
                <img
                  src={item}
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
