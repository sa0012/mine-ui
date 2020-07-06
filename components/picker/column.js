
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
export default createComponent({
  mixins: [TouchMixin],

  props: {
    list: {
      type: Array,
      default: () => []
    },
    defaultIndex: {
      type: Number,
      default: 0
    },
    valueKey: String,
    rowCount: {
      type: Number,
      default: 5
    },
    rowHeight: {
      type: Number,
      default: 44
    },
    hideEmptyColumn: Boolean
  },

  data () {
    return {
      columns: [],
      offset: 0,
      touchStartTime: null,
      duration: 0,
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
      return this.list.length
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

      console.log(this.startY, 'startY')
    },

    onTouchMove (event) {
      this.touchMove(event)

      if (this.offsetY > 20) {
        // this.getColumns(1)
      }

      console.log(this.offsetY, 'offsetY')
    },

    onTouchEnd () {},

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
              () => this.setIndex(index, true)
            }
          >{item}</li>
        )
      })
    }

    const pickerItemStyle = {
      transform: `translate3d(0, ${this.offset}px, 0)`,
      transitionDuration: `${this.duration}ms`,
      transitionProperty: this.duration ? 'all' : 'none',
      lineHeight: `${this.rowHeight}px`
    }
    return (
      <div
        class={
          bem('item')
        }
        style={pickerItemStyle}
        onTouchstart={this.onTouchStart}
        onTouchmove={this.onTouchMove}
        onTouchend={this.onTouchEnd}
        onTouchscancel={this.onTouchEnd}
      >
        <ul
          class={
            bem('column-list')
          }
        >
          {ColumnItem()}
        </ul>
      </div>
    )
  }
})
