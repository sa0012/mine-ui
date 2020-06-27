import { createNamespace, isFunc, isArray } from '../../src/utils'

const [createComponent, bem] = createNamespace('accordion')

export default createComponent({
  props: {
    value: [String, Number, Array],
    // 是否开启手风琴模式
    accordion: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {}
  },

  methods: {
    getChildren () {
      return this.$children.filter(item => item.$options.name === 'ml-accordion-item')
    },
    update (val, status) {
      if (isArray(this.value)) {
        if (!this.value.includes(val)) {}
      } else {
        return status ? val : undefined
      }
    },
    switchCollapseItem (name, status) {
      if (!this.accordion) {
        name = status
          ? this.value.concat(name)
          : this.value.filter(active => active !== name)
      }
      console.log(name, 'name---')
      this.$emit('change', name)
      this.$emit('input', name)
    }
  },

  render () {
    return (
      <div
        class={bem()}
      >
        {isFunc(this.$slots.default) ? this.$slots.default() : this.$slots.default}
      </div>
    )
  }
})
