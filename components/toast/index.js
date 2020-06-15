import Vue from 'vue'
import { isObj } from '../../src/utils'
import Toast from './toast'

const iconSizeMap = {
  'warn': 24,
  'loading': 34
}
let instance = null
let isSingle = true

function parseOptions (data) {
  // if (isObj(message)) {
  //   return message
  // }

  // let data = Array.prototype.slice.call(arguments)
  let options = {}
  data.forEach((d, i) => {
    i === 0 && (options.message = d)
    i === 1 && (options.duration = d)
    if (i === 2) {
      if (typeof d === 'string') {
        options.position = d
      } else if (d && Object.prototype.toString.call(d) === '[object Object]') {
        options = Object.assign({}, options, d)
      }
    }
  })
  return options
}

function createInstance (Vue, options) {
  if (isSingle) {
    if (!instance) {
      instance = new (Vue.extend(Toast))().$mount(document.createElement('div'))
      document.body && document.body.appendChild(instance.$el)
    }
    // instance
    console.log(instance, 'instance')
    mergeOptions(options, instance)
  } else {
    const _instance = new (Vue.extend(Toast))({
      el: document.createElement('div')
    })
    document.body && document.body.appendChild(_instance.$el)
    mergeOptions(options, _instance)
    return _instance
  }
}

function mergeOptions (options, instance) {
  const defaults = {}
  for (let i in instance.$options.props) {
    if (i !== 'value') {
      defaults[i] = instance.$options.props[i].default
    }
  }

  const opt = Object.assign({}, defaults, options)
  for (let key in opt) {
    instance[key] = opt[key]
  }
}

function parseToastTypes (toast) {
  const types = ['text', 'success', 'error', 'warn', 'loading']
  types.forEach(type => {
    toast[type] = function (...option) {
      return toast.show({
        ...(iconSizeMap[type] ? { iconSize: iconSizeMap[type] } : {}),
        ...parseOptions(option),
        type
      })
    }
  })
}

const toast = {
  show (options = {}) {
    if (isSingle) {
      createInstance(Vue, options)
      instance.timeOut && clearTimeout(instance.timeOut)
      if (instance.duration !== -1) {
        instance.timeOut = setTimeout(() => {
          instance.visible = false
          instance.timeOut && clearTimeout(instance.timeOut)
        }, instance.duration)
      }
      instance.visible = true
    } else {
      let _instance = createInstance(Vue, options)
      if (_instance.duration !== -1) {
        _instance.timeOut = setTimeout(() => {
          _instance.visible = false
          _instance.timeOut && clearTimeout(_instance.timeOut)
          document.body.removeChild(_instance.$el)
        }, _instance.duration)
      }
      _instance.hide = function (callback) {
        _instance.visible = false
        typeof callback === 'function' && callback()
        document.removeChild(_instance.$el)
      }
      _instance.visible = true
      return _instance
    }
  },

  hide (callback) {
    instance && (instance.visible = false)
    typeof callback === 'function' && callback()
  },

  install (Vue, initOptions = { isMultiple: false, isInPrototype: true }) {
    isSingle = !initOptions.isMultiple
    initOptions.isInPrototype && (Vue.prototype.$toast = toast)
  }
}

parseToastTypes(toast)

export default toast
