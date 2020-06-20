import { createNamespace, isFunc } from '../../src/utils'
import Icon from '../icon'

const [createComponent, bem] = createNamespace('notice-bar')

export default createComponent({
  props: {
    type: {
      type: String,
      default: 'primary',
      validator (value) {
        return ['primary', 'success', 'danger', 'warning'].indexOf(value) !== -1
      }
    },
    // 右侧图标模式
    mode: {
      type: String,
      default: '',
      validator (value) {
        return ['close', 'link'].indexOf(value) !== -1
      }
    },
    // 左侧图标（传入icon名即可）
    leftIcon: {
      type: String
    },
    // 右侧图标（传入icon名即可）
    rightIcon: String,
    // 通知信息
    message: [Number, String],
    // 自定义icon类名前缀
    classPrefix: {
      type: String,
      default: 'ml-icon'
    },
    // 字体颜色
    color: String,
    iconSize: {
      type: [String, Number],
      default: 16
    },
    // 背景颜色
    background: String,
    // 是否开启文本换行
    wrapable: {
      type: Boolean,
      default: false
    },
    // 动画延迟时间
    delay: {
      type: [Number, String],
      default: 1
    },
    // 滚动速率
    deep: {
      type: Number,
      default: 50
    },
    // 是否可滚动
    scrollable: {
      type: Boolean,
      default: true
    }
  },

  data () {
    return {
      firstRound: true,
      animationDuration: 0,
      contentWidth: 0,
      offsetWidth: 0,
      animationClass: '',
      isShowNoticeBar: true
    }
  },

  watch: {
    message: {
      handler () {
        this.$nextTick(() => {
          const { wrap, content } = this.$refs
          if (!wrap || !content) return

          const contentWidth = content.getBoundingClientRect().width
          const offsetWidth = wrap.getBoundingClientRect().width

          // 默认情况下当文本内容溢出的时候开启滚动
          if (this.scrollable || offsetWidth > contentWidth) {
            this.contentWidth = contentWidth
            this.offsetWidth = offsetWidth
            this.animationDuration = offsetWidth / this.deep
            this.animationClass = 'move'
          }
        })
      },
      immediate: true
    }
  },

  methods: {
    onClickIcon (event) {
      if (this.mode === 'close') {
        this.isShowNoticeBar = false
        this.$emit('close', event)
      }
    },
    onAnimationEnd () {
      this.firstRound = false
      this.$nextTick(() => {
        this.animationDuration = (this.contentWidth + this.offsetWidth) / this.deep
        this.animationClass = 'move-infinite'
      })
    }
  },
  render () {
    const {
      leftIcon,
      rightIcon,
      iconSize,
      mode,
      type,
      wrapable,
      scrollable,
      slots,
      isShowNoticeBar,
      classPrefix,
      message
    } = this
    const leftIconSlot = slots['left-icon']
    const iconName = {
      'close': 'error',
      'link': 'arrow-right'
    }[mode]

    const leftIconContent = (leftIcon || leftIconSlot) && (
      <div class={bem('icon')}>
        {
          leftIconSlot ? isFunc(leftIconSlot) ? leftIconSlot() : leftIconSlot : (
            <Icon
              name={leftIcon}
              size={iconSize}
              classPrefix={classPrefix}
            />
          )
        }
      </div>
    )

    const defaultSlot = slots.default
    const styles = {
      paddingLeft: this.firstRound ? 0 : this.contentWidth + 'px',
      animationDelay: (this.firstRound ? this.delay : 0) + 's',
      animationDuration: this.animationDuration + 's'
    }
    const Content = (
      <div class={bem('content')} ref="content">
        <div
          class={[
            bem('text', [this.animationClass]),
            {
              'ellipsis': !scrollable && !wrapable
            }]
          }
          ref="wrap"
          style={styles}
          onAnimationend={this.onAnimationEnd}
          onWebkitAnimationEnd={this.onAnimationEnd}
        >
          {
            defaultSlot ? isFunc(defaultSlot) ? defaultSlot() : defaultSlot : message
          }
        </div>
      </div>
    )

    const rightIconSlot = slots['right-icon']
    const rightIconContent = (rightIcon || rightIconSlot || mode) && (
      <div
        class={bem('close')}
        onClick={this.onClickIcon}
      >
        {
          rightIconSlot ? isFunc(rightIconSlot) ? rightIconSlot() : rightIconSlot : (
            <Icon
              name={iconName || rightIcon}
              size={iconSize}
              classPrefix={classPrefix}
            />
          )
        }
      </div>
    )

    const noticeBarStyle = {
      color: this.color,
      background: this.background
    }
    return (
      <div
        vShow={isShowNoticeBar}
        class={
          bem({
            wrapable,
            [type]: type
          })
        }
        style={noticeBarStyle}
        onClick={event => {
          this.$emit('click', event)
        }}
      >
        { leftIconContent }
        { Content }
        { rightIconContent }
      </div>
    )
  }
})
