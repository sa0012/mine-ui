import { createNamespace } from '../../src/utils'
import Icon from '../icon'

const [createComponent, bem] = createNamespace('rater')

export default createComponent({
  props: {
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 5
    },
    value: {
      type: Number,
      default: 0
    },
    size: {
      type: String,
      default: '16'
    },
    activeColor: {
      type: String,
      default: 'rgb(255, 137, 42)'
    },
    defaultColor: {
      type: String,
      default: 'rgb(219, 219, 219)'
    },
    type: {
      type: String,
      default: 'pentagram'
    },
    disabled: Boolean
  },

  methods: {
    handleClick (i, force) {
      if (!this.disabled || force) {
        if (this.currentValue === i + 1) {
          this.currentValue = i < this.min ? this.min : i
        } else {
          this.currentValue = (i + 1) < this.min ? this.min : (i + 1)
        }
      }
      this.$emit('getScore', this.currentValue)
    }
  },

  data () {
    return {
      currentValue: 0
    }
  },

  computed: {
    list () {
      const list = []
      for (let i = 0; i < this.max; i++) {
        list.push(i + 1)
      }

      return list
    }
  },
  created () {
    this.currentValue = this.value
  },
  watch: {
    currentValue (val) {
      this.$emit('input', val)
    },
    value (val) {
      this.currentValue = val
    }
  },

  render () {
    const { currentValue, handleClick, type, size, activeColor, defaultColor } = this
    return (
      <div class={bem('rater')}>
        <input vModel={currentValue} style="display:none" />
        {
          this.list.map((i, index) => {
            return (
              <a class="sq-rater-box" onClick={
                () => {
                  handleClick(i - 1)
                }
              }>
                <Icon
                  name={type}
                  size={size}
                  color={(currentValue > i - 1) ? activeColor : defaultColor}
                />
              </a>
            )
          })
        }
      </div>
    )
  }
})
