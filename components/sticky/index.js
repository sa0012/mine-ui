import { createNamespace } from '../../src/utils'

const [createComponent, bem] = createNamespace('sticky')

export default createComponent({
  props: {
    zIndex: {
      type: [Number, String],
      validator (val) {
        return Number(val)
      }
    },
    offsetTop: {
      type: [Number, String],
      default: 0,
      validator (val) {
        return Number(val)
      }
    }
  },

  data () {
    return {
      height: 0,
      fixed: null,
      translateY: 0
    }
  },

  computed: {
    styles () {
      if (!this.fixed) return

      const style = {}

      if (this.zIndex) style.zIndex = this.zIndex
      if (this.offsetTop) style.top = `${this.offsetTop}px`
      if (this.translateY) style.transform = `translate3d(0, ${this.translateY}px, 0)`

      return style
    }
  },

  methods: {
    onScroll () {
      const { wrapper } = this.$refs
      const { offsetTop } = this
      this.height = this.$el.offsetHeight
      const fTop = wrapper.getBoundingClientRect().top
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0

      if (scrollTop + offsetTop > fTop + scrollTop) {
        this.fixed = true
        this.transform = 0
      } else {
        this.fixed = false
      }

      this.$emit('change', this.fixed)
    }
  },

  mounted () {
    window.addEventListener('scroll', this.onScroll)
  },

  destroyed () {
    window.removeEventListener('scroll', this.onScroll)
  },

  render () {
    const { fixed } = this
    const style = {
      height: fixed ? `${this.height}px` : null
    }
    return (
      <div
        class={
          bem()
        }
        ref="wrapper"
        style={style}
      >
        <div
          class={
            bem('content', {
              fixed
            })
          }
          ref="inner"
          style={this.styles}
        >
          {this.$slots && this.$slots.default}
        </div>
      </div>
    )
  }
})
