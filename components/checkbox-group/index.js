import { createNamespace } from '../../src/utils'

const [createComponent, bem] = createNamespace('checkbox-group')

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
      return this.$children.filter(item => item.$options.name === 'ml-checkbox')
    },

    update (currentValue) {
      if (currentValue) {
        if (this.value.includes(currentValue)) {
          let flag = 0
          this.value.forEach((item, index) => {
            if (item === currentValue) {
              flag = index
            }
          })
          this.value.splice(flag, 1)
        } else {
          this.value.push(currentValue)
        }
        this.$emit('input', this.value)
        return
      }
      const children = this.getChildrens()

      children.forEach(item => {
        item.currentValue = this.value
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
