import { createNamespace, isDef } from '../../src/utils'
import { resetScroll } from '../../src/utils/dom/scroll'

const [createComponent, bem] = createNamespace('textarea')

export default createComponent({
  props: {
    maxLen: {
      type: Number,
      default: 150
    },
    height: {
      type: Number,
      default: 100
    },
    value: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: ''
    },
    textBgColor: {
      type: String,
      default: ''
    },
    limitShow: {
      type: Boolean,
      default: true
    }
  },

  computed: {
    currentLen () {
      return this.value.length
    },

    textStyles () {
      return {
        height: `${this.height}px`,
        backgroundColor: this.textBgColor
      }
    },

    listeners () {
      const listeners = {
        ...this.$listeners,
        input: this.onInput,
        focus: this.onFocus,
        blur: this.onBlur
      }

      return listeners
    }
  },

  methods: {
    format (target = this.$refs.textarea) {
      if (!target) return

      let { value } = target
      const { maxlength } = this

      if (isDef(maxlength) && value.length > maxlength) {
        value = value.slice(0, maxlength)
        target.value = value
      }

      return value
    },

    onInput (event) {
      if (event.target.composing) return
      this.$emit('input', this.format(event.target))
    },

    focus () {
      if (this.$refs.textarea) {
        this.$refs.textarea.focus()
      }
    },

    blur () {
      if (this.$refs.textarea) {
        this.$refs.textarea.blur()
      }
    },

    onFocus (event) {
      this.focused = true
      this.$emit('focus', event)
    },

    onBlur (event) {
      this.focused = false
      this.$emit('blur', event)
      // ios12微信环境下，输入框失去焦点无法复位问题修复
      resetScroll()
    }
  },

  render () {
    return (
      <div
        class={
          bem()
        }
      >
        <textarea
          class={
            bem('textarea', {
              disabled: this.disabled
            })
          }
          style={this.textStyles}
          v-model={this.value}
          value={this.value}
          maxlength={this.maxLen}
          placeholder={this.placeholder}
          disabled={this.disabled}
          onInput={this.onInput}
          on={this.listeners}
        ></textarea>
        <span
          vShow={this.limitShow}
          class={
            bem('limit')
          }
        >{ this.currentLen }/{ this.maxLen }</span>
      </div>
    )
  }
})
