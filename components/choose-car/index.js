import { createNamespace, get } from '../../src/utils'
import Brand from './brand'
import Category from './category'
import Mode from './mode'

const [createComponent, bem] = createNamespace('choose-car')

export default createComponent({
  props: {
    brand: {
      type: Array,
      default: () => []
    },
    category: {
      type: Array,
      default: () => []
    },
    mode: {
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
    offsetTop: {
      type: Number,
      default: 80
    }
  },

  data () {
    return {
      showCategory: false,
      showMode: false,
      categoryOpt: {},
      modeOpt: {}
    }
  },

  methods: {
    selectCategoryHandler (category = {}) {
      this.showCategory = !this.showCategory
      this.categoryOpt = Object.assign({}, category)
      this.$emit('selectCategory', get(category, 'category'))
    },

    selectModeHandler (vehicle = {}) {
      console.log('mode999')
      this.showCategory = !this.showCategory
      this.showMode = !this.showMode
      this.modeOpt = Object.assign({}, vehicle)
      this.$emit('selectMode', vehicle)
    },

    completeHandler (opts = {}) {
      this.$emit('complete', opts)
    }
  },

  render () {
    return (
      <div
        class={
          bem()
        }
      >
        <Brand
          brand={this.brand}
          indexList={this.indexList}
          carIcon={this.carIcon}
          onSelectCategory={this.selectCategoryHandler}
        />
        <Category
          category={this.category}
          categoryOpt={this.categoryOpt}
          onSelectMode={this.selectModeHandler}
          vModel={this.showCategory}
        />
        <Mode
          vModel={this.showMode}
          mode={this.mode}
          brandOpt={this.categoryOpt}
          offsetTop={this.offsetTop}
          onComplete={this.completeHandler}
        />
      </div>
    )
  }
})
