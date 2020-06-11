import { createNamespace } from '../../src/utils'

const [createComponent, bem] = createNamespace('radio-group')

export default createComponent({
  props: {
    value: {
      type: String,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      validator (value) {
        return ['button', 'cell', 'cell-between'].indexOf(value) > -1
      }
    }
  },

  methods: {
    getChildrens () {
      // 获取所有radio类型的子组件
      return this.$children.filter(item => item.$options.name === 'ml-radio')
    },

    update (currentValue) {
      if (currentValue) {
        this.$emit('input', currentValue)
        return
      }
      const children = this.getChildrens()

      children.forEach(item => {
        if (this.value === item.name) {
          item.currentValue = this.value
        }
      })
    }
  },

  watch: {
    value (val) {
      const children = this.getChildrens()
      children.forEach(item => {
        item.currentValue = val
      })

      this.$emit('change', val)
    }
  },

  render () {
    return (
      <span
        class={bem(
          [
            this.type,
            this.disabled && 'disabled'
          ]
        )}
      >
        {this.$slots.default}
      </span>
    )
  }
})
