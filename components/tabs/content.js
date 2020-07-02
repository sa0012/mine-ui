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

  computed: {},

  methods: {
    contentSlots () {
      if (this.animated) {}

      return this.$slots && this.$slots.default
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
        on={this.$listeners}
      >
        {this.contentSlots()}
      </div>
    )
  }
})
