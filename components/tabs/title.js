import { createNamespace } from '../../src/utils'
import Icon from '../icon'

const [createComponent, bem] = createNamespace('tabs')

export default createComponent({
  props: {
    title: String,
    active: [String, Number],
    activeColor: String,
    type: {
      type: String,
      default: 'line',
      validator (value) {
        return ['line', 'block'].indexOf(value) > -1
      }
    },
    fontSize: {
      type: [String, Number],
      default: 16
    },
    iconSize: {
      type: [String, Number],
      default: 14
    },
    leftIcon: {
      type: String,
      default: 'shanchu'
    },
    hideLine: {
      type: Boolean,
      default: false
    },
    sticky: {
      type: Boolean,
      default: false
    },
    lineScale: {
      type: [String, Number],
      default: 1
    },
    titleHeight: {
      type: [String, Number],
      default: 48
    },
    disabled: Boolean,
    scrollable: {
      type: Boolean,
      default: false
    },
    ellipsis: {
      type: Boolean,
      default: true
    },
    count: {
      type: [String, Number],
      validator (value) {
        return Number(value)
      }
    },
    scrollableThreshold: {
      type: [String, Number],
      default: 4,
      validator (value) {
        return Number(value)
      }
    }
  },

  computed: {
    styles () {
      const style = {}
      const { fontSize, titleHeight, active, activeColor, ellipsis } = this

      style.fontSize = fontSize
      style.height = titleHeight
      if (active && activeColor) {
        style.color = activeColor
      }

      if (this.scrollable && ellipsis) {
        style.flexBasis = `${88 / this.scrollableThreshold}%`
        style.flex = `0 0 ${style.flexBasis}`
      }

      return style
    }
  },

  methods: {},

  render () {
    return (
      <div
        class={
          bem('header-item', {
            active: this.active,
            disabled: this.disabled,
            ellipsis: !this.ellipsis
          })
        }
        style={this.styles}
        onClick={
          () => {
            this.$emit('click')
          }
        }
      >
        {
          this.leftIcon && (
            <Icon
              name={this.leftIcon}
              size={this.iconSize}
              class={
                bem('left-icon')
              }
            />
          )
        }
        <span class={{
          'ml-ellipsis': this.ellipsis
        }}>
          { this.title }
        </span>
      </div>
    )
  }
})
