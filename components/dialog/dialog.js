import { createNamespace, isFunc } from '../../src/utils'
import Popup from '../popup'

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
    iconStatus: {
      type: String
    },
    transition: {
      type: String,
      default: 'ml-fade'
    }
  },

  data () {
    return {
      visible: false
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
    }
  },

  render () {
    return (
      <Popup
        position={this.position}
        closeOnClickOverlay={}
      >

      </Popup>
    )
  }
})
