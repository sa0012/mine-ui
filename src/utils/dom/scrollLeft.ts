import { raf } from '../raf'
export const scrollToLeft = (el: HTMLElement, to: number, duration: number) => {
  let count = 0
  const from = el.scrollLeft
  const frames = duration === 0 ? 1 : Math.round(duration * 1000 / 16)

  function animation () {
    el.scrollLeft += (to - from) / frames

    if (++count < frames) {
      raf(animation)
    }
  }

  animation()
}
