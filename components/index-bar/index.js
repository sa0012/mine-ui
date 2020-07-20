import { createNamespace, isFunc, isString } from '../../src/utils'
import { getScrollTop } from '../../src/utils/dom/scroll'
import { throttle } from '../../src/utils/throttle'
const [createComponent, bem] = createNamespace('index-bar')

export default createComponent({
  props: {
    indexList: {
      type: Array,
      default () {
        const indexList = []
        const charCodeOfA = 'A'.charCodeAt(0)

        for (let i = 0; i < 26; i++) {
          indexList.push(String.fromCharCode(charCodeOfA + i))
        }

        return indexList
      }
    },
    zIndex: {
      type: [Number, String],
      default: 1
    },
    offsetTop: [Number, String],
    sticky: {
      type: Boolean,
      default: true
    },
    scroller: {
      type: [String, Function, Object],
      default: window
    }
  },

  data () {
    return {
      currentIndex: null,
      anchorHeightList: [],
      showIndexCard: false,
      touchActiveIndex: null,
      children: [],
      styles: {},
      timer: null
    }
  },

  methods: {
    touchStart (event) {
      this.showIndexCard = true
    },

    onTouchMove (event) {
      event.stopPropagation()
      event.preventDefault()
      const { clientX, clientY } = event.touches[0]
      const target = document.elementFromPoint(clientX, clientY)
      if (target) {
        const { bar } = target.dataset
        if (this.touchActiveIndex !== bar) {
          this.touchActiveIndex = bar
          this.scrollToElement(target)
        }
      }
    },

    onTouchEnd (event) {
      this.showIndexCard = false
    },

    handleScroll (scrollTop) {
      const { anchorHeightList } = this
      const len = anchorHeightList.length
      let target = null
      if (!len) return
      for (var i = 0; i < len; i++) {
        if (anchorHeightList[i] <= scrollTop && anchorHeightList[i + 1] > scrollTop) {
          target = i
        }
      }
      if (target) {
        const anchor = this.children[target].index
        this.children[target].changeIndex(anchor)
        this.currentIndex = target
      }
    },

    onClick (event) {
      this.scrollToElement(event.target)
    },

    getChildren () {
      this.children = this.$children.filter(item => item.$options.name === 'ml-index-anchor')
      return this.children
    },

    getIndexAnchorPos () {
      const children = this.getChildren()
      if (!children || children.length <= 0) return
      return children.map(item => {
        return item.$el.offsetTop
      })
    },

    getScrollTop () {
      let scrollTop = getScrollTop()
      if (this.scoller !== window) {
        scrollTop = this.scrollEle.scrollTop
      }
      this.handleScroll(scrollTop)
    },

    scrollToElement (element) {
      const { index } = element.dataset
      if (!index) return
      this.currentIndex = Number(index)
      const match = this.children[index]
      if (match) {
        match.scrollIntoView()

        if (this.sticky) {
          match.changeIndex(match.index)
        }

        this.$emit('select', match)
      }
    },

    bubbleStyle (index) {
      const indexBar = this.$refs[`indexBar${index}`]
      if (!indexBar) return
      const height = indexBar.offsetHeight
      const half = height / 2
      const style = {}
      style.top = `${
        index * height + half
      }px`

      this.styles = style
    },

    getContainer (element) {
      if (
        isString(element) &&
        (element.indexOf('.') !== -1 || element.indexOf('#') !== -1)
      ) {
        return document.querySelector(element)
      } else if (element === 'body') {
        return document.body
      } else if (element === 'html') {
        return document.documentElement
      }

      return window
    }
  },

  watch: {
    currentIndex (val) {
      this.bubbleStyle(val)
    }
  },

  computed: {
    scrollEle () {
      return isFunc(this.scroller) ? this.scroller() : this.getContainer(this.scroller)
    }
  },

  mounted () {
    this.timer = setTimeout(() => {
      this.$nextTick(() => {
        this.anchorHeightList = this.getIndexAnchorPos()
      })
    })
    this.scrollEle.addEventListener('scroll', throttle(this.getScrollTop, 200))
  },

  destroyed () {
    clearTimeout(this.timer)
    this.scrollEle.removeEventListener('scroll', throttle(this.getScrollTop, 200))
  },

  render () {
    const {
      indexList
    } = this
    const indexBarContent = () => {
      if (!indexList || indexList.length <= 0) return
      return (
        <ul
          class={
            bem('sidebar')
          }
          onClick={this.onClick}
          onTouchstart={this.touchStart}
          onTouchmove={this.onTouchMove}
          onTouchend={this.onTouchEnd}
          onTouchcancel={this.onTouchEnd}
        >
          {
            this.indexList.map((item, index) => {
              return (
                <li
                  ref={`indexBar${index}`}
                  class={bem('index', {
                    active: index === this.currentIndex
                  })}
                  data-bar={item}
                  data-index={index}
                >
                  {item}
                </li>
              )
            })
          }
          <li
            class={
              bem('bubble-wrap')
            }
            vShow={this.showIndexCard}
            style={this.styles}
            ref="bubble"
          >
            <span
              class={
                bem('bubble')
              }>
              {indexList[this.currentIndex]}
            </span>
            <span
              class={bem('badge')}></span>
          </li>
        </ul>
      )
    }

    return (
      <div
        class={
          bem()
        }
      >
        {indexBarContent()}
        {isFunc(this.$slots.default) ? this.$slots.default() : this.$slots.default}
      </div>
    )
  }
})
