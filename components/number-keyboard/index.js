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
    rightBar: Boolean,
    titleLeftText: String,
    titleRightText: String,
    title: String
  },

  data () {
    return {
      visible: this.value,
      active: false,
      keyCode: ''
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
    onTouchstart (event, item) {
      this.active = true
      this.keyCode = item.text
    },

    onTouchEnd () {
      this.active = false
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
          <span class={bem('header-right')}>{this.titleRightText}</span>
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
                  large: true
                })
              }
            >
              <Icon
                name="keyboard-remove"
                size="36"
              />
            </button>
          </div>
          <div class={bem('wrapper')}>
            <button
              type="button"
              class={
                bem('key', {
                  large: true,
                  confirm: true
                })
              }
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
                          tap: this.keyCode === item.text && this.active
                        })
                      }
                      onTouchstart={() => this.onTouchstart(event, item)}
                      onTouchend={this.onTouchEnd}
                      onTouchcancel={this.onTouchEnd}
                    >
                      {
                        item.type === 'icon' ? (
                          <Icon
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
