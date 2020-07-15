import { createNamespace } from '../../src/utils'
import { throttle } from '../../src/utils/throttle'

const [createComponent, bem] = createNamespace('infinite-scroll')

export default createComponent({
  props: {
    finished: Boolean,
    loading: Boolean,
    finishedText: String,
    // 距离页面顶部高度
    offsetTop: {
      type: [String, Number],
      default: 0,
      validator (value) {
        return Number(value)
      }
    }
  },

  mounted () {
    this.$nextTick(() => {
      document.addEventListener('scroll', throttle(this.onScroll, 200))
    })
  },

  methods: {
    onScroll () {
      if (this.finished || this.loading) return

      const { $el } = this
      const rect = $el.getBoundingClientRect()
      console.log(rect, '$el')
      const scrollHeight = rect.bottom - rect.top
      if (!scrollHeight) return
      const placeholderRect = this.$refs.placeholder.getBoundingClientRect()
      console.log(scrollHeight, 'scroll')

      const isBottom = placeholderRect.bottom - rect.bottom <= this.offset
      if (isBottom) {
        console.log(1234444)
      }
    }
  },

  render () {
    return (
      <div
        class={
          bem()
        }
      >
        {this.$slots && this.$slots.default}
        <div ref="placeholder" class={bem('placeholder')} />
      </div>
    )
  }
})
