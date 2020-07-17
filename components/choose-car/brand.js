import { createNamespace } from '../../src/utils'
import IndexBar from '../index-bar'
import IndexAnchor from '../index-anchor'

const [createComponent, bem] = createNamespace('choose-car')

export default createComponent({
  props: {
    brand: {
      type: Array,
      default: () => []
    },
    indexList: {
      type: Array,
      default: () => []
    },
    carIcon: {
      type: Object,
      default: () => {}
    }
  },

  data () {
    return {}
  },

  methods: {},

  render () {
    const brandList = () => {
      return (
        <IndexBar>
          {
            this.brand.map((item, index) => {
              return (
                <div
                  class={
                    bem('brand-list-wrap')
                  }
                >
                  <IndexAnchor
                    index={this.indexList[index]}
                  />
                  <ul
                    class={
                      bem('brand-list')
                    }
                  >
                    {
                      item.map((brand, bIndex) => (
                        <li class={bem('brand-item')}>
                          <img
                            src={this.carIcon[brand.brandCategoryCode]}
                            alt={brand.brandCategoryCode}
                          />
                          <span>{brand.brandCategoryName}</span>
                        </li>
                      ))
                    }
                  </ul>
                </div>
              )
            })
          }
        </IndexBar>
      )
    }
    return (
      <div
        class={
          bem('brand')
        }
      >
        {brandList()}
      </div>
    )
  }
})
