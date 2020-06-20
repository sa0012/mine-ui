import { createNamespace } from '../../src/utils'
import Cell from '../cell'

const [createComponent, bem] = createNamespace('field')

export default createComponent({
  name: 'field',
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
    value: null,
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
      innerHasBlurTip: false
    }
  },

  computed: {
    iconClassName () {
      return this.clearable
        ? 'error-full'
        : this.innerHasBlurTip
          ? 'alert-full'
          : this.isLink
            ? 'arrow-right'
            : this.rightIcon || ''
    }
  },

  mounted () {
    if (this.hasBlurTip) {
      const oldFun = this.$refs.inputRef.onblur
      this.$refs.inputRef.onblur = () => {
        if (typeof oldFun === 'function') {
          oldFun() ? (this.innerHasBlurTip = false) : (this.innerHasBlurTip = true)
        } else {
          !this.value ? (this.innerHasBlurTip = true) : (this.innerHasBlurTip = false)
        }
      }
    }
  },

  methods: {
    $_clickIcon (event) {
      if (this.clearable) {
        this.$emit('input', '')
        this.$emit('clear', event)
      } else {
        this.$emit('click-icon')
      }
    },
    onInput (event) {
      this.$emit('input', event.target.value)
    },
    handleIconClick () {
      if (this.readonly) return
      this.$_clickIcon()
    },

    showInput () {
      const inputProps = {
        ref: 'inputRef',
        class: bem('control'),
        domProps: {
          value: this.value
        },
        attrs: {
          ...this.$attrs,
          readonly: this.readonly
        },
        on: this.$listeners,
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
    if (this.$refs.inputRef) {
      if (typeof this.$refs.inputRef.onblur === 'function') {
        this.$refs.inputRef.onblur = null
      }
      if (typeof this.$refs.inputRef.oninput === 'function') {
        this.$refs.inputRef.oninput = null
      }
    }
  },

  render () {
    const {
      label,
      value,
      required,
      leftIcon,
      iconClassName,
      isLink,
      clearable,
      $slots,
      showInput,
      handleIconClick
    } = this

    return (
      <Cell
        title={label}
        value={value}
        leftIcon={leftIcon}
        rightIcon={iconClassName}
        required={required}
        isLink={isLink}
        scopedSlots={$slots}
        on-iconClick={handleIconClick}
      >
        {showInput()}
      </Cell>
    )
  }
})
