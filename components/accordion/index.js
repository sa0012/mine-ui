import { createNamespace, isFunc } from '../../src/utils'

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

  methods: {
    /**
     * 子面板的开启和关闭
     * @param {String | Number | Array} name // 当前子面板的name
     * @param {*} status // 用来标识当前子面板是open or close
     */
    switchCollapseItem (name, status) {
      // 手风琴模式，应该约定value为String类型，
      // 非手风琴模式，value的类型可宽泛为String，Number, Array
      if (!this.accordion) {
        name = status
          ? this.value.concat(name)
          : this.value.filter(active => active !== name)
      }
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
