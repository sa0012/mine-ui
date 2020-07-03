import { createNamespace } from '../../src/utils'
import { scrollToLeft } from '../../src/utils/dom'
import Title from './title'
import Content from './content'
const [createComponent, bem] = createNamespace('tabs')

export default createComponent({
  provide () {
    return {
      'tabs': this
    }
  },
  props: {
    active: [String, Number],
    activeColor: String,
    sticky: {
      type: Boolean,
      default: false
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
    animated: Boolean,
    scrollableThreshold: {
      type: [String, Number],
      default: 4,
      validator (value) {
        return Number(value)
      }
    },
    duration: {
      type: Number,
      default: 0.3
    }
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

    scrollable () {
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
    styles () {
      const style = {
        left: this.barLeft,
        right: this.barRight,
        display: 'block',
        height: this.lineHeight + 'px',
        transition: !this.hasReady ? 'none' : null
      }
      if (!this.lineWidth) {
        style.background = this.lineColor || this.activeColor
      } else {
        style.background = 'transparent'
      }
      return style
    }
  },

  watch: {
    currentIndex (val) {
      if (!this.scrollable) return
      this.scrollIntoView(val)
    }
  },

  methods: {
    getChildren () {
      this.children = this.$children.filter(item => item.$options.name === 'ml-tabpane')
    },

    changeItem (index, item = {}) {
      if (this.children[index].disabled) {
        return this.$emit('disabled', {
          name: item.name,
          index
        })
      }
      this.currentIndex = index
      this.currentName = item.name || this.children[0].name
      if (item.name) {
        this.$emit('change', {
          name: this.currentName,
          index
        })
      }
    },

    scrollIntoView (index) {
      const { nav } = this.$refs
      const titleRef = this.$refs[`titleRef${index}`]
      if (
        !titleRef ||
        !this.scrollable
      ) return

      const title = titleRef.$el
      const navWidth = title.offsetWidth * this.count
      const to = title.offsetLeft - (navWidth - title.offsetWidth) / 3

      scrollToLeft(nav, to, this.duration)
    },

    setCurrentIndex () {}
  },

  mounted () {
    this.$nextTick(() => {
      this.changeItem(0)
      this.hasReady = true
    })
  },

  render () {
    const Nav = this.children.map((item, index) => (
      <Title
        ref={'titleRef' + index}
        title={item.title}
        type={this.type}
        active={this.currentIndex === index}
        active-color={this.activeColor}
        font-size={this.fontSize}
        title-height={this.titleHeight}
        left-icon={this.leftIcon}
        hide-line={this.hideLine}
        count={this.count}
        disabled={item.disabled}
        scrollable-threshold={this.scrollableThreshold}
        scrollable={this.scrollable}
        onClick={() => this.changeItem(index, item)}
        scopedSlots={{
          default: () => item.$slots('title')
        }}
      />
    ))
    const HeaderWrap = (
      <div
        ref="nav"
        class={bem('header', {
          scrollable: this.scrollable
        })}
      >
        {Nav}
        <div
          class={
            bem('line', {
              'transition-forward': true
            })
          }
          style={this.styles}
        >
          {
            this.lineWidth && (
              <span
                class={
                  bem('bar-inner')
                }
                style={this.innerStyles}
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
        <Content
          count={this.count}
          animated={this.animated}
          duration={this.duration}
          swipeable={this.swipeable}
          currentIndex={this.currentIndex}
          onChange={this.setCurrentIndex}
        >
          {this.$slots && this.$slots.default}
        </Content>
      </div>
    )
  }
})
