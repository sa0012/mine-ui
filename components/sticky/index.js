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
    // 指定容器，传入一个ref节点
    container: null,
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
      translateY: 0,
      wrapperStyles: {
        position: 'static',
        top: 0,
        left: 0,
        width: 'auto', // 占位，为了形成数据绑定
        height: 'auto'
      },
      contentStyle: {
        position: 'static',
        top: 0,
        left: 0,
        width: 'auto',
        height: 'auto'
      }
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
      const { container, offsetTop } = this
      const fTop = wrapper.getBoundingClientRect().top
      const scrollTop = window.scrollTop || window.pageYOffset

      if (scrollTop + offsetTop > fTop) {
        this.fixed = true
        this.transform = 0
      } else {
        this.fixed = false
      }
    },

    onResize () {
      const { wrapper } = this.$refs
      const { contentStyle } = this
      const boxTop = wrapper.getBoundingClientRect().top
      const boxLeft = wrapper.getBoundingClientRect().left

      if (contentStyle.position === 'fixed') {
        contentStyle.top = this.top === 'unset' ? `${boxTop}px` : this.top
        contentStyle.left = this.left === 'unset' ? `${boxLeft}px` : this.left
      }
    }
  },

  mounted () {
    console.log(this.$el, '$el')
    window.addEventListener('resize', this.onResize)
    window.addEventListener('scroll', this.onScroll)
  },

  destroyed () {
    window.removeEventListener('scroll', this.onScroll)
    window.removeEventListener('resize', this.onResize)
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
