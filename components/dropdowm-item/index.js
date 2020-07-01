import { createNamespace } from '../../src/utils'
import { doubleRaf } from '../../src/utils/raf'
import Popup from '../popup'
import Cell from '../cell'
import Icon from '../icon'

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
    title: {
      type: String,
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
    },
    clickOnOutsideClose: {
      type: Boolean,
      default: false
    },
    delay: {
      type: [Number, String],
      default: 150,
      validator (value) {
        return Number(value)
      }
    }
  },

  data () {
    return {
      currentValue: '',
      visible: false,
      showWrapper: false,
      active: null,
      timer: null
    }
  },

  computed: {
    itemTitle () {
      if (this.title) return this.title
      if (!this.options || !this.value || !this.options.length) return
      const target = this.options.filter((item, index) => {
        if (item.value === this.value) {
          this.active = index
          return item
        }
      })
      return target.length ? target[0].text : ''
    }
  },

  methods: {
    toggle (show = !this.visible, options = {}) {
      if (show === this.visible) {
        this.showWrapper = false
        this.$parent.active = null
        return
      }
      this.visible = show

      if (show) {
        this.showWrapper = true
        this.$parent.updateOffset()
      } else {
        this.cancelOverlay()
      }
    },

    cancelOverlay () {
      // 关闭Popup之后延迟关闭wrapper（wrapper会遮挡页面，妨碍点击事件的触发）
      this.timer = setTimeout(() => {
        doubleRaf(() => {
          this.showWrapper = false
          this.$parent.active = null
        })
      }, 300)
    },

    selectItem (item, index) {
      this.$emit('select', {
        value: item,
        index
      })
      this.active = index
      if (this.clickOnOutsideClose) return
      this.timer = setTimeout(() => {
        this.toggle(false)
      }, this.delay)
    }
  },

  destroyed () {
    clearTimeout(this.timer)
  },

  render () {
    const {
      direction,
      offset
    } = this.$parent

    const objTransitionSlideType = {
      up: 'ml-slide-bottom',
      down: 'ml-slide-top'
    }[direction]
    return (
      <transition name={objTransitionSlideType}>
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
              on-close={this.cancelOverlay}
            >
              <section
                class={bem('content')}
              >
                {
                  (this.options && this.options.length > 0) && this.options.map((item, index) => (
                    <Cell
                      title={item.text}
                      class={
                        bem('option', {
                          active: this.active === index
                        })
                      }
                      border={this.options.length - 1 === index ? '' : 'bottom'}
                      onClick={
                        () => this.selectItem(item, index)
                      }
                    >
                      <Icon
                        vShow={this.active === index}
                        slot="right-icon"
                        name={this.rightIcon}
                        class={
                          bem('right-icon')
                        }
                      />
                    </Cell>
                  ))
                }
                {this.$slots && this.$slots.default}
              </section>
            </Popup>
          </div>
        </div>
      </transition>
    )
  }
})
