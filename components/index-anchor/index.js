import { createNamespace } from '../../src/utils'
import Sticky from '../sticky'

const [createComponent, bem] = createNamespace('index-anchor')

export default createComponent({
  props: {
    index: [String, Number],
    zIndex: [Number, String],
    offsetTop: [Number, String]
  },

  data () {
    return {
      top: 0,
      active: '',
      position: 'static',
      height: 0,
      fixed: false
    }
  },

  mounted () {
    this.height = this.$el.offsetHeight
  },

  computed: {
    sticky () {
      return this.fixed && this.active === this.index
    }
  },

  methods: {
    scrollIntoView () {
      this.$el.scrollIntoView()
      this.changeIndex(this.index)
    },

    changeIndex (status) {
      this.active = status
    },

    handleChange (fixed) {
      this.fixed = fixed
    }
  },

  render () {
    const {
      sticky
    } = this
    // console.log(this.active, this.index, 'index')
    return (
      <Sticky
        z-index={this.zIndex}
        offset-top={this.offsetTop}
        onChange={this.handleChange}
      >
        <div
          style={{
            height: sticky ? `${this.height}px` : ''
          }}
        >
          <div
            class={[bem({
              sticky
            })]}
          >
            {this.slots('default') || this.index}
          </div>
        </div>
      </Sticky>
    )
  }
})
