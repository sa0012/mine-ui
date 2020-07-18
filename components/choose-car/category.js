import { createNamespace, get } from '../../src/utils'
import Popup from '../popup'
const [createComponent, bem] = createNamespace('choose-car')

export default createComponent({
  props: {
    category: {
      type: Array,
      default: () => []
    },
    categoryOpt: {
      type: Object,
      default: () => {}
    },
    value: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    selectMode (mode = {}) {
      console.log(mode, 'mode')
      this.$emit('selectMode', mode)
    }
  },

  watch: {
    value (val) {
      this.$emit('input', val)
    }
  },

  render () {
    const Title = (
      <h3 class={
        bem('category-first-title')
      }>
        <img
          src={get(this.categoryOpt, 'icon')}
          alt={get(this.categoryOpt, 'category.brandCategoryCode')}
          class={
            bem('category-brand-icon')
          }
        />
        <span>{ get(this.categoryOpt, 'category.brandCategoryName') }</span>
      </h3>
    )

    const VehicleList = () => {
      const category = this.category || []
      if (!category.length) return
      return category.map((cc, cIndex) => (
        <li
          class={
            bem('category-item')
          }
        >
          <h3 class={
            bem('category-second-title')
          }>{cc.brandName}</h3>
          <ul
            class={
              bem('category-brand-list')
            }
          >
            {
              cc.jyVehicleFamilyMOs &&
                  cc.jyVehicleFamilyMOs.length &&
                  cc.jyVehicleFamilyMOs.map((vehicle, vIndex) => (
                    <li
                      class={
                        bem('category-brand-item')
                      }
                      onClick={
                        () => this.selectMode(vehicle)
                      }
                    >
                      <div
                        class={
                          bem('category-brand-item-name')
                        }
                      >
                        {vehicle.familyName}
                      </div>
                    </li>
                  ))
            }
          </ul>
        </li>
      ))
    }
    const categoryList = () => {
      return (
        <section
          class={
            bem('category-wrapper')
          }
        >
          {Title}
          <ul
            class={
              bem('categroy-list')
            }
          >
            {VehicleList()}
          </ul>
        </section>
      )
    }

    return (
      <Popup
        vModel={this.value}
        position="right"
        width={'70%'}
        class={
          bem('category')
        }
      >
        {categoryList()}
      </Popup>
    )
  }
})
