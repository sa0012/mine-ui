import { isFunc } from '../../src/utils'
function LuckyCard (settings, callback) {
  this.cover = null
  this.ctx = null
  this.scratchDiv = null
  this.cardDiv = null
  this.width = 0
  this.height = 0
  this.events = []
  this.supportTouch = false
  this.startEventHandler = null
  this.moveEventHandler = null
  this.endEventHandler = null
  this.lotteryFn = null
  this.context = null
  this.lotteryArgs = []
  this.once = false
  this.opt = {
    coverColor: '#C5C5C5',
    // 覆盖图片，只能使用base64
    coverImg: '',
    ratio: 0.8,
    threshold: 10,
    callback: null
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
  const scrapeRatio = transPixels.length / pixels.data.length
  if (scrapeRatio > 0.3) {
    callback && typeof callback === 'function' && callback()
  }
}

function startEventHandler (event) {
  console.log('进来了吗')
  event.preventDefault()
  this.moveEventHandler = moveEventHandler.bind(this)
  this.cover.addEventListener(this.events[1], this.moveEventHandler, false)
  this.endEventHandler = endEventHandler.bind(this)
  this.cover.addEventListener(this.events[2], this.endEventHandler, false)
}

function moveEventHandler (event) {
  let evt = this.supportTouch ? event.touches[0] : event
  let coverPos = this.cover.getBoundingClientRect()
  var pageScrollTop = document.documentElement.scrollTop || document.body.scrollTop
  var pageScrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft
  var mouseX = evt.pageX - coverPos.left - pageScrollLeft
  var mouseY = evt.pageY - coverPos.top - pageScrollTop
  if (
    (mouseX >= this.opt.threshold || mouseY >= this.opt.threshold) &&
    !this.once
  ) {
    this.once = true
    console.log(this.lotteryFn, 'lotteryFn--1')
    if (this.lotteryFn && isFunc(this.lotteryFn)) {
      console.log('lotteryFn')
      this.lotteryFn.call(this.context, ...this.lotteryArgs)
    }
  }
  this.ctx.beginPath()
  this.ctx.fillStyle = '#FFFFFF'
  this.ctx.globalCompositeOperation = 'destination-out'
  this.ctx.arc(mouseX, mouseY, 10, 0, 2 * Math.PI)
  this.ctx.fill()
  this.ctx.beginPath()
  var radgrad = this.ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 80)
  radgrad.addColorStop(0, 'rgba(0,0,0,0.6)')
  radgrad.addColorStop(1, 'rgba(255, 255, 255, 0)')
  this.ctx.fillStyle = radgrad
  this.ctx.arc(mouseX, mouseY, 30, 0, Math.PI * 2, true)
  this.ctx.fill()
}

function endEventHandler (event) {
  event.preventDefault()
  if (this.opt.callback && typeof this.opt.callback === 'function') _calcArea.call(this, this.ctx, this.opt.callback, this.opt.ratio)
  this.cover.removeEventListener(this.events[1], this.moveEventHandler, false)
  this.cover.removeEventListener(this.events[2], this.endEventHandler, false)
}

LuckyCard.prototype.createCanvas = function (settings) {
  if (!this.ctx) {
    this.cover = document.createElement('canvas')
    this.cover.id = 'cover'
    this.ctx = this.cover.getContext('2d')
  }
  console.log('init-created')
  if (this.opt.coverImg) {
    console.log('coverImg---1122')
    let _this = this
    let coverImg = new Image()
    coverImg.src = this.opt.coverImg
    coverImg.crossOrigin = 'anonymous'
    coverImg.onload = function () {
      console.log('drawImage')
      _this.height = _this.cover.width * coverImg.height / coverImg.width
      console.log(_this.cover.width, _this.height, 'height')
      _this.ctx.drawImage(coverImg, 0, 0, _this.cover.width, _this.height)
    }

    coverImg.onerror = function () {
      console.error('Drawing failed')
    }
  } else {
    this.ctx.fillStyle = this.opt.coverColor
    this.ctx.fillRect(0, 0, this.cover.width, this.cover.height)
  }

  // 将生成的canvas对象插入父容器中
  this.scratchDiv.appendChild(this.cover)
  var covers = document.getElementById('cover')
  covers.style.position = 'absolute'
  covers.style.left = '50%'
  covers.style.top = '0'
  covers.style.width = '100%'
  covers.style.padding = '10px'
  covers.style.boxSizing = 'border-box'
  covers.style.webkitTransform = 'translateX(-50%)'
  this.cardDiv.style.opacity = 1
}

// 兼容PC和mobile的touch, mouse事件
LuckyCard.prototype.eventDetect = function (context, fn, ...args) {
  this.context = context
  this.lotteryFn = fn
  this.lotteryArgs = args
  if ('ontouchstart' in window) this.supportTouch = true
  this.events = this.supportTouch ? ['touchstart', 'touchmove', 'touchend'] : ['mousedown', 'mousemove', 'mouseup']
  console.log('start--1222')
  this.addEvent()
}

LuckyCard.prototype.clearCover = function () {
  this.ctx.clearRect(0, 0, this.cover.width, this.cover.height)
  this.cover.removeEventListener(this.events[0], this.startEventHandler, false)
  this.cover.removeEventListener(this.events[1], this.moveEventHandler, false)
  this.cover.removeEventListener(this.events[2], this.endEventHandler, false)
}

LuckyCard.prototype.addEvent = function () {
  console.log('addEvent')
  this.startEventHandler = startEventHandler.bind(this)
  this.cover.addEventListener(this.events[0], this.startEventHandler, false)
}

LuckyCard.prototype.init = function (settings) {
  var _this = this
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
  // this.height = 177
  this.cardDiv.style.opacity = 0
  this.createCanvas(settings)
  // this.eventDetect()
}

LuckyCard.prototype.restart = function (settings) {
  if (settings) {
    this.init(settings)
  } else {
    this.init({})
  }
}

export default LuckyCard
