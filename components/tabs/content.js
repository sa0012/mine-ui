import { createNamespace } from '../../src/utils'
import { TouchMixin } from '../../src/mixins/touch'

const [createComponent, bem] = createNamespace('tabs')
const MIN_SWIPE_DISTANCE = 50

export default createComponent({
  mixins: [TouchMixin],

  props: {
    count: Number,
    duration: Number,
    animated: Boolean,
    swipeable: Boolean,
    currentIndex: Number
  },

  computed: {
    styles () {
      if (this.animated) {
        return {
          transform: `translate3d(${-1 * this.currentIndex * 100}%, 0, 0)`,
          transitionDuration: `${this.duration}s`
        }
      }
    },

    listeners () {
      return {
        touchstart: this.touchStart,
        touchmove: this.touchMove,
        touchend: this.onTouchEnd,
        touchcancel: this.onTouchEnd
      }
    }
  },

  methods: {
    contentSlots () {
      const slots = this.$slots && this.$slots.default
      if (this.animated) {
        return (
          <div
            class={
              bem('animated-content')
            }
            style={this.styles}
          >
            {slots}
          </div>
        )
      }

      return slots
    },

    onTouchEnd () {
      const { direction, deltaX, currentIndex, count } = this
      if (direction === 'horizontal' && this.offsetX >= MIN_SWIPE_DISTANCE) {
        if (deltaX > 0 && currentIndex !== 0) {
          this.$emit('change', currentIndex - 1)
        } else if (deltaX < 0 && currentIndex !== count - 1) {
          this.$emit('change', currentIndex + 1)
        }
      }
    }
  },

  render () {
    return (
      <div
        class={
          bem('content', {
            animated: this.animated
          })
        }
        {...{on: this.listeners}}
      >
        {this.contentSlots()}
      </div>
    )
  }
})
