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
    lockScroll: {
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
    },
    width: {
      type: String,
      default: ''
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
      if (val) {
        // document.addEventListener('touchstart', e => this.touchStart(e))
        // document.addEventListener('touchmove', e => this.touchStart(e))
        // document.body.style.position = 'fixed'
      } else {
        console.log(val, 'static')
        // document.body.style.position = 'static'
      }
    }
  },

  mounted () {
    window.addEventListener('popstate', this.onCancel)
    if (this.hideMask) {
      this.$nextTick(() => {
        document.addEventListener('touchstart', this.onCancel)
      })
    }
  },

  beforeDestroy () {
    window.removeEventListener('popstate', this.onCancel)
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
      this.showMask = false
      this.$emit('input', false)
      this.$emit('close')
    },

    touchStart (event) {
      event.preventDefault()
      document.body.style.position = 'fixed'
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
              backgroundColor: this.backgroundColor,
              width: this.width
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
