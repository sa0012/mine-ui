import { createNamespace, isObj } from '../../src/utils'
import Popup from '../popup'
import Icon from '../icon'

const [createComponent, bem] = createNamespace('actionSheet')

export default createComponent({
  props: {
    value: {
      type: Boolean
    },
    actionList: {
      type: Array,
      default: () => []
    },
    showCancelButton: {
      type: Boolean,
      default: true
    },
    cancelText: {
      type: String,
      default: '取消'
    },
    useKey: {
      type: [String, Number],
      default: 'name'
    },
    borderRadius: {
      type: Object,
      default: {}
    },
    border: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: ''
    },
    closeIcon: {
      type: String,
      default: 'error-empty'
    }
  },

  data () {
    return {
      visible: this.value
    }
  },

  watch: {
    value (val) {
      console.log(val, 'val')
      this.visible = val
    },

    visible (val) {
      this.$emit('input', val)
    }
  },

  methods: {
    clickItem (item) {
      this.$emit('onConfirm', item)
      this.$emit('input', false)
    },

    onCancel () {
      this.$emit('input', false)
      this.$emit('onCancel')
      this.visible = false
    }
  },

  render () {
    console.log(this.visible, 'visible')
    const {
      actionList
    } = this

    const Title = () => {
      return this.title && (
        <div
          class={
            bem('header')
          }
        >
          <span class={bem('header-title')}>{this.title}</span>
          <Icon
            name={this.closeIcon}
            class={
              bem('close')
            }
            onClick={this.onCancel}
          />
        </div>
      )
    }
    const actionListContent = () => (
      <div
        class={
          bem('action-list')
        }
      >
        {
          actionList &&
          actionList.length > 0 &&
          actionList.map((item, index) => {
            return (
              <button
                class={
                  bem('action-item', {
                    border: this.border && index !== actionList.length - 1,
                    disabled: item.disabled
                  })
                }
                type="button"
                disabled={item.disabled}
                onClick={this.clickItem}
              >
                <span
                  class={
                    bem('action-name')
                  }
                >
                  {item && isObj(item) ? item[this.useKey] : item}
                </span>
              </button>
            )
          })
        }
      </div>
    )

    const SplitLine = () => {
      return this.showCancelButton && (
        <div class={bem('line')}></div>
      )
    }

    const CancelButton = () => {
      return this.showCancelButton && (
        <button
          type="button"
          class={bem('cancel')}
          onClick={this.onCancel}
        >
          {this.cancelText}
        </button>
      )
    }
    return (
      <Popup
        v-model={this.visible}
        border-radius={this.borderRadius}
        position="bottom"
      >
        <div
          class={
            bem()
          }
        >
          {Title()}
          {actionListContent()}
          {SplitLine()}
          {CancelButton()}
        </div>
      </Popup>
    )
  }
})
