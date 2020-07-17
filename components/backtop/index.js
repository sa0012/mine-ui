import { createNamespace, isEmptyObj, isFunc, isString } from '../../src/utils'
import { throttle } from '../../src/utils/throttle'
import { getScrollTop } from '../../src/utils/dom/scroll'
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
    useWindow: {
      type: Boolean,
      default: true
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
    name: {
      type: String,
      default: 'back-top'
    },
    text: {
      type: String,
      default: 'Top'
    },
    step: {
      type: Number,
      default: 50
    },
    size: {
      type: [Number, String],
      default: 24
    },
    scroller: {
      type: [String, Function, Object],
      default: window
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
    },

    scrollEle () {
      return isFunc(this.scroller) ? this.scroller() : this.getContainer(this.scroller)
    }
  },

  methods: {
    eventHandler (type = 'add') {
      this.scrollEle[`${type}EventListener`]('scroll', throttle(this.onScroll, 200), this.useCapture)
      window[`${type}EventListener`]('resize', throttle(this.onScroll, 200), this.useCapture)
    },

    getContainer (element) {
      if (
        isString(element) &&
        (element.indexOf('.') !== -1 || element.indexOf('#') !== -1)
      ) {
        return document.querySelector(element)
      } else if (element === 'body') {
        return document.body
      } else if (element === 'html') {
        return document.documentElement
      }

      return window
    },

    onScroll () {
      let scrollTop = getScrollTop()
      if (this.scroller !== window) {
        scrollTop = this.scrollEle.scrollTop
      }
      this.offsetY = scrollTop
      this.visible = !!(scrollTop >= this.offset)
    },

    scrollTop (y = 0) {
      if (this.scrollEle === window) {
        window.scrollTo(0, y)
      } else {
        this.scrollEle.scrollTop = y
      }
    },

    backTop () {
      const _this = this
      let cid = raf(function fn () {
        let top = getScrollTop()
        if (_this.scroller !== window) {
          top = _this.scrollEle.scrollTop
        }
        if (top > 0) {
          _this.scrollTop(top - _this.step)
          cid = raf(fn)
        } else {
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
