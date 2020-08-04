import { createNamespace } from '../../src/utils'

const [createComponent, bem] = createNamespace('timeline-group')

export default createComponent({
  props: {
    dotType: String,
    color: String,
    size: Number,
    borderStyle: String,
    borderColor: String,
    borderWidth: {
      type: Number,
      default: 1
    }
  },

  render () {
    return (
      <div
        class={
          bem()
        }
      >
        {this.$slots && this.$slots.default}
      </div>
    )
  }
})
