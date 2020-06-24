const now = Date.now
let prev = Date.now();

/* istanbul ignore next */
function fallback(fn: FrameRequestCallback): number {
  const curr = Date.now();
  const ms = Math.max(0, 16 - (curr - prev));
  const id = setTimeout(fn, ms);
  prev = curr + ms;
  return id;
}

/* istanbul ignore next */
const root = window

/* istanbul ignore next */
const iRaf = root.requestAnimationFrame || fallback;

/* istanbul ignore next */
const iCancel = root.cancelAnimationFrame || root.clearTimeout;

export function raf(fn: FrameRequestCallback): number {
  return iRaf.call(root, fn);
}

// double raf for animation
export function doubleRaf(fn: FrameRequestCallback): void {
  raf(() => {
    raf(fn);
  });
}

export function cancelRaf(id: number) {
  iCancel.call(root, id);
}

// setTimeout模式
// export const RAF = {
//   intervalTimer: 0,
//   timeoutTimer: 0,
//   setTimeout (fn: FrameRequestCallback, interval: number): number {
//     let stime = now()
//     let etime = stime
//     let loop = () => {
//       this.timeoutTimer = Raf.call(window, loop)

//       if (etime - stime >= interval) {
//         fn(this.timeoutTimer)
//         this.cancelRaf(this.timeoutTimer)
//       }
//     }

//     this.timeoutTimer = Raf.call(window, fn)
//     return this.timeoutTimer
//   },

//   setInterval (fn: FrameRequestCallback, interval: number): number {
//     let stime = now()
//     let etime = stime

//     let loop = () => {
//       this.intervalTimer = Raf.call(window, loop)
//       etime = now()

//       if (etime - stime >= interval) {
//         stime = now()
//         etime = stime
//         fn(this.intervalTimer)
//       }
//     }

//     this.intervalTimer = Raf.call(window, loop)
//     return this.intervalTimer
//   },

//   cancelRaf (id: number): void {
//     isCancel.call(window, id)
//   }
// }
