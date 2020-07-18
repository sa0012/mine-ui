import { createNamespace, get } from '../../src/utils'
import Popup from '../popup'
import InfiniteScroll from '../infinite-scroll'

const [createComponent, bem] = createNamespace('choose-car')

export default createComponent({
  props: {
    mode: {
      type: Array,
      default: () => []
    },
    modeOpt: {
      type: Object,
      default: () => {}
    },
    brandOpt: {
      type: Object,
      default: () => {}
    },
    value: {
      type: Boolean,
      default: false
    },
    offsetTop: {
      type: Number,
      default: 80
    }
  },

  data () {
    return {}
  },

  watch: {
    value (val) {
      this.$emit('input', val)
    }
  },

  methods: {
    selectMode (mode = {}) {
      this.$emit('selectMode', mode)
    }
  },

  render () {
    const Title = (
      <h3 class={
        bem('category-first-title', ['mode'])
      }>
        <img
          src={get(this.brandOpt, 'icon')}
          alt={get(this.brandOpt, 'category.brandCategoryCode')}
          class={
            bem('category-brand-icon')
          }
        />
        <span>{ get(this.brandOpt, 'category.brandCategoryName') }</span>
      </h3>
    )

    const VehicleList = (mode) => {
      return mode.map((vehicle, vIndex) => (
        <ul
          class={
            bem('mode-list')
          }
        >
          <li
            class={
              bem('mode-item')
            }
          >
            {
              vehicle.carYear && (
                <h3
                  class={
                    bem('mode-second-title')
                  }
                >{vehicle.carYear}款</h3>
              )
            }
            <ul
              class={
                bem('mode-vehicle-list')
              }
            >
              {
                vehicle &&
                vehicle.insurerVehicleModelMOs.length &&
                vehicle.insurerVehicleModelMOs.map((modes, mIndex) => (
                  <li
                    class={
                      bem('mode-vehicle-item')
                    }
                  >
                    <div
                      class={
                        bem('mode-vehicle-name')
                      }
                    >
                      {modes.displayName}
                    </div>
                  </li>
                ))
              }
            </ul>
          </li>
        </ul>
      ))
    }

    const modeList = () => {
      const mode = this.mode || []
      return (
        <section
          class={
            bem('mode-wrapper')
          }
        >
          {
            mode.length && (
              <InfiniteScroll
                offsetTop={this.offsetTop}
              >
                {VehicleList(mode)}
              </InfiniteScroll>
            )
          }
        </section>
      )
    }
    return (
      <Popup
        vModel={this.value}
        position="right"
        width={'100%'}
        class={
          bem('mode')
        }
      >
        {Title}
        {modeList()}
      </Popup>
    )
  }
})
