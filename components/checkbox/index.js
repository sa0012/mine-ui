import { createNamespace } from '../../src/utils'
import Checkicon from '../checkicon'

const [createComponent, bem] = createNamespace('checkbox')

export default createComponent({
  props: {
    // name作为radio的id进行身份识别
    name: {
      type: [String, Number],
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'round',
      validator (value) {
        return ['round', 'square', 'square-border'].indexOf(value) > -1
      }
    }
  },

  computed: {
    isChecked () {
      return this.name === this.currentValue.filter(item => this.name === item)[0]
    }
  },

  data () {
    return {
      currentValue: []
    }
  },

  methods: {
    $_change () {
      if (this.disabled || this.$parent.disabled) return
      // 调用父组件update方法更新状态
      this.$parent && this.$parent.$options.name === 'ml-checkbox-group' && this.$parent.update(this.name)
    }
  },

  mounted () {
    this.$parent && this.$parent.$options.name === 'ml-checkbox-group' && this.$parent.update()
  },

  render () {
    const {
      type,
      disabled,
      $slots,
      $parent
    } = this
    return (
      <span
        class={bem([
          disabled && 'disabled'
        ])}
      >
        <span
          onClick={this.$_change}
          class={
            bem('wrap')
          }
        >
          <Checkicon
            value={this.isChecked}
            disabled={
              $parent.disabled || disabled
            }
            type={type}
          />
          <span
            class={bem('text')}
          >
            {$slots.default}
          </span>
        </span>
      </span>
    )
  }
})
