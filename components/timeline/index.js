import { createNamespace } from '../../src/utils'
import { splitDate } from '../../src/filters'
import Icon from '../icon'

const [createComponent, bem] = createNamespace('timeline')

export default createComponent({
  props: {
    timeline: {
      type: Object,
      default: () => {}
    },
    showLine: {
      type: Boolean,
      default: true
    },
    timeStatus: String,
    message: String,
    dotType: String,
    iconSize: Number,
    classPrefix: String,
    iconColor: String,
    showLeft: {
      type: Boolean,
      default: true
    },
    showRight: {
      type: Boolean,
      default: true
    },
    borderStyle: String,
    borderWidth: Number,
    borderColor: String
  },

  computed: {
    setStyles () {
      const style = {}
      const { dotType, color, size } = this.$parent
      if (dotType || this.dotType) {
        style.borderLeft = 'none'
        style.borderColor = 'transparent'
      } else {
        style.borderColor = this.iconColor || color
      }

      style.width = (this.iconSize || size) + 'px'
      style.height = (this.iconSize || size) + 'px'
      style.color = this.iconColor || color

      return style
    },

    setBorderType () {
      const { borderStyle, borderWidth, borderColor } = this.$parent
      const style = {}

      style.borderStyle = this.borderStyle || borderStyle
      style.borderWidth = (this.borderWidth || borderWidth) + 'px'
      style.borderColor = this.borderColor || borderColor
      return style
    },

    setClsPrefix () {
      const { classPrefix } = this.$parent
      return this.classPrefix || classPrefix
    }
  },

  render () {
    const { dotType } = this.$parent
    const rightSlots = () => {
      if (!this.showRight) return
      return this.$slots && this.$slots['right'] ? this.$slots['right'] : this.message
    }

    const leftSlots = () => {
      if (!this.showLeft) return
      return (<div
        class={
          bem('item-left')
        }
      >
        {
          this.$slots && this.$slots['left'] ? this.$slots['left'] : (
            <div>
              <div>{ splitDate(this.timeStatus)['hms'] }</div>
              <div>{ splitDate(this.timeStatus)['ymd'] }</div>
            </div>
          )
        }
      </div>)
    }

    return (
      <div
        class={
          bem('item')
        }
      >
        {leftSlots()}
        <div
          class={
            bem('line-wrapper')
          }
        >
          <div
            class={
              bem('dot')
            }
            style={this.setStyles}
          >
            <Icon
              vShow={dotType || this.dotType}
              name={
                dotType || this.dotType
              }
              classPrefix={this.setClsPrefix}
              size={this.iconSize}
              color={this.iconColor}
            />
          </div>
          <div
            class={
              bem('line')
            }
            style={this.setBorderType}
            vShow={this.showLine}
          ></div>
        </div>
        <div
          class={
            bem('item-right')
          }
        >
          {rightSlots()}
        </div>
      </div>
    )
  }
})
