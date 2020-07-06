
import { createNamespace } from '../../src/utils'
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
      columns: []
    }
  },

  computed: {
    rowStyles () {
      const style = {}
      style.height = this.rowHeight + 'px'

      return style
    }
  },

  methods: {
    getColumns (index = 0) {
      this.columns = this.list.slice(index, this.rowCount)
    }
  },

  mounted () {
    this.getColumns()
  },

  render () {
    const {
      columns
    } = this
    const ColumnItem = () => {
      if (!columns || !columns.length) return
      return columns.map((item, index) => {
        return (
          <li
            class={
              bem('column-item')
            }
            style={this.rowStyles}
          >{item}</li>
        )
      })
    }
    return (
      <div
        class={
          bem('item')
        }
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
