
import { createNamespace } from '../../src/utils'
import { range } from '../../src/utils/format/number'
import { TouchMixin } from '../../src/mixins/touch'

const [createComponent, bem] = createNamespace('picker')

// 滑动持续时间
const DEFAULT_DURATION = 200
// 同上次对比，时间间隔如果小于 'MOVE_LIMIT_TIME'  并且滑动距离大于 'MOVE_LIMIT_DISTANCE'
// 执行惯性滚动
const MOVE_LIMIT_TIME = 300
const MOVE_LIMIT_DISTANCE = 15

function getElementTranslateY (element) {
  const style = window.getComputedStyle(element)
  const transform = style.transform || style.webkitTransform
  const translateY = transform.slice(7, transform.length - 1).split(', ')[5]

  return Number(translateY)
}

export default createComponent({
  mixins: [TouchMixin],

  props: {
    list: {
      type: Array,
      default: () => []
    },
    defaultIndex: Number,
    valueKey: String,
    rowCount: Number,
    rowHeight: Number,
    swipeDuration: Number,
    hideEmptyColumn: Boolean
  },

  data () {
    return {
      columns: [],
      offset: 0,
      touchStartTime: null,
      touchEndTime: null,
      duration: 0,
      momentOffset: 0,
      saveY: 0,
      transformY: 0,
      scrollDistance: 0,
      currentIndex: this.defaultIndex
    }
  },

  computed: {
    rowStyles () {
      const style = {}
      style.height = this.rowHeight + 'px'

      return style
    },

    count () {
      console.log(this.list.length, 'list')
      return this.list.length
    },

    // 可偏移距离
    baseOffset () {
      return this.rowHeight * parseInt(this.rowCount / 2)
    }
  },

  watch: {
    defaultIndex (val) {
      this.setIndex(val)
    }
  },

  created () {
    const { children } = this.$parent
    children && children.push(this)

    this.setIndex(this.currentIndex)
  },

  destroyed () {
    const { children } = this.$parent
    children && children.splice(children.indexOf(this), 1)
  },

  methods: {
    getColumns (index = 0) {
      this.columns = this.list.slice(index, this.rowCount)
    },

    onTouchStart (event) {
      this.touchStart(event)
      if (this.moving) {
        const translateY = getElementTranslateY(this.$refs.wrapper)
        this.offset = Math.min(0, translateY - this.baseOffset)
        this.startOffset = this.offset
        console.log(translateY, 'translateY')
      } else {
        this.startOffset = this.offset
      }

      this.duration = 0
      this.transitionEndTrigger = null
      this.touchStartTime = Date.now()
      this.momentumOffset = this.startOffset
    },

    onTouchMove (event) {
      this.moving = true
      this.touchMove(event)
      this.offset = range(this.deltaY + this.momentumOffset, -this.count * this.rowHeight, this.rowHeight)

      const now = Date.now()
      if (now - this.touchStartTime > MOVE_LIMIT_TIME) {
        this.touchStartTime = now
        this.momentumOffset = this.offset
      }

      event.preventDefault()
    },

    onTouchEnd (event) {
      event.preventDefault()
      const duration = Date.now() - this.touchStartTime
      const distance = this.offset - this.momentumOffset

      const allowMomentum = duration < MOVE_LIMIT_TIME && Math.abs(distance) > MOVE_LIMIT_DISTANCE

      if (allowMomentum) {
        return this.momentum(distance, duration)
      }

      const index = this.getIndexByOffset(this.offset)
      this.moving = false
      this.duration = DEFAULT_DURATION
      this.setIndex(index, true)
    },

    getIndexByOffset (offset) {
      return range(Math.round(-offset / this.rowHeight), 0, this.count - 1)
    },

    momentum (distance, duration) {
      const speed = Math.abs(distance / duration)

      distance = this.offset + (speed / 0.002) * (distance < 0 ? -1 : 1)

      console.log(distance, 'distance')
      const index = this.getIndexByOffset(distance)

      this.duration = this.swipeDuration
      this.setIndex(index, true)
    },

    /**
     * 设置索引位置
     * @param {number} index // 当前索引位置
     * @param {boolean} useAction // 是否使用异步模式
     */
    setIndex (index, useAction) {
      // 安全索引区间
      index = range(index, 0, this.count)

      this.offset = -index * this.rowHeight

      if (index !== this.currentIndex) {
        this.currentIndex = index
        if (useAction) {
          const { children } = this.$parent
          this.$emit('change', index, children[index])
        }
      }
    },

    onStop () {
      this.moving = false
      this.duration = 0
    },

    onTransitionEnd () {
      this.onStop()
    },

    clickRow (index) {
      // if (this.moving) return
      this.duration = DEFAULT_DURATION
      this.setIndex(index, true)
    }
  },

  mounted () {
    this.getColumns()
  },

  render () {
    const ColumnItem = () => {
      if (!this.list || !this.list.length) return
      return this.list.map((item, index) => {
        return (
          <li
            class={{
              'ml-ellipsis': true,
              [bem('column-item')]: true,
              selected: index === this.currentIndex
            }}
            style={this.rowStyles}
            onClick={
              () => this.clickRow(index, true)
            }
          >{item}</li>
        )
      })
    }

    const pickerItemStyle = {
      transform: `translate3d(0, ${this.offset + this.baseOffset}px, 0)`,
      transitionDuration: `${this.duration}ms`,
      transitionProperty: this.duration ? 'all' : 'none',
      lineHeight: `${this.rowHeight}px`
    }
    return (
      <div
        class={
          bem('item')
        }
        onTouchstart={this.onTouchStart}
        onTouchmove={this.onTouchMove}
        onTouchend={this.onTouchEnd}
        onTouchscancel={this.onTouchEnd}
      >
        <ul
          ref="wrapper"
          class={
            bem('column-list')
          }
          style={pickerItemStyle}
          onTransitionend={this.onTransitionEnd}
        >
          {ColumnItem()}
        </ul>
      </div>
    )
  }
})
