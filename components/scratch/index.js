import { createNamespace } from '../../src/utils'
import LuckyCard from './LuckyCard'

const [createComponent, bem] = createNamespace('scratch')

export default createComponent({
  props: {
    coverImg: {
      type: String,
      default: ''
    },
    scratchCard: {
      type: String,
      default: ''
    },
    cardHeight: {
      type: [Number, String],
      default: 0
    },
    cardWidth: {
      type: [Number, String],
      default: '100%'
    },
    ratio: {
      type: Number,
      default: 0.7,
      validator (val) {
        return val >= 0 && val < 1
      }
    }
  },

  data () {
    return {
      instance: null,
      scratchHeight: 0
    }
  },

  methods: {
    initLuckCard () {
      const _this = this
      // eslint-disable-next-line no-new
      this.instance = new LuckyCard(
        {
          height: this.cardHeight,
          width: this.cardWidth,
          ratio: this.ratio,
          coverImg: this.coverImg
        },
        function () {
          this.clearCover()
          _this.$emit('end', _this.resetCover)
        }
      )

      this.$emit('start', this.startDetect, this.instance)
    },

    startDetect (...args) {
      this.instance.eventDetect(this, ...args)
    },

    resetCover () {
      // this.instance.init({})
      this.instance.init()
    },

    start () {
      console.log(1234)
    },

    startScratch (event) {
      event.preventDefault()
      console.log(122233333)
      this.instance.eventDetect(this, this.start)
      // this.$emit('start', this.startDetect, this)
    }
  },

  mounted () {
    this.$nextTick(() => {
      this.initLuckCard()
    })
  },

  render () {
    return (
      <div
        class={
          bem()
        }
        id="scratch"
      >
        <div
          id="card"
          ref="scratch"
          class={
            bem('card')
          }
        >
          <img
            class={
              bem('card-bg')
            }
            src={this.scratchCard}
            alt=""
          />
        </div>
      </div>
    )
  }
})
