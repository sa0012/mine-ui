import { createNamespace } from '../../src/utils'
import Icon from '../icon'

const [createComponent, bem] = createNamespace('timeline')

export default createComponent({
  props: {
    timeList: {
      type: Array,
      default: () => []
    },
    dotType: {
      type: String,
      default: 'unchecked'
    }
  },

  methods: {},

  render () {
    const Timeline = () => {
      if (!this.timeList || !this.timeList.length) return
      return (
        <ul
          class={
            bem('list')
          }
        >
          {
            this.timeList.map((item, index) => (
              <li
                class={
                  bem('item')
                }
              >
                <div
                  class={
                    bem('item-left')
                  }
                >
                  <div>17:13</div>
                  <div>07-21</div>
                </div>
                <div class={
                  bem('line-wrapper')
                }>
                  <div
                    class={
                      bem('dot')
                    }
                  >
                    {/* <Icon
                    name={
                      this.dotType
                    }
                    size={14}
                  /> */}
                  </div>
                  <div
                    class={
                      bem('line')
                    }
                  ></div>
                </div>
                <div
                  class={
                    bem('item-right')
                  }
                >
                  保司审核通过
                </div>
              </li>
            ))
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
        {Timeline()}
      </div>
    )
  }
})
