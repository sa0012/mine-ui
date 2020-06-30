import { createNamespace } from '../../src/utils'
import Popup from '../popup'
import Cell from '../cell'

const [createComponent, bem] = createNamespace('dropdown-item')

export default createComponent({
  props: {
    options: {
      type: Array,
      default: []
    },
    value: {
      type: [String, Number],
      default: ''
    },
    zIndex: {
      type: [String, Number],
      default: 33
    },
    activeColor: String,
    hideMask: {
      type: Boolean,
      default: false
    },
    clickOnOverlayClose: {
      type: Boolean,
      default: true
    },
    rightIcon: {
      type: String,
      default: 'checkmark'
    }
  },

  data () {
    return {
      currentValue: '',
      visible: false,
      option: {}
    }
  },

  mounted () {
    // this.$parent.getChildren()
  },

  methods: {
    toggle (show = !this.visible, options = {}) {
      console.log(show, 'show')
      if (show === this.visible) return
      this.visible = show

      if (show) {
        this.$parent.updateOffset()
      }
    }
  },

  render () {
    const {
      direction,
      offset
    } = this.$parent
    console.log(this.styles, 'styles')
    return (
      <div class={bem()}>
        <div
          ref="wrapper"
          class={
            bem('wrapper', {
              [direction]: direction
            })
          }
          style={{
            [direction === 'down' ? 'top' : 'bottom']: offset + 'px'
          }}
        >
          <Popup
            vModel={this.visible}
            background-color="transparent"
            overlayStyle={{ position: 'absolute' }}
            position={direction === 'down' ? 'top' : 'bottom'}
          >
            <section
              class={bem('content')}
            >
              {
                (this.options && this.options.length > 0) && this.options.map((item, index) => (
                  <Cell
                    title={item.text}
                    border={this.options.length - 1 === index ? '' : 'bottom'}
                    right-icon={this.rightIcon}
                  />
                ))
              }
            </section>
          </Popup>
        </div>
      </div>
    )
  }
})
