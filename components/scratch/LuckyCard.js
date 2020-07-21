import { isFunc } from '../../src/utils'
function LuckyCard (settings, callback) {
  // 刮奖蒙层
  this.cover = null
  // 上下文
  this.ctx = null
  // 用来存放canvas的父容器
  this.fatherNode = null
  // 卡片对象
  this.childNode = null
  // 卡片宽高
  this.width = 0
  this.height = 0
  // 是否支持mobile touch事件
  this.supportTouch = false
  // 用来存放兼容处理后的touch/mouse事件
  this.events = []
  // touch事件
  this.startEventHandler = null
  this.moveEventHandler = null
  this.endEventHandler = null
  // 刮奖区域卡片属性配置
  this.opt = {
    // 没有配置图片覆盖物的时候，使用默认色创建覆盖区域
    coverColor: '#c5c5c5',
    // 配置图片作为刮奖区域覆盖物
    coverImg: '',
    // 刮奖阈值，超过比例清空画布
    ratio: 0.2,
    // 刮奖成功回调
    callback: null,
    width: 0,
    height: 0
  }

  this.init(settings, callback)
}

function _forEach (items, callback) {
  return Array.prototype.forEach.call(items, function (item, idx) {
    callback(item, idx)
  })
}

function _calcArea (ctx, callback, ratio) {
  var pixels = ctx.getImageData(0, 0, this.width, this.height)
  var transPixels = []
  _forEach(pixels.data, function (item, i) {
    var pixel = pixels.data[i + 3]
    if (pixel === 0) {
      transPixels.push(pixel)
    }
  })
  if (transPixels.length / pixels.data.length > ratio) {
    callback && typeof callback === 'function' && callback()
  }
}

function startEventHandler (event) {
  event.preventDefault()
  this.moveEventHandler = moveEventHandler.bind(this)
  this.cover.addEventListener(this.events[1], this.moveEventHandler, false)
  this.endEventHandler = endEventHandler.bind(this)
  this.cover.addEventListener(this.events[2], this.endEventHandler, false)
}

function moveEventHandler (event) {
  event.preventDefault()
}

function endEventHandler (event) {
  event.preventDefault()
  let callback = this.opt.callback
  if (callback && isFunc(callback)) {
    _calcArea.call(this, this.ctx, this.opt.callback, this.opt.ratio)
  }

  this.cover.removeEventListener(this.events[1], this.moveEventHandler, false)
  this.cover.removeEventListener(this.events[2], this.endEventHandler, false)
}

LuckyCard.prototype.createCanvas = function () {}

LuckyCard.prototype.clearCover = function () {}

LuckyCard.prototype.eventDetect = function () {
  if ('ontouchstart' in window) this.supportTouch = true
  this.events = this.supportTouch ? ['touchstart', 'touchmove', 'touchend'] : ['mousedown', 'mousemove', 'mouseup']
  this.addEvent()
}

LuckyCard.prototype.addEvent = function () {
  this.startEventHandler = startEventHandler.bind(this)
  this.cover.addEventListener(this.events[0], this.startEventHandler, false)
}

LuckyCard.prototype.init = function () {}

export default LuckyCard
