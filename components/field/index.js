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
    classes () {}
  },

  methods: {
    $_clickIcon () {
      if (this.clearable) {
        this.$emit('input', '')
      } else {
        this.$emit('click-icon')
      }
    },
    onInput (event) {
      this.$emit('input', event.target.value)
      if (this.clearable) {}
    }
  },

  render () {
    const {
      label,
      type,
      value,
      required,
      readonly,
      leftIcon,
      rightIcon,
      isLink,
      listeners,
      $attrs,
      $slots
    } = this
    function showInput () {
      const inputProps = {
        ref: 'input',
        class: bem('control'),
        domProps: {
          value
        },
        attrs: {
          ...$attrs,
          readonly
        },
        on: listeners,
        directives: [
          {
            name: 'model',
            value
          }
        ]
      }
      return (<input
        type={type}
        {...inputProps}
      />)
    }
    return (
      <Cell
        title={label}
        value={value}
        leftIcon={leftIcon}
        rightIcon={rightIcon}
        required={required}
        isLink={isLink}
        scopedSlots={$slots}
        onClick={}
      >
        {showInput()}
      </Cell>
    )
  }
})
