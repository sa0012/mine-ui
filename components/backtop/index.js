import { createNamespace, isEmptyObj } from '../../src/utils'
import { throttle } from '../../src/utils/throttle'
import { getScrollTop, calcTotalScrollTop, setRootScrollTop } from '../../src/utils/dom/scroll'
import { raf, cancelRaf } from '../../src/utils/raf'

import Icon from '../icon'

const [createComponent, bem] = createNamespace('backtop')

export default createComponent({
  props: {
    offset: {
      type: [String, Number],
      default: 150,
      validator (val) {
        return Number(val)
      }
    },
    useCapture: {
      type: Boolean,
      default: false
    },
    bottom: {
      type: [String, Number],
      default: 30,
      validator (val) {
        return Number(val)
      }
    },
    right: {
      type: [String, Number],
      default: 20,
      validator (val) {
        return Number(val)
      }
    },
    zIndex: {
      type: [String, Number],
      default: 33,
      validator (val) {
        return Number(val)
      }
    },
    type: {
      type: String,
      default: 'circle',
      validator (val) {
        return ['circle', 'square'].includes(val)
      }
    },
    duration: {
      type: Number,
      default: 800
    },
    name: {
      type: String,
      default: 'Uploadinterfaceuploading'
    },
    text: {
      type: String,
      default: 'Top'
    },
    size: {
      type: [Number, String],
      default: 30
    },
    color: String
  },

  data () {
    return {
      visible: false,
      timer: null,
      offsetY: 0
    }
  },

  computed: {
    wrapperStyle () {
      const { bottom, right, zIndex } = this
      return {
        bottom: `${bottom}px`,
        right: `${right}px`,
        zIndex
      }
    }
  },

  methods: {
    eventHandler (type = 'add') {
      window[`${type}EventListener`]('scroll', throttle(this.onScroll, 200), this.useCapture)
      window[`${type}EventListener`]('resize', throttle(this.onScroll, 200), this.useCapture)
    },

    onScroll () {
      let scrollTop = getScrollTop()
      this.offsetY = scrollTop
      this.visible = !!(scrollTop >= this.offset)
    },

    scrollTop (y = 0) {
      window.scrollTo(0, y)
      // if (this.scrollEl === window) {
      // } else {
      //   this.scrollEl.scrollTop = y
      // }
    },

    backTop () {
      let startTime = Date.now()
      const _this = this
      let cid = raf(function fn () {
        let t = _this.duration - Math.max(0, startTime - Date.now() + _this.duration)
        let y = (t * -_this.offsetY) / _this.duration + _this.offsetY
        _this.scrollTop(y)
        cid = raf(fn)
        if (t === _this.duration || y === 0) {
          cancelRaf(cid)
        }
      })
    }
  },

  mounted () {
    this.$nextTick(() => {
      this.eventHandler()
    })
  },

  activated () {
    if (this.keepAlive) {
      this.keepAlive = false
      this.eventHandler()
    }
  },

  deactivated () {
    this.keepAlive = true
    this.eventHandler('remove')
    window.clearTimeout(this.timer)
  },

  destroyed () {
    this.eventHandler('remove')
    window.clearTimeout(this.timer)
  },

  render () {
    const Content = () => {
      if (!this.visible) return
      return isEmptyObj(this.$slots) ? this.$slots.default : (
        <div
          class={
            bem('content', [this.type])
          }
          style={this.wrapperStyle}
          onClick={this.backTop}
        >
          {
            this.type === 'circle' ? (
              <Icon
                class={
                  bem('icon')
                }
                name={this.name}
                size={this.size}
                color={this.color}
              />
            ) : this.text
          }
        </div>
      )
    }
    return (
      <div
        class={
          bem()
        }
      >
        {Content()}
      </div>
    )
  }
})
