import Vue from 'vue'
import ImagePreview from './imagePreview'
import { isFunc } from '../../src/utils'

let instance

function createInstance (Vue, options) {
  if (!instance) {
    instance = new (Vue.extend(ImagePreview))().$mount(document.createElement('div'))
    document.body && document.body.appendChild(instance.$el)
  }

  mergeInstanceOpts(options, instance)
}

function mergeInstanceOpts (options, instance) {
  const defaults = {}
  for (let i in instance.$options.props) {
    defaults[i] = instance.$options.props[i].default
  }
  const opt = Object.assign({}, defaults, options)

  for (let key in opt) {
    instance[key] = opt[key]
  }
}

const imagePreview = {
  show (options = {}) {
    createInstance(Vue, options)
    instance.visible = true
  },

  hide (callback = () => {}) {
    instance && (instance.visible = false)
    isFunc(callback) && callback()
  },

  install (Vue, initOptions = { prototype: true }) {
    initOptions.prototype && (Vue.prototype.$ImagePreview = imagePreview)
  }
}

export default imagePreview
