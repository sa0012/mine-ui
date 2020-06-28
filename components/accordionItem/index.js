import { createNamespace, isFunc, isArray } from '../../src/utils'
import { doubleRaf } from '../../src/utils/raf'
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
      show: false
    }
  },

  computed: {
    // 判断当前子面板是否需要展开
    expanded () {
      if (!this.$parent) return

      const { value, accordion } = this.$parent

      // 非手风琴模式下， value传递的应该是一个Array
      if (!accordion && !isArray(value)) {
        return console.error('If not in accordion mode, please pass an Array type data')
      }

      return accordion
        ? value === this.name
        : value.some(name => name === this.name)
    }
  },

  created () {
    this.show = this.expanded
  },

  watch: {
    expanded (newVal, oldVal) {
      if (oldVal === null) return

      if (newVal) {
        this.show = newVal
      }

      // 更新DOM高度
      this.$nextTick(() => {
        const { content, wrapper } = this.$refs
        if (!content || !wrapper) return

        const { offsetHeight } = content
        if (offsetHeight) {
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
      if (this.disabled) return
      const { $parent } = this
      const name = $parent.accordion && this.name === $parent.value
        ? ''
        : this.name
      $parent.switchCollapseItem(name, !this.expanded)
    },

    onTransitionEnd () {
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
        class={
          bem('title', {
            disabled: this.disabled
          })
        }
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

    const Content = (
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
