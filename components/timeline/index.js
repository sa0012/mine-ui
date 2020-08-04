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
    dotType: String,
    iconSize: {
      type: Number,
      default: 20
    },
    iconColor: {
      type: String,
      default: '#ccc'
    },
    showLeft: {
      type: Boolean,
      default: true
    },
    showRight: {
      type: Boolean,
      default: true
    },
    borderStyle: {
      type: String,
      default: 'solid'
    },
    borderWidth: {
      type: Number,
      default: 1
    },
    borderColor: {
      type: String,
      default: '#ccc'
    }
  },

  computed: {
    setStyles () {
      const style = {}
      const { dotType, color, size } = this.$parent
      if (dotType || this.dotType) {
        style.borderLeft = 'none'
        style.borderColor = 'transparent'
      } else {
        style.borderColor = color || this.iconColor
      }

      style.width = (size || this.iconSize) + 'px'
      style.height = (size || this.iconSize) + 'px'
      style.color = color || this.iconColor

      return style
    },

    setBorderType () {
      const { borderStyle, borderWidth, borderColor } = this.$parent
      const style = {}

      style.borderStyle = borderStyle || this.borderStyle
      style.borderWidth = (borderWidth || this.borderWidth) + 'px'
      style.borderColor = borderColor || this.borderColor
      return style
    }
  },

  render () {
    const { dotType } = this.$parent
    const rightSlots = (item) => {
      if (!this.showRight) return
      return this.$slots && this.$slots['right'] ? this.$slots['right'] : item.message
    }

    const leftSlots = (item) => {
      if (!this.showLeft) return
      return (<div
        class={
          bem('item-left')
        }
      >
        {
          this.$slots && this.$slots['left'] ? this.$slots['left'] : (
            <div>
              <div>{ splitDate(item.date)['hms'] }</div>
              <div>{ splitDate(item.date)['ymd'] }</div>
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
        {leftSlots(this.timeline)}
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
          {rightSlots(this.timeline)}
        </div>
      </div>
    )
  }
})
