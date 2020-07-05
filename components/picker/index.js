
import { createNamespace } from '../../src/utils'

const [createComponent, bem] = createNamespace('picker')

export default createComponent({
  props: {
    title: String,
    showBar: Boolean,
    cancelBtnText: {
      type: String,
      default: '取消'
    },
    confirmBtnText: {
      type: String,
      default: '确定'
    }
  },

  methods: {
    onCancel () {
      this.$emit('cancel')
    },

    onConfirm () {
      this.$emit('confirm')
    }
  },

  render () {
    const {
      title,
      showBar,
      cancelBtnText,
      confirmBtnText
    } = this
    const TitleBar = showBar && (
      <div
        class={
          bem('header')
        }
      >
        <span
          onClick={this.onCancel}
        >{cancelBtnText}</span>
        <span>{title}</span>
        <span
          onClick={this.onConfirm}
        >{confirmBtnText}</span>
      </div>
    )
    return (
      <div
        class={
          bem()
        }
      >
        {TitleBar}
      </div>
    )
  }
})
