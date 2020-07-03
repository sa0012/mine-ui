import { createNamespace, isFunc } from '../../src/utils'

const [createComponent, bem] = createNamespace('tabpane')

export default createComponent({
  inject: ['tabs'],
  props: {
    name: String,
    title: String,
    disabled: {
      type: Boolean,
      default: false
    }
  },

  mounted () {
    this.tabs.children.push(this)
  },

  destroyed () {
    this.tabs.children.splice(this.tabs.children.indexOf(this), 1)
  },

  render () {
    const {
      $slots,
      tabs
    } = this

    const defaultSlot = isFunc($slots.default) ? $slots.default : $slots.default

    if (tabs.animated) {
      return (
        <div
          class={
            bem('', {
              inactive: tabs.currentName !== this.name
            })
          }
        >
          {defaultSlot}
        </div>
      )
    }
    return (
      <div
        vShow={tabs.currentName === this.name}
        class={
          bem()
        }
      >
        {defaultSlot}
      </div>
    )
  }
})
