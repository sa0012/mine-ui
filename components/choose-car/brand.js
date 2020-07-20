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
    },
    value: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      visible: false
    }
  },

  watch: {
    value (val) {
      this.visible = val
      this.$emit('input', val)
    }
  },

  methods: {
    selectCategory (category = {}) {
      console.log(category, 'category')
      this.$emit('selectCategory', category)
    },

    getContainer () {
      return this.$refs.wrapper
    }
  },

  render () {
    if (!this.visible) return
    const brandList = () => {
      if (!this.brand || !this.brand.length) return
      return (
        <IndexBar
          indexList={this.indexList}
          scroller={this.getContainer}
        >
          {
            this.brand.map((item, index) => {
              return (
                <div
                  class={
                    bem('brand-list-wrap')
                  }
                >
                  <IndexAnchor
                    class={
                      bem('index-anchor')
                    }
                    index={this.indexList[index]}
                  />
                  <ul
                    class={
                      bem('brand-list')
                    }
                  >
                    {
                      item.map((brand, bIndex) => (
                        <li
                          class={bem('brand-item')}
                          onClick={() => this.selectCategory({
                            category: brand,
                            icon: this.carIcon[brand.brandCategoryCode]
                          })}
                        >
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
        <transition name="ml-fade">
          <div
            vShow={this.visible}
            class={
              bem('brand-wrapper')
            }
            ref="wrapper"
          >
            {brandList()}
          </div>
        </transition>
      </div>
    )
  }
})
