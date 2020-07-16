import { createNamespace, isDef } from '../../src/utils'
import { resetScroll } from '../../src/utils/dom/scroll'
import Cell from '../cell'

const [createComponent, bem] = createNamespace('field')

export default createComponent({
  inheritAttrs: false,

  props: {
    label: String,
    type: {
      type: String,
      default: 'text'
    },
    isLink: {
      type: Boolean,
      default: false
    },
    value: [String, Number],
    required: {
      type: String,
      default: ''
    },
    readonly: {
      type: Boolean,
      default: false
    },
    leftIcon: String,
    rightIcon: String,
    inputAlign: Boolean,
    clearable: {
      type: Boolean,
      default: false
    },
    hasBlurTip: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      innerHasBlurTip: false,
      focused: false
    }
  },

  computed: {
    iconClassName () {
      return this.clearable && (this.value || this.value === 0)
        ? 'error-full'
        : this.innerHasBlurTip
          ? 'alert-full'
          : this.isLink
            ? 'arrow-right'
            : this.rightIcon || ''
    },

    listeners () {
      const listeners = {
        ...this.$listeners,
        input: this.onInput,
        keypress: this.onKeypress,
        focus: this.onFocus,
        blur: this.onBlur
      }

      return listeners
    }
  },

  mounted () {
    this.format()
    if (this.hasBlurTip) {
      const oldFun = this.$refs.input.onblur
      this.$refs.input.onblur = () => {
        if (typeof oldFun === 'function') {
          oldFun() ? (this.innerHasBlurTip = false) : (this.innerHasBlurTip = true)
        } else {
          !this.value ? (this.innerHasBlurTip = true) : (this.innerHasBlurTip = false)
        }
      }
    }
  },

  methods: {
    onClickIcon (event) {
      event.preventDefault()
      if (this.clearable) {
        this.$nextTick(() => {
          this.$emit('input', '')
          this.$emit('clear', event)
        })
      } else {
        this.$emit('click-icon')
      }
    },

    format (target = this.$refs.input) {
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
      if (this.$refs.input) {
        this.$refs.input.focus()
      }
    },

    blur () {
      if (this.$refs.input) {
        this.$refs.input.blur()
      }
    },

    onFocus (event) {
      this.focused = true
      this.$emit('focus', event)

      // hack for safari
      /* istanbul ignore if */
      if (this.readonly) {
        this.blur()
      }
    },

    onBlur (event) {
      this.focused = false
      this.$emit('blur', event)
      // ios12微信环境下，输入框失去焦点无法复位问题修复
      resetScroll()
    },

    onKeypress (event) {
      if (this.type === 'number') {
        const { keyCode } = event
        const allowPoint = String(this.value).indexOf('.') === -1
        const isValidKey =
          (keyCode >= 48 && keyCode <= 57) ||
          (keyCode === 46 && allowPoint) ||
          keyCode === 45

        if (!isValidKey) {
          event.preventDefault()
        }
      }

      // trigger blur after click keyboard search button
      /* istanbul ignore next */
      if (this.type === 'search' && event.keyCode === 13) {
        this.blur()
      }

      this.$emit('keypress', event)
    },

    handleIconClick (event) {
      if (this.readonly) return
      this.onClickIcon(event)
    },

    showInput () {
      const inputSlot = this.slots('input')

      if (inputSlot) {
        return (
          <div class={bem('control', this.inputAlign)}>
            {inputSlot}
          </div>
        )
      }
      const inputProps = {
        ref: 'input',
        class: bem('control', this.inputAlign),
        domProps: {
          value: this.value
        },
        attrs: {
          ...this.$attrs,
          readonly: this.readonly
        },
        on: this.listeners,
        // add model directive to skip IME composition
        directives: [
          {
            name: 'model',
            value: this.value
          }
        ]
      }
      return (<input
        type={this.type}
        {...inputProps}
      />)
    }
  },

  beforeDestroy () {
    if (this.$refs.input) {
      if (typeof this.$refs.input.onblur === 'function') {
        this.$refs.input.onblur = null
      }
      if (typeof this.$refs.input.oninput === 'function') {
        this.$refs.input.oninput = null
      }
    }
  },

  render () {
    const {
      label,
      required,
      leftIcon,
      iconClassName,
      isLink,
      $slots,
      showInput
    } = this

    const scopedSlots = {
      title: $slots.title,
      'left-icon': $slots['left-icon'],
      'right-icon': $slots['right-icon']
    }

    return (
      <Cell
        title={label}
        leftIcon={leftIcon}
        rightIcon={iconClassName}
        required={required}
        isLink={isLink}
        scopedSlots={scopedSlots}
        on-iconClick={this.handleIconClick}
      >
        {showInput()}
      </Cell>
    )
  }
})
