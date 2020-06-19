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
      console.log(val, 'val')
    }
  },

  methods: {
    onCancel () {
      this.$emit('input', false)
    },

    closeOverlay () {
      if (!this.closeOnClickOverlay) return
      this.showMask = false
      this.onCancel()
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
        <Overlay
          show={this.showMask}
          onClick={this.closeOverlay}
        />
        {Content()}
      </div>
    )
  }
})
