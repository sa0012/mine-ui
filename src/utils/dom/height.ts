type ScrollElement = Document | HTMLElement | Element | null

export const getScrollTop = (): number => {
  return window.pageYOffset !== undefined
        ? window.pageYOffset
        : (document.documentElement || document.body.parentNode || document.body).scrollTop
}

export const calcTotalScrollTop = (el: ScrollElement): number => {
  if (!el) return 0
  return (<HTMLElement>el).offsetTop + calcTotalScrollTop((<HTMLElement>el).offsetParent)
}