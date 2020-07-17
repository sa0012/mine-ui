import { createNamespace, isFunc } from '../../src/utils'
import Popup from '../popup'
import Icon from '../icon'

const [createComponent, bem] = createNamespace('dialog')

export default createComponent({
  props: {
    type: {
      type: String
    },
    clickOverlay: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '系统提示'
    },
    message: {
      type: String,
      default: ''
    },
    confirmButtonText: {
      type: String,
      default: '确定'
    },
    cancelButtonText: {
      type: String,
      default: '取消'
    },
    onConfirm: {
      type: Function,
      default: () => {}
    },
    onCancel: {
      type: Function,
      default: () => {}
    },
    icon: {
      type: String
    },
    iconSize: {
      type: [String, Number],
      default: 56
    },
    classPrefix: {
      type: String,
      default: 'ml-icon'
    },
    transition: {
      type: String,
      default: 'ml-fade'
    },
    closeOnClickOverlay: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      visible: false,
      defaultIconName: {
        success: 'checkmark-full',
        fail: 'error-full',
        warn: 'alert-full'
      }
    }
  },

  methods: {
    onOverlayClose () {
      this.clickOverlay && (this.visible = false)
    },

    handleCancel () {
      isFunc(this.onCancel) && this.onCancel()
      this.visible = false
    },

    handleConfirm () {
      isFunc(this.onConfirm) && this.onConfirm()
    },

    close () {
      this.handleCancel()
    }
  },

  mounted () {
    window.addEventListener('popstate', this.close)
  },

  destroyed () {
    window.removeEventListener('popstate', this.close)
  },

  render () {
    // title
    const Title = this.slots('title') || (
      <div vShow={this.title} class={bem('title')}>
        {this.title}
      </div>
    )
    // Content
    const ContentSlot = this.slots()
    const Content = (ContentSlot || this.message) && (
      <div class={bem('text')}>
        {
          ContentSlot || (
            <div
              domPropsInnerHTML={
                this.message
              }
              class={bem('message')}
            />
          )
        }
      </div>
    )

    const IconSlot = this.slots('icon')
    const IconContent = IconSlot || (this.icon ? (
      <Icon
        class={{
          [bem('icon-status')]: true,
          [this.icon]: this.icon
        }}
        name={
          this.defaultIconName[this.icon] || this.icon
        }
        size={this.iconSize}
        classPrefix={this.classPrefix}
      />
    ) : null)

    const ButtonGroup = (
      <div class={bem('footer')}>
        {
          this.type === 'confirm' && (
            <div
              class={ bem('cancel') }
              onClick={ this.handleCancel }
            >
              <span domPropsInnerHTML={ this.cancelButtonText } />
            </div>
          )
        }
        <div
          class={ bem('confirm') }
          onClick={ this.handleConfirm }
        >
          <span domPropsInnerHTML={ this.confirmButtonText } />
        </div>
      </div>
    )
    return (
      <Popup
        vModel={this.visible}
        position={this.position}
        transition={this.transition}
        closeOnClickOverlay={this.closeOnClickOverlay}
      >
        <div class={bem(['content'])}>
          { Title }
          { IconContent }
          { Content }
          { ButtonGroup }
        </div>
      </Popup>
    )
  }
})
