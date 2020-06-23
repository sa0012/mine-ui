const now = Date.now
let prev = Date.now()
/**
 * 使用setTimeout兼容RAF
 */
function fallback(fn: FrameRequestCallback): number {
  const curr = Date.now();
  const ms = Math.max(0, 16 - (curr - prev));
  const id = setTimeout(fn, ms);
  prev = curr + ms;
  return id;
}

const Raf = window.requestAnimationFrame || fallback
const isCancel = window.cancelAnimationFrame || window.clearTimeout

// setTimeout模式
export const RAF = {
  intervalTimer: 0,
  timeoutTimer: 0,
  setTimeout (fn: FrameRequestCallback, interval: number): number {
    let stime = now()
    let etime = stime
    let loop = () => {
      this.timeoutTimer = Raf.call(window, loop)

      if (etime - stime >= interval) {
        fn(this.timeoutTimer)
        this.cancelRaf(this.timeoutTimer)
      }
    }

    this.timeoutTimer = Raf.call(window, fn)
    return this.timeoutTimer
  },

  setInterval (fn: FrameRequestCallback, interval: number): number {
    let stime = now()
    let etime = stime

    let loop = () => {
      this.intervalTimer = Raf.call(window, loop)
      etime = now()

      if (etime - stime >= interval) {
        stime = now()
        etime = stime
        fn(this.intervalTimer)
      }
    }

    this.intervalTimer = Raf.call(window, loop)
    return this.intervalTimer
  },

  cancelRaf (id: number): void {
    isCancel.call(window, id)
  }
}
