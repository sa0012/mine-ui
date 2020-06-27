import { createNamespace } from '../../src/utils'
import Title from './title'
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
  },

  data () {
    return {
      children: [],
      tabList: []
    }
  },

  computed: {},

  methods: {
    getChildren () {
      console.log(this.$children, '$children')
      this.children = this.$children.filter(item => item.$options.name === 'ml-tabpane')
    },

    update () {
      const children = this.getChildren()
      if (children.length === this.tabList.length) return
    },

    titleContent () {
      return this.children.map((item, index) => {
        console.log(item.title, 'item')
        return (
          <Title
            title={item.title}
          />
        )
      })
    }
  },

  mounted () {
    // this.getChildren()
  },

  render () {
    return (
      <div
        class={
          bem('wrapper')
        }
      >
        {this.titleContent()}
        { this.$slots && this.$slots.default }
      </div>
    )
  }
})
