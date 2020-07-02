import { createNamespace } from '../../src/utils'
import { scrollToLeft } from '../../src/utils/dom'
import Title from './title'
const [createComponent, bem] = createNamespace('tabs')

export default createComponent({
  props: {
    active: [String, Number],
    activeColor: String,
    sticky: {
      type: Boolean,
      default: false
    },
    lineScale: {
      type: [String, Number],
      default: 1
    },
    lineColor: String,
    lineWidth: [String, Number],
    lineHeight: [String, Number],
    titleHeight: {
      type: [String, Number],
      default: 48
    },
    fontSize: {
      type: [String, Number],
      default: 16
    },
    iconSize: {
      type: [String, Number],
      default: 14
    },
    leftIcon: {
      type: String,
      default: 'shanchu'
    },
    hideLine: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'line',
      validator (value) {
        return ['line', 'block'].indexOf(value) > -1
      }
    },
    autocurrentIndex: {
      type: Boolean,
      default: true
    },
    swipeable: {
      type: Boolean,
      default: false
    },
    scrollableThreshold: {
      type: [String, Number],
      default: 4,
      validator (value) {
        return Number(value)
      }
    },
    disabled: {
      type: Boolean,
      default: false
    },
    duration: {
      type: Number,
      default: 0.3
    },
    customBarWidth: [String, Number]
  },

  data () {
    return {
      hasReady: false,
      children: [],
      tabList: [],
      currentIndex: 0,
      currentName: '',
      lineStyle: {}
    }
  },

  computed: {
    count () {
      return this.children.length
    },

    titleScroll () {
      return this.count > this.scrollableThreshold
    },

    basis () {
      return 88 / this.scrollableThreshold
    },

    barLeft () {
      if (this.hasReady) {
        return `${this.currentIndex * this.basis}%`
      }
    },
    barRight () {
      if (this.hasReady) {
        return `${100 - this.basis * (this.currentIndex + 1)}%`
      }
    },
    barStyle () {
      const commonStyle = {
        left: this.barLeft,
        right: this.barRight,
        display: 'block',
        height: this.lineWidth + 'px',
        transition: !this.hasReady ? 'none' : null
      }
      if (!this.customBarWidth) {
        commonStyle.background = this.barActiveColor || this.activeColor
      } else {
        commonStyle.background = 'transparent' // when=prop:custom-bar-width
      }
      return commonStyle
    },
    barClass () {
      return {
        'transition-forward': true
        // 'transition-backward': this.direction === 'backward'
      }
    }
  },

  watch: {
    currentIndex (val) {
      this.scrollIntoView(val)
    }
  },

  methods: {
    getChildren () {
      this.children = this.$children.filter(item => item.$options.name === 'ml-tabpane')
    },

    changeItem (index, item = {}) {
      this.currentIndex = index
      this.currentName = item.name || this.children[0].name
      this.setLine(index)
      // this.scrollIntoView(index)
      if (item.name) {
        this.$emit('change', {
          name: this.currentName,
          index
        })
      }
    },

    setLine (index) {
      this.$nextTick(() => {
        const titleRef = this.$refs[`titleRef${index}`]
        if (
          !titleRef ||
          this.type !== 'line'
        ) return

        const title = titleRef.$el
        const { lineWidth, lineHeight } = this
        const width = lineWidth || title.offsetWidth / 2
        const left = title.offsetLeft + title.offsetWidth / 2

        const lineStyle = {
          width: `${width}px`,
          backgroundColor: this.lineColor,
          transform: `translateX(${left}px) translateX(-50%)`
        }

        if (lineHeight) {
          lineStyle.height = `${lineHeight}px`
          lineStyle.borderRadius = lineHeight
        }

        this.lineStyle = lineStyle
      })
    },

    scrollIntoView (index) {
      const { nav } = this.$refs
      const titleRef = this.$refs[`titleRef${index}`]
      if (
        !titleRef ||
        !this.titleScroll
      ) return

      const title = titleRef.$el
      const navWidth = title.offsetWidth * this.count
      const to = title.offsetLeft - (navWidth - title.offsetWidth) / 3

      scrollToLeft(nav, to, this.duration)
    }
  },

  mounted () {
    this.$nextTick(() => {
      this.changeItem(0)
      setTimeout(() => {
        this.hasReady = true
      }, 0)
    })
  },

  render () {
    const contentSlots = this.$slots ? this.$slots.default : []
    const Nav = this.children.map((item, index) => (
      <Title
        ref={'titleRef' + index}
        title={item.title}
        type={this.type}
        active={this.currentIndex === index}
        active-color={this.activeColor}
        font-size={this.fontSize}
        left-icon={this.leftIcon}
        hide-line={this.hideLine}
        count={this.count}
        disabled={this.disabled}
        scrollable-threshold={this.scrollableThreshold}
        title-scroll={this.titleScroll}
        onClick={() => this.changeItem(index, item)}
      />
    ))
    const HeaderWrap = (
      <div
        ref="nav"
        class={bem('header', {
          scrollable: this.titleScroll
        })}
      >
        {Nav}
        <div
          class={
            bem('line', this.barClass)
          }
          style={this.barStyle}
        >
          {
            this.customBarWidth && (
              <span
                class={
                  bem('bar-inner')
                }
                style={this.innerBarStyle}
              ></span>
            )
          }
        </div>
      </div>
    )

    return (
      <div
        class={
          bem()
        }
      >
        <section
          ref="headerWrapper"
          class={
            bem('wrapper')
          }>
          {HeaderWrap}
        </section>
        {contentSlots}
      </div>
    )
  }
})
