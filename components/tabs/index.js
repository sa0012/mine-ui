import { createNamespace } from '../../src/utils'
import Title from './title'
const [createComponent, bem] = createNamespace('tabs')

export default createComponent({
  props: {
    active: {
      type: [String, Number]
    },
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
    }
  },

  data () {
    return {
      children: [],
      tabList: [],
      currentIndex: 0,
      currentName: '',
      lineStyle: {}
    }
  },

  computed: {},

  methods: {
    getChildren () {
      this.children = this.$children.filter(item => item.$options.name === 'ml-tabpane')
    },

    changeItem (index, item = {}) {
      this.currentIndex = index
      this.currentName = item.name || this.children[0].name
      this.setLine(index)
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
    }
  },

  mounted () {
    // this.getChildren()
    this.$nextTick(() => {
      this.changeItem(0)
    })

    setTimeout(() => {
      console.log(this.$refs.test, 'test')
    }, 3000)
  },

  render () {
    const Nav = this.children.map((item, index) => (
      <Title
        ref={'titleRef' + index}
        title={item.title}
        onClick={() => this.changeItem(index, item)}
      />
    ))
    const HeaderWrap = (
      <div class={bem('header')}>
        {Nav}
        <div
          class={
            bem('line', {
              active: this.currentIndex !== null
            })
          }
          style={this.lineStyle}
        ></div>
      </div>
    )
    return (
      <div
        ref="wrapper"
        class={
          bem()
        }
      >
        <section class={
          bem('wrapper')
        }>
          {HeaderWrap}
        </section>
        { this.$slots && this.$slots.default }
      </div>
    )
  }
})
