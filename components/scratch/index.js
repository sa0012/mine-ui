import { createNamespace } from '../../src/utils'

const [createComponent, bem] = createNamespace('scratch')

export default createComponent({
  props: {},

  render () {
    return (
      <div
        class={
          bem('scratch-coupon')
        }
        id="scratch"
        onTouchstart={this.startScratch}
      >
        <div
          id="card"
          ref="scratch"
          class={
            bem('scratch-card')
          }
        >
          <img
            vShow={false}
            // src={}
            alt=""
          />
        </div>
      </div>
    )
  }
})
