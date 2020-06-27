import { createNamespace, isFunc } from '../../src/utils'

const [createComponent, bem] = createNamespace('tabpane')

export default createComponent({
  props: {
    name: String,
    title: String
  },

  mounted () {
    console.log('father')
    this.$parent.getChildren()
  },

  render () {
    const {
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
