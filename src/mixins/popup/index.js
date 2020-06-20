export const PopupMixin = {
  props: {
    value: Boolean,
    // 是否允许点击遮罩层关闭弹窗
    closeOnClickOverlay: Boolean,
    zIndex: [Number, String],
    // 是否锁住遮罩层禁止滚动
    lockScroll: {
      type: Boolean,
      default: true
    },
    // 是否弹窗弹起后再加载内容
    lazyRender: {
      type: Boolean,
      default: true
    }
  },

  data () {
    return {
      inited: this.value
    }
  },

  computed: {
    shouldRender () {
      return this.inited || !this.lazyRender
    }
  },

  watch: {
    value (val) {
      const type = val ? 'open' : 'close'
      this.inited = this.inited || this.value
      this[type]()
      this.$emit(type)
    }
  },

  mounted () {
    if (this.value) this.open()
  },

  methods: {
    open () {}
  }
}
