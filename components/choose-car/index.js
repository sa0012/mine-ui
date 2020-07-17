import { createNamespace } from '../../src/utils'
import Brand from './brand'

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

  methods: {},

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
        />
      </div>
    )
  }
})
