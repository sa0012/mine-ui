import { createNamespace } from '../../src/utils'
import { throttle } from '../../src/utils/throttle'
import { getScrollTop, calcTotalScrollTop } from '../../src/utils/dom/height'
import Spinner from '../spinner'

const [createComponent, bem] = createNamespace('infinite-scroll')

export default createComponent({
  props: {
    isLoading: Boolean,
    error: Boolean,
    hasMore: {
      type: Boolean,
      default: true
    },
    finishedText: {
      type: String,
      default: '不好意思，没有数据了'
    },
    errorText: {
      type: String,
      default: '加载失败，请重试'
    },
    loadingText: {
      type: String,
      default: '加载中...'
    },
    // 滚动对象
    useWindow: {
      type: Boolean,
      default: true
    },
    threshold: {
      type: Number,
      default: 200
    },
    useCapture: {
      type: Boolean,
      default: false
    },
    // 距离页面顶部高度
    offsetTop: {
      type: [String, Number],
      default: 0,
      validator (value) {
        return Number(value)
      }
    },
    size: {
      type: [String, Number],
      default: 14
    },
    color: {
      type: String,
      default: '#666'
    },
    type: {
      type: [String, Number],
      default: 8
    }
  },

  data () {
    return {
      scrollY: 0
    }
  },

  mounted () {
    this.$nextTick(() => {
      this.scrollerHandler()
    })
  },

  activated () {
    if (this.keepAlive) {
      this.keepAlive = false
      this.scrollerHandler()
    }
  },

  deactivated () {
    this.keepAlive = true
    this.scrollerHandler('close')
  },

  destroyed () {
    this.scrollerHandler('close')
  },

  computed: {
    scrollEle () {
      return this.useWindow ? window : this.$el && this.$el.parentNode
    },

    playState () {
      return !(this.error)
    }
  },

  methods: {
    onScroll () {
      if (!this.isScrollToBottom() || !this.hasMore || this.isLoading || this.error) {
        console.log(this.error, 'error')
        return false
      }

      this.$emit('loadmore')
    },

    scrollerHandler (type = 'open') {
      if (type === 'open') {
        this.scrollEle.addEventListener('scroll', throttle(this.onScroll, 200), this.useCapture)
      } else {
        this.scrollEle.removeEventListener('scroll', this.onScroll, this.useCapture)
      }
    },

    isScrollToBottom () {
      let distance
      const windowScrollTop = getScrollTop()
      // 使用window作为滚动窗口的情况下， 判断是否滚动到页面底部的公式为：
      // 实际滚动距离 = 当前页面总高度(当前页面距离顶部距离(offsetTop) + 当前页面高度(offsetHeight)) - 已经滚动过得距离（windowScrollTop）- 窗口高度
      if (this.useWindow) {
        distance = calcTotalScrollTop(this.$el) + this.$el.offsetHeight - windowScrollTop - window.innerHeight
      } else {
        const { scrollHeight, clientHeight, scrollTop } = this.scrollEle
        // 使用父容器作为滚动容器， 只需要计算
        // 容器总高度 - 容器视口高度 - 已滚动的高度
        distance = scrollHeight - clientHeight - scrollTop
      }
      // 缓存当前窗口滚动距离
      this.scrollY = windowScrollTop
      return distance <= this.threshold && windowScrollTop >= this.scrollY
    },

    retryLoad () {
      if (!this.error) return
      this.$emit('update:error', false)
      this.$emit('loadmore')
    }
  },

  render () {
    const bottomSlot = () => {
      return (
        <div class={
          bem('load-more')
        }>
          <div class={
            bem('bottom-tips')
          }>
            {
              this.isLoading || this.error ? (
                <span
                  onClick={this.retryLoad}
                >
                  <Spinner
                    class={
                      bem('spinner-arrow')
                    }
                    type={this.type}
                    size={this.size}
                    color={this.color}
                    playState={this.playState}
                  />
                  <span class={
                    bem('loading-txt')
                  }>{this.error ? this.errorText : this.loadingText}</span>
                </span>
              ) : (!this.hasMore && <span class={
                bem('tips-txt')
              }>{this.finishedText}</span>)
            }
          </div>
        </div>
      )
    }
    return (
      <div
        ref="scroller"
        class={
          bem()
        }
      >
        {this.$slots && this.$slots.default}
        {bottomSlot()}
      </div>
    )
  }
})
