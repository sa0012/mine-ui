
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

  props: {},

  data () {
    return {}
  },

  methods: {},

  render () {
    return (
      <div>
        this is a column
      </div>
    )
  }
})
