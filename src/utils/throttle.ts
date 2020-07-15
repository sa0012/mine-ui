export const throttle = function (fn: Function, delay: number): Function {
  //eslint-disable-line
  let now: number,
  lastExec: number,
  timer: any,
  context: object,
  args: any[]

  // @ts-ignore
  const that = this

  var execute = function() {
    fn.apply(context, args)
    lastExec = now
  }

  return function() {
    context = that
    args = Array.from(arguments)

    now = Date.now()

    if (timer) {
      clearTimeout(timer)
      timer = null
    }

    if (lastExec) {
      var diff = delay - (now - lastExec)
      if (diff < 0) {
        execute()
      } else {
        timer = setTimeout(() => {
          execute()
        }, diff)
      }
    } else {
      execute()
    }
  }
}
