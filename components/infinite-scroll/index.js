import { createNamespace } from '../../src/utils'
import { throttle } from '../../src/utils/throttle'

const [createComponent, bem] = createNamespace('infinite-scroll')

export default createComponent({
  props: {
    finished: Boolean,
    loading: Boolean,
    finishedText: {
      type: String,
      default: '不好意思，没有数据了'
    },
    // 滚动对象
    useWindow: {
      type: Boolean,
      default: true
    },
    // 距离页面顶部高度
    offsetTop: {
      type: [String, Number],
      default: 0,
      validator (value) {
        return Number(value)
      }
    }
  },

  data () {
    return {
      beforeScrollTop: 0
    }
  },

  mounted () {
    this.$nextTick(() => {
      window.addEventListener('scroll', throttle(this.onScroll, 200))
    })
  },

  computed: {
    scrollEle () {
      return this.useWindow ? window : this.$el ? this.$el.parentNode : null
    }
  },

  methods: {
    getScrollTop () {
      return window.pageYOffset !== undefined
        ? window.pageYOffset
        : (document.documentElement || document.body.parentNode || document.body).scrollTop
    },
    calcTotalScrollTop (el) {
      if (!el) return 0
      return el.offsetTop + this.calcTotalScrollTop(el.offsetParent)
    },
    onScroll () {
      if (this.finished || this.loading) return

      const { $el } = this
      const rect = $el.getBoundingClientRect()
      console.log(rect, '$el')
      const scrollHeight = rect.bottom - rect.top
      if (!scrollHeight) return
    },

    isScrollAtBottom () {
      let offsetDistance
      let resScrollTop = 0
      const windowScrollTop = this.getScrollTop()
      if (this.useWindow) {
        offsetDistance = this.calcTotalScrollTop(this.$refs.scroller) + this.$refs.scroller.offsetHeight - windowScrollTop - window.innerHeight
      } else {
        const { scrollHeight, clientHeight, scrollTop } = this.scrollEle
        offsetDistance = scrollHeight - clientHeight - scrollTop
        resScrollTop = scrollTop
      }
      this.$emit('scrollChange', this.useWindow ? windowScrollTop : resScrollTop)
      // 保证是往下滑动的
      this.beforeScrollTop = windowScrollTop
      return offsetDistance <= this.threshold && windowScrollTop >= this.beforeScrollTop
    }
  },

  render () {
    return (
      <div
        ref="scroller"
        class={
          bem()
        }
      >
        {this.$slots && this.$slots.default}
        <div class="load-more">
          <div class="bottom-tips">
            <template v-if="isLoading"> <i class="loading-hint"></i><span class="loading-txt">加载中...</span> </template>
            <span v-else-if="!hasMore" class="tips-txt">{this.finishedText}</span>
          </div>
        </div>
      </div>
    )
  }
})
