
import { createNamespace } from '../../src/utils'
import PickerColumn from './column'

const [createComponent, bem] = createNamespace('picker')

export default createComponent({
  props: {
    title: String,
    showToolbar: Boolean,
    cancelBtnText: {
      type: String,
      default: '取消'
    },
    confirmBtnText: {
      type: String,
      default: '确定'
    },
    columns: {
      type: Boolean,
      default: () => []
    },
    valueKey: String
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
      showToolbar,
      cancelBtnText,
      confirmBtnText
    } = this
    const TitleBar = showToolbar && (
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

    const genColumn = () => {
      if (!this.columns || !this.columns.length) return
      return this.columns.map((item, index) => (
        <PickerColumn
          value-key={this.valueKey}
        />
      ))
    }

    const Body = (
      <div
        class={
          bem('body')
        }
        onTouchmove={e => e.preventDefault()}
      >
        <div
          class={
            bem('body-placeholder')
          }
        ></div>
        <div
          class={
            bem('body-content')
          }
        >
          {genColumn()}
        </div>
      </div>
    )
    return (
      <div
        class={
          bem()
        }
      >
        {TitleBar}
        {Body}
      </div>
    )
  }
})
