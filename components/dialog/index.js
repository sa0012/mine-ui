import Vue from 'vue'
import Dialog from './dialog'
import { types } from 'util'

let instance = null
let isSingle = true

function createInstance (Vue, options) {
  if (isSingle) {
    if (!instance) {
      instance = new (Vue.extend(Dialog))().$mount(document.createElement('div'))
      document.body && document.body.appendChild(instance.$el)
    }
    mergeInstanceOpts(options, instance)
  } else {
    let _instance = new (Vue.extend(Dialog))().$mount(document.createElement('div'))
    document.body && document.body.appendChild(instance.$el)
    mergeInstanceOpts(options, _instance)
    return _instance
  }
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

function parseTypes (dialog) {
  const types = ['alert', 'confirm']
  types.forEach(type => {
    dialog[type] = function (options) {
      return dialog.show(Object.assign({}, options, { type }))
    }
  })
}

const dialog = {
  show (options = {}) {
    if (isSingle) {
      createInstance(Vue, options)
      instance.visible = true
    } else {
      let _instance = createInstance(Vue, options)
      _instance.hide = function (callback) {
        _instance.visible = false
        typeof callback === 'function' && callback()
        document.body.removeChild(_instance.$el)
      }
    }
  },

  hide (callback) {
    instance && (instance.visible = false)
    typeof callback === 'function' && callback()
  },

  install (Vue, initOptions = { isMultiple: false, isInPrototype: true }) {
    isSingle = !initOptions.isMultiple
    initOptions.isInPrototype && (Vue.prototype.$dialog = dialog)
  }
}

parseTypes(dialog)

export default dialog
