import { createNamespace } from '../../src/utils'

const [createComponent, bem] = createNamespace('index-anchor')

export default createComponent({
  props: {
    index: [String, Number]
  },

  data () {
    return {
      top: 0,
      active: false,
      position: 'static',
      height: 0
    }
  },

  mounted () {
    this.height = this.$el.offsetHeight
  },

  computed: {
    sticky () {
      console.log(this.active, this.$parent.sticky, 'parent')
      return this.active && this.$parent.sticky
    },

    anchorStyle () {
      if (this.sticky) {
        return {
          position: this.position,
          zIndex: `${this.$parent.zIndex}`,
          transform: `translate3d(0, ${this.top}px, 0)`
        }
      }
    }
  },

  watch: {
    active (newVal) {
      console.log(newVal, 'active')
    }
  },

  methods: {
    scrollIntoView () {
      this.$el.scrollIntoView()
    },

    changeIndex (status) {
      this.active = status
    }
  },

  render () {
    const {
      sticky
    } = this
    return (
      <div
        style={{
          height: sticky ? `${this.height}px` : ''
        }}
      >
        <div
          style={this.anchorStyle}
          class={[bem({ sticky }), {
            'sticky': sticky
          }]}
        >
          {this.slots('default') || this.index}
        </div>
      </div>
    )
  }
})
