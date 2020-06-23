import Vue from 'vue'

// min move distance
const MIN_DISTANCE = 10

function getDirection (x: number, y: number) {
  if (x > y && x > MIN_DISTANCE) {
    return 'horizontal'
  }

  if (y > x && y > MIN_DISTANCE) {
    return 'vertical'
  }

  return ''
}

type TouchMixinData = {
  startX: number;
  startY: number;
  deltaX: number;
  deltaY: number;
  offsetX: number;
  offsetY: number;
  direction: string;
}

export const TouchMixin = Vue.extend({
  data () {
    return {
      direction: ''
    } as TouchMixinData
  },

  methods: {
    touchStart (event: TouchEvent) {
      const touch = event.touches[0]
      this.resetTouchStatus()
      this.startX = touch.clientX
      this.startY = touch.clientY
    },

    toucheMove (event: TouchEvent) {
      const touch = event.touches[0]

      this.deltaX = touch.clientX - this.startX
      this.deltaY = touch.clientY - this.startY
      this.offsetX = Math.abs(this.deltaX)
      this.offsetY = Math.abs(this.deltaY)
      this.direction = this.direction || getDirection(this.offsetX, this.offsetY)
    },

    resetTouchStatus () {
      this.direction = ''
      this.deltaX = 0
      this.deltaY = 0
      this.offsetX = 0
      this.offsetY = 0
    }
  }
})