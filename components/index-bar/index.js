import { createNamespace, isFunc } from '../../src/utils'

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
      type: Number,
      default: 1
    },
    sticky: {
      type: Boolean,
      default: true
    }
  },

  data () {
    return {
      currentIndex: '0',
      anchorHeightList: [],
      showIndexCard: false,
      touchBar: false,
      children: []
    }
  },

  methods: {
    touchStart (event) {
      this.showIndexCard = true
      // console.log(event.touches[0], 'touch')
    },
    onTouchMove (event) {
      const { clientX, clientY } = event.touches[0]
      const target = document.elementFromPoint(clientX, clientY)
      if (target) {
        const { index } = target.dataset

        if (this.touchActiveIndex !== index) {
          this.currentIndex = index
          this.touchActiveIndex = index
          this.scrollToElement(target)
        }
      }
      event.stopPropagation()
      event.preventDefault()
    },
    onTouchEnd (event) {
      this.showIndexCard = false
      // console.log(event, 'event')
    },
    handleScroll (scrollTop) {
      const { anchorHeightList } = this
      const len = anchorHeightList.length
      let target
      for (var i = 0; i < len; i++) {
        if (anchorHeightList[i] <= scrollTop && anchorHeightList[i + 1] > scrollTop) {
          target = i
        }
      }
      this.children[target].changeIndex(true)
      this.currentIndex = target
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
      const scrollTop = document.documentElement.scrollTop
      this.handleScroll(scrollTop)
    },

    scrollToElement (element) {
      const { index } = element.dataset
      if (!index) return
      const match = this.children.filter(item => {
        return String(item.index) === index
      })
      if (match[0]) {
        match[0].scrollIntoView()

        if (this.sticky) {
          match[0].changeIndex(true)
        }

        this.$emit('select', match[0])
      }
    }
  },

  mounted () {
    this.anchorHeightList = this.getIndexAnchorPos()
    window.addEventListener('scroll', this.getScrollTop)
  },

  destroyed () {
    window.removeEventListener('scroll', this.getScrollTop)
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
                  class={bem('index', {
                    active: index === this.currentIndex
                  })}
                  data-index={item}
                >
                  {item}
                  <span
                    vShow={this.showIndexCard && this.currentIndex === index}
                    class={
                      bem('bubble')
                    }>
                    {indexList[this.currentIndex]}
                  </span>
                  <span
                    vShow={this.showIndexCard && this.currentIndex === index}
                    class={bem('badge')}></span>
                </li>
              )
            })
          }
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
