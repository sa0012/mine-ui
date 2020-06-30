import { createNamespace } from '../../src/utils'
import { doubleRaf } from '../../src/utils/raf'
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
      showWrapper: false,
      option: {}
    }
  },

  mounted () {
    // this.$parent.getChildren()
  },

  methods: {
    toggle (show = !this.visible, options = {}) {
      if (show === this.visible) return
      console.log(show, 'show')
      this.visible = show

      if (show) {
        this.$parent.updateOffset()
        this.showWrapper = true
      }
    },

    cancelItem () {
      this.$emit('close')
      this.showWrapper = false
    }
  },

  render () {
    const {
      direction,
      offset
    } = this.$parent
    return (
      <div class={bem()}>
        <div
          ref="wrapper"
          vShow={this.showWrapper}
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
            // on-close={this.cancelItem}
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
