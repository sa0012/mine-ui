import { createNamespace, isObj } from '../../src/utils'
import Icon from '../icon'

const [createComponent, bem] = createNamespace('toast')

export default createComponent({
  props: {
    // toast类型
    type: {
      type: String,
      default: 'text',
      validator (value) {
        return ['text', 'success', 'error', 'loading', 'warn'].indexOf(value) > -1
      }
    },
    // 信息
    message: {
      type: String,
      default: ''
    },
    // 持续时间
    duration: {
      type: Number,
      default: 3000
    },
    // 显示位置
    // string: top, left, right, bottom, center
    position: {
      type: String,
      default: 'center'
    },
    // 过渡动画类名（name）
    transition: {
      type: String,
      default: 'ml-fade'
    },
    // icon大小
    iconSize: {
      type: [Number, String],
      default: 44
    },
    // 自定义icon前缀，默认使用自带图标集，也可以使用用户自定义
    iconPrefix: {
      type: String,
      default: 'ml-icon'
    },
    // icon名（无需前缀，只需要传递名字即可）
    icon: {
      type: String,
      default: ''
    },
    // 文本字体大小
    textSize: {
      type: [Number, String],
      default: 14
    },
    // 是否需要显示遮罩层
    overlay: {
      type: Boolean,
      default: false
    },
    // 遮罩层样式
    overlayStyle: {
      type: Object,
      default: () => {
        return {}
      }
    },
    // 自定义挂在位置， 默认插入到body下
    getContainer: {
      type: String,
      default: 'body'
    },
    // 是否禁止背景点击关闭
    forbidClick: {
      type: Boolean,
      default: false
    },
    // 是否开启多例模式
    isMultiple: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    isShowMark () {
      return this.type === 'loading' || this.overlay
    }
  },

  data () {
    return {
      visible: false
    }
  },

  methods: {
    onCancel () {
      this.visible = !this.visible
      return Promise.resolve(this)
    },

    onAfterEnter () {
      this.$emit('show')

      if (this.onShow) {
        this.onOpened()
      }
    },

    onAfterLeave () {
      this.$emit('hide')
    }
  },

  render () {
    const {
      type,
      icon,
      iconSize,
      iconPrefix,
      position,
      transition,
      message
    } = this

    const iconName = {
      'success': 'checkmark',
      'error': 'error',
      'loading': 'animation-loading',
      'warn': 'alert-empty'
    }[type]

    const contentClass =
      type === 'text' && !icon
        ? 'type'
        : position === 'bottom'
          ? 'bottom'
          : message !== void 0 && message !== ''
            ? 'min-width' : ''

    const positionClass = typeof position === 'string'
      ? position : ''

    const positionStyle = isObj(position) ? position : {}

    return (
      <transition
        name={transition}
        onAfterEnter={this.onAfterEnter}
        onAfterLeave={this.onAfterLeave}
      >
        <div
          class={bem(['wrapper'])}
          vShow={this.visible}
        >
          <div class={bem()}>
            <div
              onClick={this.onCancel()}
              class={bem(['mark'])}
              vShow={this.isShowMark}></div>
            <div
              class={
                bem(['content', contentClass, positionClass])
              }
              style={positionStyle}
            >
              <Icon
                name={iconName}
                size={iconSize}
                classPrefix={iconPrefix}
                class={
                  bem('icon', [type === 'loading' ? 'loading' : ''])
                }
              />
              <div
                class={bem(['text'])}
                vShow={this.message}
                style={{
                  fontSize: this.textSize + 'px'
                }}
              >
                { this.message }
              </div>
            </div>
          </div>
        </div>
      </transition>
    )
  }
})
