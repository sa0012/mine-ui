import { createNamespace } from '../../src/utils'
import Icon from '../icon'
import { doubleRaf } from '../../src/utils/raf'

const [createComponent, bem] = createNamespace('dropdown-menu')

export default createComponent({
  props: {
    zIndex: {
      type: [String, Number],
      default: 33
    },
    activeColor: String,
    direction: {
      type: String,
      default: 'down',
      validator (value) {
        return ['down', 'up'].includes(value)
      }
    },
    hideMask: {
      type: Boolean,
      default: false
    },
    clickOnOverlayClose: {
      type: Boolean,
      default: true
    },
    leftIcon: {
      type: String,
      default: ''
    },
    ellipsis: {
      type: Boolean,
      default: true
    }
  },

  data () {
    return {
      children: [],
      offset: 0,
      show: false,
      active: null
    }
  },

  methods: {
    getChildren () {
      return this.$children.filter(item => item.$options.name === 'ml-dropdown-item')
    },

    updateOffset () {
      const { menu } = this.$refs
      if (!menu) return
      const rect = menu.getBoundingClientRect()
      if (this.direction === 'down') {
        this.offset = rect.bottom
      } else {
        this.offset = window.innerHeight - rect.top
      }
    },

    toggleHandler (index) {
      const children = this.getChildren()
      children.forEach((item, cIndex) => {
        if (index === cIndex) {
          this.active = index
          if (item.visible) {
            this.timer = setTimeout(() => {
              doubleRaf(() => {
                item.showWrapper = false
              })
            }, 150)
            this.active = null
          }
          item.toggle()
        } else {
          item.toggle(false)
          this.timer = setTimeout(() => {
            doubleRaf(() => {
              item.showWrapper = false
            })
          }, 150)
        }
      })
    }
  },

  mounted () {
    this.children = this.getChildren()
  },

  destroyed () {
    clearTimeout(this.timer)
  },

  render () {
    const Title = () => {
      const children = this.children
      if (!children || children.length <= 0) return
      return children.map((item, index) => {
        return (
          <div
            class={bem('item', {
              active: this.active === index
            })}
            onClick={
              () => this.toggleHandler(index)
            }
          >
            <span class={{
              [bem('item-text')]: true,
              'ml-ellipsis': this.ellipsis
            }}>{item.itemTitle}</span>
            <Icon
              name="arrow-down"
              size="16"
              class={
                bem('item-icon', {
                  active: item.visible
                })
              }
            />
          </div>
        )
      })
    }
    return (
      <div
        ref="menu"
        class={bem()}
      >
        <section
          class={bem('bar', {
            open: this.active !== null
          })}
        >
          {Title()}
        </section>
        {this.$slots && this.$slots.default}
      </div>
    )
  }
})
