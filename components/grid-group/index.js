import { createNamespace } from '../../src/utils'

const [createComponent, bem] = createNamespace('grid-group')

export default createComponent({
  props: {
    columns: {
      type: Number,
      default: 3
    },
    backgroundColor: String,
    borderColor: String,
    borderStyle: String,
    height: Number,
    count: Number,
    padding: String,
    margin: String
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
