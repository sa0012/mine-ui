
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
    defaultIndex: {
      type: Number,
      default: 0
    },
    columns: {
      type: Boolean,
      default: () => []
    },
    valueKey: String,
    rowCount: {
      type: Number,
      default: 5
    },
    rowHeight: {
      type: Number,
      default: 44
    },
    hideEmptyColumn: Boolean
  },

  data () {
    return {
      children: []
    }
  },

  computed: {
    wrapperStyles () {
      return { height: `${this.rowHeight * this.rowCount}px` }
    },

    maskHeight () {
      return { height: `${this.rowHeight * parseInt(this.rowCount / 2)}px` }
    }
  },

  methods: {
    formatColumns (columns) {
      if (columns.length && Array.isArray(columns[0])) {
        return columns
      } else if (Object.prototype.toString.call(columns[0]) === '[object Object]' && columns[0].values) {
        return columns.map(column => { return column.values })
      } else {
        return [columns]
      }
    },

    onCancel () {
      this.$emit('cancel')
    },

    onConfirm () {
      this.$emit('confirm')
    },

    onChange () {}
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
        <button
          onClick={this.onCancel}
          class={{
            [bem('header-btn')]: true,
            'cancel': true
          }}
        >{cancelBtnText}</button>
        <span class={
          bem('header-title')
        }>{title}</span>
        <button
          onClick={this.onConfirm}
          class={{
            [bem('header-btn')]: true,
            'confirm': true
          }}
        >{confirmBtnText}</button>
      </div>
    )

    const genColumn = () => {
      if (!this.columns || !this.columns.length) return
      const columns = this.formatColumns(this.columns)
      return columns.map((item, index) => (
        <PickerColumn
          value-key={this.valueKey}
          list={item}
          format={this.format && this.format.length ? this.format[index] : ''}
          format-value-fun={this.formatValueFun}
          value-key={this.valueKey}
          default-index={item.defaultIndex || this.defaultIndex}
          row-height={this.rowHeight}
          row-count={this.rowCount}
          hide-empty-column={this.hideEmptyColumn}
          on-change={this.onChange}
        />
      ))
    }

    const Body = (
      <div
        class={
          bem('body')
        }
        style={this.wrapperStyles}
        onTouchmove={e => e.preventDefault()}
      >
        {genColumn()}
        <div
          class={ bem('body-mask', { top: true }) }
          style={this.maskHeight}
        ></div>
        <div
          class={ bem('body-mask', { bottom: true }) }
          style={this.maskHeight}
        ></div>
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
