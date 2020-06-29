import { createNamespace } from '../../src/utils'
import Popup from '../popup'
import Icon from '../icon'

const [createComponent, bem] = createNamespace('number-keyboard')

export default createComponent({
  props: {
    value: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'number',
      validator (value) {
        return ['number', 'amount', 'idcard'].indexOf(value) > -1
      }
    },
    zIndex: {
      type: Number,
      default: 100
    },
    confirmText: {
      type: String,
      default: '确定'
    }
  },

  data () {
    return {
      visible: this.value
    }
  },

  computed: {},

  render () {
    return (
      <Popup
        v-model={this.value}
        position="bottom"
      >
        this is a keyboard
      </Popup>
    )
  }
})
