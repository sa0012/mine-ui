import Vue from 'vue'
import { isObj } from '../../src/utils'
import Toast from './toast'

const defaultOptions = {
  icon: '',
  type: 'text',
  message: '',
  position: 'middle',
  iconSize: 44,
  iconClass: '',
  textSize: 14,
  duration: 3000,
  parentNode: 'body'
}

let instance = null
let isSingle = true
let queue = []

function parseOptions (message) {
  if (isObj(message)) {
    return message
  }

  let data = Array.prototype.slice.call(arguments)
  let options = {}
  data.forEach((d, i) => {
    i === 0 && (options.message = d)
    i === 1 && (options.duration = d)
    if (i === 2) {
      if (typeof d === 'string') {
        options.position = d
      } else if (d && Object.prototype.toString.call(d) === '[object Object]') {
        options.position = Object.assign({}, d)
      }
    }
  })

  return options
}

function createInstance () {
  if (isSingle) {
    if (instance) {
      instance = new (Vue.extend(Toast))({
        el: document.createElement('div')
      })
      document.body && document.body.appendChild(instance.$el)
    }
    // instance
    // margeInstanceOpts(options, _instance)
  } else {
    const _instance = new (Vue.extend(Toast))({
      el: document.createElement('div')
    })
    document.body && document.body.appendChild(_instance.$el)
    // margeInstanceOpts(options, _instance)
    return _instance
  }
}
