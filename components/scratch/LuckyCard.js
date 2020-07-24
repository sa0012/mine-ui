import { isFunc, get } from '../../src/utils'
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
  let evt = this.supportTouch ? event.touches[0] : event
  let coverPos = this.cover.getBoundingClientRect()
  let pageScrollTop = document.documentElement.scrollTop || document.body.scrollTop
  let pageScrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft
  let mouseX = evt.pageX - coverPos.left - pageScrollLeft
  let mouseY = evt.pageY - coverPos.top - pageScrollTop
  this.ctx.beginPath()
  this.ctx.fillStyle = '#FFFFFF'
  this.ctx.globalCompositeOperation = 'destination-out'
  this.ctx.arc(mouseX, mouseY, 10, 0, 2 * Math.PI)
  this.ctx.fill()
  this.ctx.beginPath()
  let radgrad = this.ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 80)
  radgrad.addColorStop(0, 'rgba(0,0,0,0.6)')
  radgrad.addColorStop(1, 'rgba(255, 255, 255, 0)')
  this.ctx.fillStyle = radgrad
  this.ctx.arc(mouseX, mouseY, 30, 0, Math.PI * 2, true)
  this.ctx.fill() 
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

LuckyCard.prototype.createCanvas = function (settings) {
  this.cover = document.createElement('canvas')
  this.cover.id = 'cover'
  this.cover.width = this.width
  this.cover.height = this.height
  this.ctx = this.cover.getContext('2d')
  if (settings.coverImg) {
    const _this = this
    const coverImg = new Image()
    coverImg.src = settings.coverImg
    coverImg.onload = function () {
      _this.ctx.drawImage(coverImg, 0, 0, _this.cover.width, _this.cover.height)
    }
  } else {
    this.ctx.fillStyle = this.opt.coverColor
    this.ctx.fillRect(0, 0, this.cover.width, this.cover.height)
  }
}

LuckyCard.prototype.clearCover = function () {
  this.ctx.clearRect(0, 0, this.cover.width, this.cover.height)
  this.cover.removeEventListener(this.events[0], this.startEventHandler)
  this.cover.removeEventListener(this.events[1], this.moveEventHandler)
  this.cover.removeEventListener(this.events[2], this.endEventHandler)
}

LuckyCard.prototype.eventDetect = function () {
  if ('ontouchstart' in window) this.supportTouch = true
  this.events = this.supportTouch ? ['touchstart', 'touchmove', 'touchend'] : ['mousedown', 'mousemove', 'mouseup']
  this.addEvent()
}

LuckyCard.prototype.addEvent = function () {
  this.startEventHandler = startEventHandler.bind(this)
  this.cover.addEventListener(this.events[0], this.startEventHandler, false)
}

LuckyCard.prototype.init = function (settings) {
  const _this = this
  // 获取/设置用户参数
  _forEach(arguments, function (item) {
    if (typeof item === 'object') {
      for (var k in item) {
        if (k === 'callback' && typeof item[k] === 'function') {
          _this.opt.callback = item[k].bind(_this)
        } else {
          k in _this.opt && (_this.opt[k] = item[k])
        }
      }
    } else if (typeof item === 'function') {
      _this.opt.callback = item.bind(_this)
    }
  })

  this.scratchDiv = document.querySelector('#scratch')
  this.cardDiv = document.querySelector('#card')
  if (!this.scratchDiv || !this.cardDiv) return
  this.width = this.cardDiv.clientWidth
  this.height = 142
  this.cardDiv.style.opacity = 0
  this.createCanvas(settings)
  if (!settings.start) return
  this.eventDetect()
}

export default LuckyCard
