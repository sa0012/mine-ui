import { createNamespace } from '../../src/utils'

const [createComponent, bem] = createNamespace('grid-group')

export default createComponent({
  props: {
  },

  render () {
    return (
      <div
        class={
          bem()
        }
      ></div>
    )
  }
})
