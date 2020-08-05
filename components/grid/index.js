import { createNamespace } from '../../src/utils'

const [createComponent, bem] = createNamespace('grid')
const propsEnum = ['columns',
  'background',
  'borderColor',
  'borderStyle',
  'height',
  'padding',
  'margin']
export default createComponent({
  props: {
    index: Number
  },

  computed: {
    setStyles () {
      const style = {}
      const { columns, count } = this.$parent
      propsEnum.forEach((item, index) => {
        if (item === 'columns') {
          style.width = (1 / this.$parent[item] * 100).toFixed(2) + '%'
        } else {
          style[item] = this.$parent[item]
        }
      })

      const remainCount = Math.ceil(count / columns)
      const currentPos = this.index + 1
      const multiples = currentPos % columns
      if (!multiples) {
        style.borderRight = 'none'
      }

      if (currentPos > (remainCount - 1) * columns && currentPos <= remainCount * columns) {
        style.borderBottom = 'none'
      }

      return style
    }
  },

  data () {
    return {
      clickCls: '',
      timer: null
    }
  },

  methods: {
    onClick () {
      this.clickCls = 'ripple'
      this.timer = setTimeout(() => {
        this.clickCls = ''
      }, 1000)
      this.$emit('click')
    }
  },

  destroyed () {
    window.clearTimeout(this.timer)
  },

  render () {
    return (
      <div
        class={[
          bem(),
          this.clickCls
        ]}
        style={this.setStyles}
        onClick={this.onClick}
      >
        {this.$slots && this.$slots.default}
      </div>
    )
  }
})
