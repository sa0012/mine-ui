import { createNamespace } from '../../src/utils'

import Overlay from '../overlay'

const [createComponent, bem] = createNamespace('popup')

export default createComponent({
  props: {
    position: {
      type: String,
      default: 'center',
      validator (value) {
        return ['top', 'right', 'bottom', 'left', 'center'].indexOf(value) > -1
      }
    },
    value: {
      type: Boolean,
      required: true
    },
    closeOnClickOverlay: {
      type: Boolean,
      default: true
    },
    hideMask: {
      type: Boolean,
      default: false
    },
    zIndex: {
      type: [String, Number],
      default: 333
    },
    borderRadius: {
      type: Object,
      default: {}
    },
    backgroundColor: {
      type: String,
      default: '#fff'
    },
    overlayStyle: {
      type: Object,
      default: () => {
        return {
          position: 'fixed'
        }
      }
    }
  },

  data () {
    return {
      showMask: false
    }
  },

  watch: {
    value (val) {
      this.showMask = val
    }
  },

  mounted () {
    if (this.hideMask) {
      this.$nextTick(() => {
        document.addEventListener('touchstart', this.onCancel)
      })
    }
  },

  beforeDestroy () {
    if (this.hideMask) {
      window.removeEventListener('touchstart', this.onCancel)
    }
  },

  methods: {
    onCancel (event) {
      if (!this.$refs.wrapper) return
      const isContains = this.$refs.wrapper.contains(event.target)
      if (isContains) return
      this.$emit('input', false)
    },

    closeOverlay (event) {
      if (!this.closeOnClickOverlay) return
      console.log('closeOverlay')
      this.showMask = false
      this.$emit('close')
      this.$emit('input', false)
    }
  },

  render () {
    const {
      position,
      value
    } = this

    const objTransitionSlideType = {
      bottom: 'ml-slide-bottom',
      left: 'ml-slide-left',
      top: 'ml-slide-top',
      right: 'ml-slide-right',
      center: 'ml-fade'
    }[position]

    const Content = () => {
      return (
        <transition name={objTransitionSlideType}>
          <div
            vShow={value}
            class={
              bem('content', [position])
            }
            ref="wrapper"
            style={{
              ...this.borderRadius,
              ...this.overlayStyle,
              backgroundColor: this.backgroundColor
            }}
          >
            {this.$slots && this.$slots.default}
          </div>
        </transition>
      )
    }

    return (
      <div
        class={bem()}
      >
        {
          !this.hideMask && (
            <Overlay
              show={this.showMask}
              onClick={this.closeOverlay}
              overlayStyle={this.overlayStyle}
            />
          )
        }
        {Content()}
      </div>
    )
  }
})
