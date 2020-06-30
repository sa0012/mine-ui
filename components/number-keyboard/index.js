import { createNamespace } from '../../src/utils'
import Popup from '../popup'
import Icon from '../icon'

const [createComponent, bem] = createNamespace('number-keyboard')

export default createComponent({
  props: {
    value: {
      type: Boolean,
      default: false,
      required: true
    },
    type: {
      type: String,
      default: 'number',
      validator (value) {
        return ['number', 'amount', 'idcard'].indexOf(value) > -1
      }
    },
    zIndex: {
      type: Number,
      default: 100
    },
    confirmText: {
      type: String,
      default: '确定'
    },
    hideMask: {
      type: Boolean,
      default: true
    },
    maxlength: {
      type: [Number, String],
      default: Number.MAX_VALUE
    },
    rightBar: Boolean,
    titleLeftText: String,
    titleRightText: String,
    title: String
  },

  data () {
    return {
      visible: this.value,
      active: false,
      keyCode: '',
      setValue: ''
    }
  },

  watch: {
    value (newVal) {
      this.$emit('input', newVal)
      this.visible = newVal
    }
  },

  computed: {
    keys () {
      const keys = []
      for (let i = 1; i <= 9; i++) {
        keys.push({
          text: i
        })
      }

      switch (this.type) {
        case 'number':
          keys.push(
            {
              text: 'keyboard-down',
              type: 'icon'
            },
            {
              text: 0
            }
          )
          break
        case 'amount':
          keys.push(
            {
              text: '.'
            },
            {
              text: 0
            }
          )
          break
        case 'idcard':
          keys.push(
            {
              text: 'X'
            },
            {
              text: 0
            }
          )
          break
      }

      if (!this.rightBar) {
        keys.push({
          text: 'keyboard-remove',
          type: 'icon'
        })
      }

      return keys
    }
  },

  methods: {
    onTouchstart (event) {
      this.active = true
      const keys = event.target.dataset.key
      const type = event.target.dataset.type
      this.keyCode = keys
      if (!type) {
        this.setValue += keys
        this.$emit('setValue', {
          key: keys,
          value: this.setValue
        })
      }

      if (keys === 'complete') {
        this.completeHandler()
      }
      if (keys === 'keyboard-remove') {
        if (!this.setValue) return
        const len = this.setValue.length
        const key = this.setValue[len - 1]
        this.setValue = this.setValue.slice(0, len - 1)
        this.$emit('delete', {
          key,
          value: this.setValue
        })
      }
      if (keys === 'keyboard-down') {
        this.$emit('input', false)
      }
      event.preventDefault()
    },

    onTouchEnd () {
      this.active = false
    },

    completeHandler () {
      this.$emit('confirm', this.setValue)
      this.$emit('input', false)
    }
  },

  render () {
    const Title = () => {
      return (this.title || this.titleLeftText || this.titleRightText) && (
        <div
          class={
            bem('header')
          }
        >
          <span class={bem('header-left')}>{this.titleLeftText}</span>
          <span class={bem('header-title')}>{this.title}</span>
          <span
            class={bem('header-right')}
            onClick={this.completeHandler}
          >{this.titleRightText}</span>
        </div>
      )
    }

    const RightBar = () => {
      return this.rightBar && (
        <div class={bem('right-bar')}>
          <div class={bem('wrapper')}>
            <button
              type="button"
              class={
                bem('key', {
                  large: true,
                  active: this.keyCode === 'keyboard-remove' && this.active
                })
              }
              data-key="keyboard-remove"
              data-type="icon"
              onTouchstart={this.onTouchstart}
              onTouchend={this.onTouchEnd}
              onTouchcancel={this.onTouchEnd}
            >
              <Icon
                data-key="keyboard-remove"
                data-type="icon"
                name="keyboard-remove"
                size="36"
                on={this.$listeners}
              />
            </button>
          </div>
          <div class={bem('wrapper')}>
            <button
              type="button"
              class={
                bem('key', {
                  large: true,
                  confirm: true,
                  active: this.keyCode === 'complete' && this.active
                })
              }
              data-key="complete"
              data-type="icon"
              onTouchstart={this.onTouchstart}
              onTouchend={this.onTouchEnd}
              onTouchcancel={this.onTouchEnd}
            >
              完成
            </button>
          </div>
        </div>
      )
    }

    const KeyContent = () => {
      return (
        <section
          class={
            bem('body')
          }
        >
          <div
            class={
              bem('content')
            }
          >
            {
              this.keys.map(item => {
                return (
                  <div class={bem('wrapper', {
                    wider: this.rightBar && String(item.text) === '0'
                  })}>
                    <button
                      type="button"
                      class={
                        bem('key', {
                          active: this.keyCode === String(item.text) && this.active
                        })
                      }
                      data-key={item.text}
                      data-type={item.type}
                      onTouchstart={this.onTouchstart}
                      onTouchend={this.onTouchEnd}
                      onTouchcancel={this.onTouchEnd}
                    >
                      {
                        item.type === 'icon' ? (
                          <Icon
                            data-key={item.text}
                            data-type={item.type}
                            name={item.text}
                            size="36"
                          />
                        ) : item.text
                      }
                    </button>
                  </div>
                )
              })
            }
          </div>
          {RightBar()}
        </section>
      )
    }
    return (
      <Popup
        v-model={this.value}
        position="bottom"
        hideMask={this.hideMask}
        class={bem()}
      >
        {Title()}
        {KeyContent()}
      </Popup>
    )
  }
})
