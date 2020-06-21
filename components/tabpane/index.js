import { createNamespace, isFunc } from '../../src/utils'

const [createComponent, bem] = createNamespace('tabpane')

export default createComponent({
  props: {
    name: [String, Number],
    label: [String, Number]
  },

  mounted () {},

  render () {
    const {
      name,
      label,
      $slots
    } = this

    const defaultSlot = isFunc($slots.default) ? $slots.default : $slots.default
    return (
      <div class={
        bem()
      }>
        {defaultSlot}
      </div>
    )
  }
})
