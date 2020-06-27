import { createNamespace, isFunc, isDef, isArray } from '../../src/utils'
import { raf, doubleRaf } from '../../src/utils/raf'
import Cell from '../cell'
import Icon from '../icon'

const [createComponent, bem] = createNamespace('accordion-item')

export default createComponent({
  props: {
    name: [String, Number],
    title: String,
    leftIcon: String,
    label: String,
    disabled: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      show: null,
      inited: null
    }
  },

  computed: {
    expanded () {
      if (!this.$parent) return

      const { value, accordion } = this.$parent

      // console.log(value, accordion, 'accordion---')
      if (!accordion && !isArray(value)) return

      console.log(value, accordion, 'value')
      return accordion
        ? value === this.name
        : value.some(name => name === this.name)
    }
  },

  created () {
    this.show = this.expanded
    this.inited = this.expanded
  },

  watch: {
    expanded (newVal, oldVal) {
      if (oldVal === null) return

      if (newVal) {
        this.show = this.inited = newVal
      }

      this.$nextTick(() => {
        const { content, wrapper } = this.$refs
        if (!content || !wrapper) return

        const { offsetHeight } = content
        if (offsetHeight) {
          console.log(offsetHeight, 'offsetHeight')
          const contentHeight = `${offsetHeight}px`
          wrapper.style.height = newVal ? 0 : contentHeight

          doubleRaf(() => {
            wrapper.style.height = newVal ? contentHeight : 0
          })
        } else {
          this.onTrasitionEnd()
        }
      })
    }
  },

  methods: {
    onClick () {
      console.log(this.name, this.expanded, this.$parent.value, 'name122')
      if (this.disabled) return
      const { $parent } = this
      const name = $parent.accordion && this.name === $parent.value
        ? ''
        : this.name
      $parent.switchCollapseItem(name, !this.expanded)
      console.log($parent.value, this.expanded, 'name')
    },

    onTransitionEnd () {
      console.log(this.name, 'this.name')
      if (!this.expanded) {
        this.show = false
      } else {
        this.$refs.wrapper.style.height = ''
      }
    }
  },

  render () {
    const {
      $slots
    } = this
    const scopedSlots = {
      title: $slots.title,
      'left-icon': $slots['left-icon']
    }

    const titleContent = (
      <Cell
        title={this.title}
        value={this.label}
        leftIcon={this.leftIcon}
        scopedSlots={scopedSlots}
        onClick={this.onClick}
      >
        <Icon
          slot="right-icon"
          name="arrow-up"
          class={
            bem('right-icon', {
              'open': this.show
            })
          }
        />
      </Cell>
    )

    const Content = this.inited && (
      <div
        ref="wrapper"
        class={
          bem('wrapper')
        }
        vShow={this.show}
        onTransitionend={this.onTransitionEnd}
      >
        <div
          ref="content"
          class={
            bem('content')
          }
        >
          {isFunc(this.$slots.default) ? this.$slots.default() : this.$slots.default}
        </div>
      </div>
    )
    return (
      <div
        class={bem()}
      >
        {titleContent}
        {Content}
      </div>
    )
  }
})
