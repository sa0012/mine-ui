import { createNamespace } from '../../src/utils'

const [createComponent, bem] = createNamespace('tabs')

export default createComponent({
  props: {
    active: {
      type: [String, Number]
    },
    sticky: {
      type: Boolean,
      default: false
    },
    lineScale: {
      type: [String, Number],
      default: 1
    },
    titleHeight: {
      type: [String, Number],
      default: 48
    },
    fontSize: {
      type: [String, Number],
      default: 16
    },
    hideLine: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'line',
      validator (value) {
        return ['line', 'block'].indexOf(value) > -1
      }
    },
    autoActive: {
      type: Boolean,
      default: true
    }
  }
})
