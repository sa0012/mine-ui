import { createNamespace } from '../../src/utils'
import Swiper from '../swiper'
import SwiperItem from '../swiper-item'
import Popup from '../popup'

const [createComponent, bem] = createNamespace('image-preview')

export default createComponent({
  props: {
    imgList: {
      type: Array,
      default: () => []
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
    },

    visible (val) {
      this.$emit('input', val)
    }
  },

  methods: {
    swiperSlot () {
      const { imgList } = this
      if (!imgList || !imgList.length) {
        return new Error('imgList is array')
      }

      return (<Swiper
        autoplay={false}
      >
        {
          imgList.map((item, index) => (
            <SwiperItem
            >
              <img src={item} alt="" />
            </SwiperItem>
          ))
        }
      </Swiper>)
    }
  },

  render () {
    return (
      <Popup
        v-model={this.visible}
      >
        <div
          class={
            bem()
          }
        >
          {this.swiperSlot()}
        </div>
      </Popup>
    )
  }
})
