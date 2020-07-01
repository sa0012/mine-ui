import { createNamespace, isFunc } from '../../src/utils'

const [createComponent, bem] = createNamespace('tabpane')

export default createComponent({
  props: {
    name: String,
    title: String
  },

  mounted () {
    this.$parent.getChildren()
  },

  render () {
    const {
      $slots,
      $parent
    } = this

    const defaultSlot = isFunc($slots.default) ? $slots.default : $slots.default
    return (
      <div
        vShow={$parent.currentName === this.name}
        class={
          bem()
        }
      >
        {defaultSlot}
      </div>
    )
  }
})
