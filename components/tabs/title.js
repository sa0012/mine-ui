import { createNamespace } from '../../src/utils'

const [createComponent, bem] = createNamespace('tabs')

export default createComponent({
  props: {
    title: String,
    active: [String, Number],
    activeColor: String,
    inactiveColor: String,
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
    disabled: {
      type: Boolean,
      default: false
    },
    titleScroll: {
      type: Boolean,
      default: false
    },
    ellipsis: {
      type: Boolean,
      default: true
    }
  },

  computed: {},

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
        onClick={
          () => {
            this.$emit('click')
          }
        }
      >
        <span class={{
          'ml-ellipsis': this.ellipsis
        }}>
          { this.title }
        </span>
      </div>
    )
  }
})
