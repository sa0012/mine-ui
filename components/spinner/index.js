import { createNamespace } from '../../src/utils'
import Icon from '../icon'

const [createComponent, bem] = createNamespace('spinner')

export default createComponent({
  props: {
    spinnerStyle: {
      type: Object,
      default: () => {}
    },

    type: {
      type: [String, Number],
      default: 1,
      validator (val) {
        return Number(val) >= 1 && Number(val) <= 7
      }
    },

    size: {
      type: [String, Number],
      default: 28,
      validator (val) {
        return Number(val)
      }
    },

    color: {
      type: String,
      default: ''
    }
  },

  computed: {
    iconName () {
      return ({
        1: 'spinner',
        2: 'spinner9',
        3: 'loading1',
        4: 'spinner1',
        5: 'spinner2',
        6: 'spinner3',
        7: 'loading'
      })[this.type] || 'spinner'
    }
  },

  render () {
    return (
      <div
        class={
          bem()
        }
      >
        <Icon
          class={
            bem('icon')
          }
          name={this.iconName}
          size={this.size}
          color={this.color}
        />
      </div>
    )
  }
})
